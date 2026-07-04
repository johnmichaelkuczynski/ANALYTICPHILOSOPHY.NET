import { useGetAuthMe, useLogout } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

/** URL that starts the Google OAuth flow (server-side 302 to Google). */
export const googleSignInUrl = `${basePath}/api/auth/google`;

/** Current session state from GET /api/auth/me. */
export function useAuth() {
  const { data, isLoading } = useGetAuthMe();
  return {
    isLoading,
    isAuthenticated: data?.authenticated ?? false,
    user: data?.user ?? null,
  };
}

/** Signs out, clears the client cache, and returns to the landing page. */
export function useSignOut() {
  const qc = useQueryClient();
  const { mutateAsync } = useLogout();
  return async () => {
    try {
      await mutateAsync();
    } finally {
      qc.clear();
      window.location.href = basePath || "/";
    }
  };
}
