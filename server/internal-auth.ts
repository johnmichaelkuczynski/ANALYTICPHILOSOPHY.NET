import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

interface AuthenticatedRequest extends Request {
  zhiAuth?: {
    verified: boolean;
    appId?: string;
    timestamp: number;
  };
}

const TIMESTAMP_TOLERANCE_MS = 60000; // 60 seconds
const MAX_NONCE_CACHE_SIZE = 10000; // Prevent unbounded growth

// Bounded LRU-style cache for nonce replay prevention
class NonceCache {
  private cache = new Map<string, number>();
  private maxSize: number;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }

  has(nonce: string): boolean {
    return this.cache.has(nonce);
  }

  set(nonce: string, timestamp: number): void {
    // Remove oldest entries if at capacity (simple FIFO eviction)
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }
    this.cache.set(nonce, timestamp);
  }

  cleanup(maxAge: number): void {
    const now = Date.now();
    for (const [nonce, timestamp] of this.cache.entries()) {
      if (now - timestamp > maxAge) {
        this.cache.delete(nonce);
      }
    }
  }
}

const nonceCache = new NonceCache(MAX_NONCE_CACHE_SIZE);

// Clean up expired nonces every 5 minutes
setInterval(() => {
  nonceCache.cleanup(TIMESTAMP_TOLERANCE_MS);
}, 300000);

/**
 * HMAC-SHA256 authentication middleware for internal ZHI app requests
 * 
 * Validates requests using shared ZHI_PRIVATE_KEY with:
 * - HMAC-SHA256 signatures
 * - Timestamp-based expiration (60 second window)
 * - Nonce-based replay attack prevention
 * - Constant-time signature comparison
 * 
 * Required headers:
 * - X-ZHI-App-Id: Identifier for the calling app
 * - X-ZHI-Timestamp: Unix timestamp in milliseconds
 * - X-ZHI-Nonce: Unique random string
 * - X-ZHI-Signature: Base64 HMAC-SHA256 signature
 */
export function verifyZhiAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const privateKey = process.env.ZHI_PRIVATE_KEY;
  
  if (!privateKey) {
    console.error("ZHI_PRIVATE_KEY not configured");
    return res.status(500).json({ 
      error: "Internal configuration error" 
    });
  }

  // Extract authentication headers
  const appId = req.headers["x-zhi-app-id"] as string;
  const timestamp = req.headers["x-zhi-timestamp"] as string;
  const nonce = req.headers["x-zhi-nonce"] as string;
  const signature = req.headers["x-zhi-signature"] as string;

  // Validate required headers
  if (!appId || !timestamp || !nonce || !signature) {
    return res.status(401).json({ 
      error: "Missing required authentication headers",
      required: ["X-ZHI-App-Id", "X-ZHI-Timestamp", "X-ZHI-Nonce", "X-ZHI-Signature"]
    });
  }

  // Parse and validate timestamp
  const requestTime = parseInt(timestamp, 10);
  if (isNaN(requestTime)) {
    return res.status(401).json({ 
      error: "Invalid timestamp format" 
    });
  }

  const now = Date.now();
  const timeDiff = Math.abs(now - requestTime);

  if (timeDiff > TIMESTAMP_TOLERANCE_MS) {
    return res.status(401).json({ 
      error: "Request timestamp expired",
      serverTime: now,
      requestTime,
      tolerance: TIMESTAMP_TOLERANCE_MS
    });
  }

  // Check for replay attack (nonce reuse)
  if (nonceCache.has(nonce)) {
    return res.status(401).json({ 
      error: "Nonce already used (replay attack detected)" 
    });
  }

  // Construct signature payload
  // Format: METHOD + \n + ORIGINAL_URL + \n + TIMESTAMP + \n + NONCE + \n + RAW_BODY_HASH
  // Use originalUrl to include query params; hash raw body before JSON parsing
  const method = req.method;
  const originalUrl = req.originalUrl || req.url; // Full URL with query params
  
  // Hash raw request body (captured before JSON parsing via req.rawBody)
  const rawBody = (req as any).rawBody || Buffer.from("");
  const bodyHash = crypto.createHash("sha256").update(rawBody).digest("hex");

  const payload = `${method}\n${originalUrl}\n${timestamp}\n${nonce}\n${bodyHash}`;

  // Calculate expected signature
  const expectedSignature = crypto
    .createHmac("sha256", privateKey)
    .update(payload)
    .digest("base64");

  // Constant-time comparison to prevent timing attacks
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return res.status(401).json({ 
      error: "Invalid signature" 
    });
  }

  // Cache nonce to prevent replay (bounded LRU cache)
  nonceCache.set(nonce, requestTime);

  // Audit log for security monitoring
  console.log(`[ZHI Auth] Authenticated request from ${appId} to ${originalUrl}`);

  // Attach authentication context to request
  req.zhiAuth = {
    verified: true,
    appId,
    timestamp: requestTime
  };

  next();
}

/**
 * Helper function for ZHI apps to generate signatures (for documentation/testing)
 * 
 * @param privateKey - ZHI_PRIVATE_KEY shared secret
 * @param method - HTTP method (GET, POST, etc.)
 * @param url - Full URL with query params (e.g., /api/internal/knowledge?topic=freud)
 * @param timestamp - Unix timestamp in milliseconds
 * @param nonce - Unique random string (use crypto.randomBytes(16).toString('hex'))
 * @param rawBody - Raw request body Buffer or string (NOT parsed JSON)
 * @returns Base64 HMAC-SHA256 signature
 */
export function generateZhiSignature(
  privateKey: string,
  method: string,
  url: string,
  timestamp: number,
  nonce: string,
  rawBody: Buffer | string = ""
): string {
  const bodyBuffer = typeof rawBody === "string" ? Buffer.from(rawBody) : rawBody;
  const bodyHash = crypto.createHash("sha256").update(bodyBuffer).digest("hex");
  const payload = `${method}\n${url}\n${timestamp}\n${nonce}\n${bodyHash}`;
  
  return crypto
    .createHmac("sha256", privateKey)
    .update(payload)
    .digest("base64");
}
