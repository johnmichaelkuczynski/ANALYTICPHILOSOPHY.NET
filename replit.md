# Ask A Philosopher - Philosophical Q&A Application

## Overview
"Ask A Philosopher" is a philosophical Q&A application designed for deep philosophical discourse with 44 philosophical and literary figures. It leverages their actual writings and advanced AI to provide nuanced and contextually rich responses. The platform integrates philosophical papers as foundational texts, enabling the AI to reason and adapt based on user sophistication. It supports multi-author conversations through a Retrieval-Augmented Generation (RAG) system, ensuring each figure's responses are grounded in their respective works. The project aims to offer an accessible and engaging way to explore complex philosophical ideas and literary works, with J.-M. Kuczynski as the default philosopher. The project's ambition is to offer a robust platform for exploring complex philosophical and literary concepts, enhancing understanding through direct engagement with the 'minds' of history's great thinkers, and has significant market potential in education and intellectual discourse.

## Recent Changes

### Common Fund Knowledge Expansion (November 2025)
**Major Infrastructure Development:** Expanding the Common Fund from ~43 texts to **57 texts spanning 18+ disciplines**. This enables all philosophers to access cross-disciplinary knowledge while maintaining authentic voices grounded in their primary works.

**Status:**
- ✅ **49 texts fully embedded** in Common Fund vector database
- 🔄 **Batch 1 (9 texts):** Currently processing Tacitus Histories (7/9 complete, ~542,000 words)
  - Completed: Gibbon's Memoirs, Marcus Aurelius Meditations, Medieval Europe, Hebraic Literature, Book of Scoundrels, The Mob, Civilization of China
  - In Progress: Tacitus Histories (chunk 41/252)
  - Remaining: 2 more texts (Ayer's Language Truth & Logic, Rashdall's Philosophy & Religion)
- 📦 **Batch 2 (10 texts):** Configured and ready (~380,000 words)
  - Wittgenstein's Tractatus, Arrow's Social Choice, Bernays' Propaganda, Quantum Mechanics textbook, and 6 others
- 📦 **Batch 3 (5 texts):** Just added (~1.1 million words)
  - Lea's History of the Inquisition (Vol I, 41,008 lines)
  - Frank's Philosophy of Science (31,898 lines)
  - Ben-Ari's Mathematical Logic for Computer Science (25,627 lines)
  - Kolmogorov & Fomin's Introductory Real Analysis (32,856 lines)
  - Cantor's Theory of Transfinite Numbers (13,782 lines)

**New Disciplines Added:**
- Classical History (Gibbon, Tacitus, Medieval Europe)
- Theology & Religious Literature (Hebraic Literature, Marcus Aurelius)
- Asian Civilization Studies (Civilization of China, Confucius)
- Logical Positivism (Ayer, Wittgenstein's Tractatus)
- Social Psychology & Propaganda (Bernays)
- Economic Theory (Arrow's Social Choice)
- Quantum Mechanics & Physics
- Medieval Church History (Lea's Inquisition)
- Philosophy of Science (Frank)
- Mathematical Logic & Foundations (Ben-Ari, Cantor)
- Real Analysis & Advanced Mathematics (Kolmogorov & Fomin)

**Technical Implementation:**
- Intelligent timeout recovery: System automatically resumes from last completed text
- Dual-pool retrieval: ~67% philosopher's own works, ~33% Common Fund enrichment
- 1536-dimension vector embeddings via OpenAI text-embedding-ada-002
- PostgreSQL with pgvector for semantic search

### Critical Bug Fix - Compare Mode (November 2025)
Fixed malformed HTML responses in comparison mode by integrating `buildSystemPrompt()` function into chat endpoint. Ensures all response formatting rules, quote frequency settings, and paper mode are properly applied to both single and comparison conversations.

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