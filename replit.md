# Ask A Philosopher - Philosophical Q&A Application

## Overview
"Ask A Philosopher" is a unified application providing deep philosophical discourse with 59 philosophical and literary figures. It features eight operational sections: philosophical Q&A chat, Model Builder, Paper Writer, Quote Generator, Thesis to World, Nightmare Conversion, Philosophical Fiction Writer, and Dialogue Creator. The platform leverages actual writings and advanced AI to deliver nuanced, contextually rich responses, enabling multi-author conversations through a Retrieval-Augmented Generation (RAG) system. The ambition is to provide a robust platform for exploring complex philosophical and literary concepts, enhancing understanding through direct engagement with the 'minds' of history's great thinkers, with significant market potential in education and intellectual discourse.

## Recent Changes (November 14, 2025)
### Drag-and-Drop Upload Integration
- Created reusable `DragDropUpload` component with visual feedback, validation callbacks, and accessibility features
- Integrated drag-and-drop file upload across all 5 file-capable sections (Quote Generator, Thesis to World, Nightmare Conversion, Philosophical Fiction Writer, Dialogue Creator)
- Implemented centralized validation architecture with `onValidationError` callback pattern
- Added visual feedback during drag operations (dashed border highlight)
- Included click-to-upload fallback for traditional file selection and mobile devices
- All sections now provide consistent, modern file upload experience

### Dialogue Creator Enhancements
- **Author Selection Feature**: Added optional dropdown to select any site author/philosopher whose works and tone should be incorporated into generated dialogues
  - Dropdown fetches all available figures via React Query
  - When author selected, backend retrieves 4 relevant chunks from author's works using RAG (searchPhilosophicalChunks)
  - Author name normalized (e.g., "J.-M. Kuczynski" → "Kuczynski") to match vector database canonical format
  - Retrieved content incorporated into dialogue generation prompt for authentic content/tone infusion
  - Feature is fully optional - dialogues work with or without author selection
  - Uses "none" as default value (Radix UI SelectItem requirement)
- **Display Fix**: Fixed text visibility issue where generated dialogues were not visible
  - Added `text-foreground` class to ensure proper text contrast in both light and dark modes
  - Dialogue output now displays correctly with proper readability

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
- **Layout**: A unified single-page layout with 3 columns (philosophers sidebar, settings, main content) containing eight vertically stacked sections. All sections accessible by scrolling on ONE page.
- **Visuals**: Animated Kuczynski icon, AI-generated portrait avatars, minimalistic design with elegant typography, dark mode support, and visual section dividers.

### Technical Implementations
- **Frontend**: React, TypeScript, Wouter, TanStack Query, Shadcn UI, and Tailwind CSS.
- **Backend**: Express.js with Node.js and Drizzle ORM.
- **AI Interaction**: Anthropic Claude Sonnet 4.5 (0.7 temperature) configured for aggressive direct reasoning.
- **Streaming**: Server-Sent Events (SSE) for real-time word-by-word AI response streaming.
- **Cross-Section Content Transfer**: Bidirectional content flow using "Send to" dropdown buttons.
- **Model Builder Section**: Integrated for theory validation and reinterpretations.
- **Paper Writer Section**: Generates formal philosophical papers (up to 1500 words).
- **Quote Generator Section**: Extracts quotes from site authors or user-uploaded documents with intelligent extraction and quality scoring.
- **Thesis to World Section**: Converts non-fiction claims into a two-part output: factual incidents (structured JSON) and a developed narrative story.
- **Nightmare Conversion Section**: Analyzes non-fiction text to identify author's core anxiety and generates an 800-1200 word nightmare story, utilizing 702 narrative templates.
- **Philosophical Fiction Writer Section**: Transforms non-fiction text into 800-1500 word narrative fiction in the voice and style of a selected philosopher/author, using server-side author assets and comprehensive prompts.
- **Dialogue Creator Section**: Transforms non-fiction philosophical, psychological, or conceptual text into authentic Kuczynski-style dialogues between Dr. K and an intelligent student. Features comprehensive system prompt capturing distinctive dialogue mechanics: genuine intellectual movement, productive misunderstandings, concrete examples grounding abstract concepts, natural speech patterns, and psychological realism. Includes optional customization field for tone/character specifications, optional author selection dropdown (incorporates selected philosopher's works/tone via RAG), and supports paste/upload modes (.txt, .pdf, .doc, .docx up to 5MB). NOT Socratic irony, NOT straw-man debates, NOT generic LLM politeness. Creates philosophically rigorous conversations with Dr. K's characteristic phrases ("Exactly," "Spot on," "See you tomorrow") and student's engaged responses ("I follow," "Please explain"). Uses Anthropic Claude Sonnet 4.5 with 0.7 temperature for streaming generation.
- **RAG System**: Papers are chunked, embedded using OpenAI's `text-embedding-ada-002`, and stored in a PostgreSQL database with `pgvector` for semantic search across a unified knowledge base of 87 authors.
- **Document Upload Feature**: Users can upload text documents (.txt, .md, .doc, .docx, .pdf up to 5MB) for analysis across 5 sections (Quote Generator, Thesis to World, Nightmare Conversion, Philosophical Fiction Writer, Dialogue Creator). Features include:
  - **Drag-and-Drop Upload**: Reusable `DragDropUpload` component with visual feedback (dashed border highlight on drag-over, upload icon), file validation (size/type), and error callbacks
  - **Click-to-Upload Fallback**: Accessible file picker for users who prefer traditional upload or are on mobile devices
  - **Validation Architecture**: Centralized validation with `onValidationError` callback pattern eliminating duplicate logic across sections
  - **File State Management**: Parent components maintain file state authority while DragDropUpload handles UI/UX as stateless wrapper
  - **UX Features**: Displays filename/size after selection, clear button to remove file, keyboard accessibility, mobile-responsive design
- **ZHI Knowledge Provider Integration**: Secure internal API (`/api/internal/knowledge`) for structured knowledge retrieval with explicit author attribution.

## External Dependencies
- **AI Providers**: Anthropic Claude Sonnet 4.5, OpenAI GPT-4o, DeepSeek, Perplexity.
- **Database**: PostgreSQL (Neon) with pgvector extension.
- **Embeddings**: OpenAI `text-embedding-ada-002`.
- **File Parsing (Quote Generator)**: Multer, pdf-parse, mammoth.