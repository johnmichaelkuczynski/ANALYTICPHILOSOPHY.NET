# Ask A Philosopher - Philosophical Q&A Application

## Recent Updates (November 2025)
- **NEW: Optional Query Input** (Nov 13): Quote Generator now works with blank queries - just select an author and press Enter to get their best quotes. Default query "important philosophical insights and key ideas" is automatically applied when field is left empty. Frontend validation updated to allow empty queries.
- **NEW: Enter Key Submission** (Nov 13): All three interactive sections (Quote Generator, Model Builder, Paper Writer) support Enter key submission - no button clicks required. Shift+Enter for new lines in textareas.
- **NEW: Quote Generator Section** (Nov 13): Fourth integrated function with two-mode system for extracting quotes from site authors or uploaded documents. Improved formatting with whitespace normalization for clean, readable output. Quality filters reject formatting artifacts while accepting substantial sentences (50-500 chars, 5+ words).

## Overview
"Ask A Philosopher" is an application designed for deep philosophical discourse with 48 philosophical and literary figures. It leverages their actual writings and advanced AI to deliver nuanced, contextually rich responses. The platform integrates philosophical papers as foundational texts, enabling the AI to reason and adapt based on user sophistication. It supports multi-author conversations through a Retrieval-Augmented Generation (RAG) system, ensuring each figure's responses are grounded in their respective works. The project aims to offer an accessible and engaging way to explore complex philosophical ideas and literary works, with J.-M. Kuczynski as the default philosopher. The ambition is to provide a robust platform for exploring complex philosophical and literary concepts, enhancing understanding through direct engagement with the 'minds' of history's great thinkers, with significant market potential in education and intellectual discourse.

