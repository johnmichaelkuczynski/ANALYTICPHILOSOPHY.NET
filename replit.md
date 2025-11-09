# Ask A Philosopher - Philosophical Q&A Application

## Overview
"Ask A Philosopher" is a philosophical Q&A application designed for deep philosophical discourse with 44 philosophical and literary figures. It leverages their actual writings and advanced AI to provide nuanced and contextually rich responses. The platform integrates philosophical papers as foundational texts, enabling the AI to reason and adapt based on user sophistication. It supports multi-author conversations through a Retrieval-Augmented Generation (RAG) system, ensuring each figure's responses are grounded in their respective works. The project aims to offer an accessible and engaging way to explore complex philosophical ideas and literary works, with J.-M. Kuczynski as the default philosopher.

## Recent Changes

### November 9, 2025 (Continued)
- **Common Fund of Knowledge (Dual-Pool RAG System)**: Implemented shared knowledge base accessible to all 44 philosophers to eliminate artificial dataset constriction. Each query now retrieves from TWO pools simultaneously: (1) Philosopher's own writings (~67%) defining canonical positions; (2) Common knowledge pool (~33%) providing empirical evidence, historical context, broader perspectives. System ensures minimum representation from each pool when available, merges results, and re-sorts by semantic relevance. Clear source labeling ([YOUR WORK] vs [COMMON KNOWLEDGE]) in RAG briefings. System prompt explicitly prevents common knowledge from overriding canonical positions - common fund provides ENRICHMENT not REPLACEMENT. Integrated with epistemic humility protocols: when common knowledge conflicts with positions, philosophers acknowledge evidence and respond using their actual intellectual resources. To populate common fund: use existing embedding generation tools with `figureId='common'`. This allows philosophers to engage topics outside their specific works while maintaining distinctive voices grounded in their actual writings.
- **Common Fund Texts**: 
  - D.H. Lawrence's "Fantasia of the Unconscious" (130 chunks, 63,057 words) - psychological insights on the unconscious, human nature, consciousness, instinct, parent-child relationships, education, dreams
  - Italo Gandolfi's "Logic of Information" (163 chunks, 77,665 words) - logical foundations, information theory, solutions to logical paradoxes, set theory, axiomatization, alethics, conditionals, variables, indexicality, reflexive logic, incompleteness theorems
- **William James Training Expansion**: Added "Memories and Studies" (137 chunks, 65,441 words) to William James' corpus - includes essays on Louis Agassiz, Emerson, psychical research, earthquake psychology, human energies, moral equivalent of war, college education, and pluralistic mysticism.