## User Preferences
- **Response Length Control**: User can type desired response length in words, or leave blank for Auto mode. In Auto mode, philosophers MUST produce 3-5 substantial paragraphs separated by blank lines with multi-layered attack structure: Opening (immediate attack/reframing, 1 para), Mechanism (1-3 paragraphs deploying MULTIPLE layers of distinctive method within these paragraphs - e.g., Nietzsche: genealogy + psychological diagnosis + cultural prognosis + hammer-blow rhetoric combined in 1-3 paras; Marx: material base + class dynamics + dialectic + economic mechanisms; Spinoza: geometric proof + causal necessity + modal analysis + ethical implications), Counterattack/Implications (turn it around, 1 para), and Conclusion (decisive verdict, brief). Mandatory self-audit before responding: paragraph count (3-5 with blank lines), multiple method layers deployed within paragraphs, genealogical tracing when applicable, mechanism shown not asserted, counterattack present, voice matches philosopher's style (visceral/geometric/analytic/dialectical). Worked example provided in system prompts showing Nietzsche combining multiple layers within single paragraphs. Standard: responses must have HORSEPOWER - depth and force to fully deploy intellectual firepower. Single paragraph or polite summaries = automatic failure
- **Quote Control**: User can type any number from 0 to 50 for desired quotes per response (0 for none). Quotes are never mandatory - they're weapons deployed only when they strengthen the philosophical attack.
- **Paper Writing Mode**: Toggle to request formal philosophical papers with academic conventions, proper argumentation, and scholarly language
- **Variation**: Never give the same answer twice.
- **Direct Attack Mandate**: All figures attack problems immediately without preambles, commit decisively without hedging, name specific targets rather than vague references, show mechanisms through visible reasoning, reframe confused questions by rejecting false premises, and deploy quotes as logical weapons rather than decoration.
- **Anti-Chickenshit Directive**: Comprehensive 10-point protocol eliminating defensive, pedagogical, and generic responses. No defensive openings, no teaching about philosophy (USE it instead), no decorative quotes, engage actual challenges (not restate positions), reframe confused questions, counterattack when appropriate, show distinctive method visibly (Spinoza's geometric proofs, Russell's logical analysis, Nietzsche's psychological diagnosis, etc.), commit without hedging, eliminate generic academic voice, and when stuck admit it honestly. Every response tested against quality checklist: Did I attack immediately? Did I USE my philosophy or EXPLAIN it? Did I engage the challenge? Is my distinctive method visible? Could another philosopher have written this? Kuczynski bot serves as gold standard for potent, non-evasive responses.
- **Epistemic Humility Override**: All philosophers are programmed with intellectual honesty protocols requiring them to acknowledge decisive evidence against their positions, admit logical contradictions they cannot resolve, show genuine understanding of challenges, attempt responses using their actual resources, and admit limits when stuck. Intellectual honesty comes FIRST, commitment to views SECOND. Great thinkers update beliefs; defending untenable positions is what mediocrities do.

## System Architecture
The application acts as a centralized knowledge server providing unified access to philosophical and psychoanalytic texts via a secure internal API. It features a 3-column layout without authentication, offering direct access to the chat interface. All philosophical texts are consolidated into a unified "Common Fund" knowledge base.

### UI/UX Decisions
- **Layout**: A unified single-page layout with 3 columns (philosophers sidebar, settings, main content) containing four vertically stacked sections: Ask A Philosopher (chat), Model Builder, Paper Writer, and Quote Generator. All sections accessible by scrolling on ONE page.
- **Accessibility**: No login required; minimal settings (Response Length, Number of Quotes).
- **Four-Section Design**:
  1. **Top**: Ask A Philosopher chat interface with fixed header and sticky input
  2. **Second**: Model Builder for theory validation and reinterpretations
  3. **Third**: Paper Writer for formal philosophical papers
  4. **Bottom**: Quote Generator for extracting quotes from site authors or uploaded documents
- **Visuals**: Animated Kuczynski icon, AI-generated portrait avatars, minimalistic design with elegant typography, dark mode support, and visual section dividers.
- **Features**: "Talk with X" for personalized conversations, "Compare Thinkers" for side-by-side comparisons, all integrated in one unified scrollable page.

### Technical Implementations
- **Frontend**: React, TypeScript, Wouter, TanStack Query, Shadcn UI, and Tailwind CSS.
- **Backend**: Express.js with Node.js and Drizzle ORM.
- **AI Interaction**: Anthropic Claude Sonnet 4.5 is the primary AI (0.7 temperature), configured for aggressive direct reasoning with a 6-point mandate (Immediate Attack, Commit Without Hedging, Name Specific Targets, Show Mechanism, Reframe Confused Questions, Quotes as Weapons). Conversation history is maintained, and philosophers can cite their own works.
- **Streaming**: Server-Sent Events (SSE) for real-time word-by-word AI response streaming.
- **Settings**: Users control response length and quote frequency via the settings panel.
- **Unified Single-Page Interface**: All four functions (Chat, Model Builder, Paper Writer, Quote Generator) are integrated into ONE scrollable page.
- **Cross-Section Content Transfer**: Bidirectional content flow system using dropdown "Send to" arrow buttons on all outputs.
- **Model Builder Section**: Integrated section below chat for validating philosophical theories and generating isomorphic reinterpretations using model-theoretic analysis. Features 2-column input/output layout with custom instructions support and streaming SSE generation. Users can iteratively refine generated models.
- **Paper Writer Section**: Integrated section for generating formal philosophical papers (up to 1500 words) in authentic voice. Features 2-column layout with philosopher selection, topic input, streaming SSE generation, and text file download.
- **Quote Generator Section**: Integrated section at bottom for extracting quotes from site authors or user-uploaded documents. Features tab-based two-mode interface: (1) Site Authors mode - select philosopher and optionally enter query topic (blank defaults to "best quotes"), customizable quote quantity (1-50); (2) Upload File mode - accepts .txt, .pdf, .doc, .docx files (up to 5MB) with optional keyword filtering. Server-side file parsing using multer, pdf-parse, and mammoth. Public `/api/quotes/generate` endpoint with automatic query defaulting when empty.
- **Guest User Management**: Session-based storage with auto-generated guest user IDs maintains state without authentication.
- **RAG System**: Papers are chunked (~250 words), embedded into 1536-dimension vectors using OpenAI's `text-embedding-ada-002`, and stored in a PostgreSQL database with `pgvector`. Semantic search retrieves relevant chunks for the LLM.
- **Unified Knowledge Base**: All philosophical texts from 82+ authors (~64,205 chunks across 235 unique works) are consolidated into a single "Common Fund" with `figureId='common'`. Author filtering is implemented with ILIKE partial matching and robust normalization for 38+ philosopher names.
- **Integrated Philosophical and Literary Works**: Extensive works from 82 philosophers and literary figures, including Edward Gibbon, Moses Maimonides, Henri Poincaré, Bertrand Russell, Wilhelm Reich, George Berkeley, J.-M. Kuczynski, Carl Jung, Thomas Hobbes, and others.
- **Document Upload Feature**: Users can upload text documents (.txt, .md, .doc, .docx, .pdf up to 1MB) for analysis by philosophers.
- **ZHI Knowledge Provider Integration**: A secure internal API (`/api/internal/knowledge`) uses HMAC-SHA256 authentication and provides structured knowledge retrieval with explicit author attribution and comprehensive author normalization for external ZHI applications.

## External Dependencies
- **AI Providers**: Anthropic Claude Sonnet 4.5, OpenAI GPT-4o, DeepSeek, Perplexity.
- **Database**: PostgreSQL (Neon) with pgvector extension.
- **Embeddings**: OpenAI `text-embedding-ada-002`.
- **File Parsing (Quote Generator)**: Multer, pdf-parse, mammoth.