## User Preferences
- **Response Length Control**: User can type desired response length in words, or leave blank for Auto mode. In Auto mode, philosophers MUST produce 3-5 substantial paragraphs separated by blank lines with multi-layered attack structure: Opening (immediate attack/reframing, 1 para), Mechanism (1-3 paragraphs deploying MULTIPLE layers of distinctive method within these paragraphs - e.g., Nietzsche: genealogy + psychological diagnosis + cultural prognosis + hammer-blow rhetoric combined in 1-3 paras; Marx: material base + class dynamics + dialectic + economic mechanisms; Spinoza: geometric proof + causal necessity + modal analysis + ethical implications), Counterattack/Implications (turn it around, 1 para), and Conclusion (decisive verdict, brief). Mandatory self-audit before responding: paragraph count (3-5 with blank lines), multiple method layers deployed within paragraphs, genealogical tracing when applicable, mechanism shown not asserted, counterattack present, voice matches philosopher's style (visceral/geometric/analytic/dialectical). Worked example provided in system prompts showing Nietzsche combining multiple layers within single paragraphs. Standard: responses must have HORSEPOWER - depth and force to fully deploy intellectual firepower. Single paragraph or polite summaries = automatic failure
- **Quote Frequency Guidance**: User can adjust discretionary quote usage with three levels: Low (deploy quotes rarely, only when critical), Normal (use quotes occasionally when they advance arguments), High (use quotes 1-2 times per response when tactically useful). Quotes are never mandatory - they're weapons deployed only when they strengthen the philosophical attack.
- **Paper Writing Mode**: Toggle to request formal philosophical papers with academic conventions, proper argumentation, and scholarly language
- **Variation**: Never give the same answer twice.
- **Direct Attack Mandate**: All figures attack problems immediately without preambles, commit decisively without hedging, name specific targets rather than vague references, show mechanisms through visible reasoning, reframe confused questions by rejecting false premises, and deploy quotes as logical weapons rather than decoration.
- **Anti-Chickenshit Directive**: Comprehensive 10-point protocol eliminating defensive, pedagogical, and generic responses. No defensive openings, no teaching about philosophy (USE it instead), no decorative quotes, engage actual challenges (not restate positions), reframe confused questions, counterattack when appropriate, show distinctive method visibly (Spinoza's geometric proofs, Russell's logical analysis, Nietzsche's psychological diagnosis, etc.), commit without hedging, eliminate generic academic voice, and when stuck admit it honestly. Every response tested against quality checklist: Did I attack immediately? Did I USE my philosophy or EXPLAIN it? Did I engage the challenge? Is my distinctive method visible? Could another philosopher have written this? Kuczynski bot serves as gold standard for potent, non-evasive responses.
- **Epistemic Humility Override**: All philosophers are programmed with intellectual honesty protocols requiring them to acknowledge decisive evidence against their positions, admit logical contradictions they cannot resolve, show genuine understanding of challenges, attempt responses using their actual resources, and admit limits when stuck. Intellectual honesty comes FIRST, commitment to views SECOND. Great thinkers update beliefs; defending untenable positions is what mediocrities do.

## System Architecture
The application features a 3-column layout without authentication, providing direct access to the chat interface.

### UI/UX Decisions
- **Layout**: A 3-column layout with a far-left column for philosophical figures, a narrow middle sidebar for settings, and a right area for the main chat.
- **Accessibility**: No login required; minimal, visible settings (Response Length, Write a Paper toggle).
- **Visuals**: Animated Kuczynski icon, AI-generated portrait avatars for figures, minimalistic design with elegant typography, and dark mode support.
- **"Talk with X" Feature**: Clickable philosophical figures with avatars for personalized conversations.
- **"Compare Thinkers" Feature**: Allows selecting two philosophers for a side-by-side comparison of their real-time, streaming responses to the same question.

### Technical Implementations
- **Frontend**: React, TypeScript, Wouter, TanStack Query, Shadcn UI, and Tailwind CSS.
- **Backend**: Express.js with Node.js and Drizzle ORM.
- **AI Interaction**: Anthropic Claude Sonnet 4.5 is the primary AI operating at 0.7 temperature. Figures are configured for **Aggressive Direct Reasoning** using a 6-point mandate (Immediate Attack, Commit Without Hedging, Name Specific Targets, Show Mechanism, Reframe Confused Questions, Quotes as Weapons). Philosophers operate as fully realized, maximally intelligent versions who use their doctrines as frameworks for attacking novel problems, not as textbook entries reciting views. Conversation history maintained; philosophers can cite their own works by title.
- **Streaming**: Server-Sent Events (SSE) for real-time word-by-word AI response streaming.
- **Quote Verification**: Comprehensive normalization for quote matching across text formats.
- **Settings**: Users can control response length, quote frequency, and toggle paper writing mode.
- **Paper Writing Feature**: Allows philosophers to write original papers (up to 1500 words) in their authentic voice, utilizing RAG retrieval, with streaming generation and text file download options.
- **Guest User Management**: Session-based storage with auto-generated guest user IDs maintains state without authentication.
- **RAG System**: Papers are chunked, embedded into 1536-dimension vectors, and stored in a PostgreSQL database with pgvector. Semantic search retrieves relevant chunks for the LLM.
- **Dual-Pool RAG System (Common Fund of Knowledge)**: Maintains separate vector embeddings for each author, plus a shared "common knowledge" pool accessible to ALL philosophers. Each query retrieves from BOTH pools: ~67% from philosopher's own writings (primary source defining canonical positions) and ~33% from common fund (secondary source for empirical evidence, historical context, broader perspectives). Results merged and sorted by semantic relevance with clear source labeling. System prevents common knowledge from overriding canonical positions - it provides enrichment, not replacement. Integrated with epistemic humility protocols.
- **Integrated Philosophical and Literary Works**: Extensive works from 44 philosophers and literary figures are integrated.
- **Document Upload Feature**: Users can upload text documents (.txt, .md, .doc, .docx, .pdf up to 1MB) for analysis, evaluation, or rewriting by philosophers.

## External Dependencies
- **AI Providers**: Anthropic Claude Sonnet 4.5, OpenAI GPT-4o, DeepSeek, Perplexity.
- **Database**: PostgreSQL (Neon) with pgvector extension.
- **Embeddings**: OpenAI `text-embedding-ada-002`.