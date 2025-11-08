# Ask A Philosopher - Philosophical Q&A Application

## Recent Changes (November 8, 2025)
- **Adam Smith Wealth of Nations Training Complete**: Added "An Inquiry into the Nature and Causes of the Wealth of Nations" (759 chunks, 362,997 words) - Smith's foundational work on economic theory covering division of labor, market mechanisms, wages, profits, rent, capital accumulation, mercantile systems, and the invisible hand. Total Adam Smith corpus now 771 chunks across 2 works (The Theory of Moral Sentiments + Wealth of Nations).
- **Document Upload Feature**: Added file upload functionality to philosopher chat popups. Users can now upload text documents (.txt, .md, .doc, .docx, .pdf up to 1MB) and ask philosophers to read, analyze, evaluate, or rewrite them. Philosophers apply their frameworks to assess uploaded work, offering critiques for longer documents or rewrites for shorter ones (under 500 words).
- **CRITICAL PROMPT REDESIGN - Active Reasoning vs Recitation**: Completely redesigned system prompts and RAG injection to transform philosophers from "archival textbook entries" to "living thinkers." New prompt establishes 4-stage reasoning workflow (parse structure → identify principles → reason through → optionally cite), explicitly contrasts archival vs active reasoning, demotes quotes from requirements to optional evidence, and reframes RAG chunks as "conceptual briefing material" rather than "passages to quote." Goal: philosophers now apply frameworks to novel contexts instead of reciting doctrine.
- **Compare Thinkers Download Feature**: Added download button to Compare Thinkers modal allowing users to export both responses as a formatted text file with questions and answers clearly labeled
- **Russell The Analysis of Mind Training**: Added "The Analysis of Mind" (234 chunks, 89,179 words) - Russell's seminal 1921 work on philosophy of mind and psychology covering consciousness, neutral monism, behaviorism, introspection, memory, belief, desire, and the relationship between mind and matter. Total Russell corpus now 441 chunks across 5 major works.
- **Marden The Secret of Achievement Training**: Added "The Secret of Achievement" (134 chunks, 51,256 words) - Marden's comprehensive guide to success principles, personal development, optimism, positive thinking, cultivating will-power and character, New Thought philosophy. Total Marden corpus now 416 chunks across 5 major works.
- **Kuczynski AI & Philosophy Training Complete**: Added "AI and Philosophy: Logic, Epistemology, Mind & System L" (82 chunks, 31,451 words) - comprehensive treatise on AI Logic vs Classical Logic, System L (pattern recognition, meta-reasoning, defeasible inference), AI solutions to Gettier problem and induction, critique of Computational Theory of Mind, LLM evidence for semantics/grammar, Universal Grammar reconciliation with Connectionism, AI architecture and theories of self/truth/explanation
- **CRITICAL PRODUCTION BUG FIXED (v2)**: Resolved persistent race condition where streaming responses vanished in deployment. Root cause: refetch completed BEFORE server committed message to database, overwriting cache with old data. Fix: Keep message visible as `pendingAssistantMessage` until refetch confirms persistence (message count increase + content match), preventing blank screen during database write delay. Uses local accumulators to avoid stale state closure bugs. Applied to both main chat and figure chat.

## Overview
"Ask A Philosopher" is a philosophical Q&A application designed for deep philosophical discourse with 44 philosophical and literary figures. It leverages their actual writings and advanced AI to provide nuanced and contextually rich responses. The platform integrates philosophical papers as foundational texts, enabling the AI to reason and adapt based on user sophistication. It supports multi-author conversations through a Retrieval-Augmented Generation (RAG) system, ensuring each figure's responses are grounded in their respective works. The project aims to offer an accessible and engaging way to explore complex philosophical ideas and literary works, with J.-M. Kuczynski as the default philosopher.

## User Preferences
- **Authentic Quotes Required**: Responses must include at least one verbatim quote, with thematic alignment acceptable.
- **Response Length Control**: User can type desired response length in words, or leave blank for Auto mode where AI chooses optimal length based on question complexity
- **Quote Frequency Control**: User can adjust how many verbatim quotes appear in responses with three levels: Low (1 quote), Normal (1-2 quotes), or High (2-3 quotes)
- **Paper Writing Mode**: Toggle to request formal philosophical papers with academic conventions, proper argumentation, and scholarly language
- **Variation**: Never give the same answer twice.
- **Logical Structure Parsing**: All figures must parse the logical structure of questions (definition? mechanism? distinction? derivation? objection?) and address THAT specific question, not general talking points. No pivoting to prepared remarks.

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
- **AI Interaction**: Anthropic Claude Sonnet 4.5 is the primary AI. It extrapolates and reasons beyond integrated papers, grounds responses with authentic quotes, maintains conversation history, and operates with an AI temperature of 0.7. Figures are configured for "METICULOUS ARGUMENT ENGAGEMENT," requiring point-by-point reasoning, logical structure parsing, first-person voice, defense of positions, and mandatory verbatim quotes. Philosophers can cite their own works by title.
- **Streaming**: Server-Sent Events (SSE) for real-time word-by-word AI response streaming.
- **Quote Verification**: Comprehensive normalization for quote matching across text formats.
- **Settings**: Users can control response length, quote frequency, and toggle paper writing mode.
- **Paper Writing Feature**: Allows philosophers to write original papers (up to 1500 words) in their authentic voice, utilizing RAG retrieval, with streaming generation and text file download options.
- **Guest User Management**: Session-based storage with auto-generated guest user IDs maintains state without authentication.
- **RAG System**: Papers are chunked, embedded into 1536-dimension vectors, and stored in a PostgreSQL database with pgvector. Semantic search retrieves relevant chunks for the LLM.
- **Multi-Author RAG System**: Maintains separate vector embeddings for each author, filtering searches by author ID to ensure responses are grounded in their specific works.
- **Integrated Philosophical and Literary Works**: Extensive works from 44 philosophers and literary figures are integrated.

## External Dependencies
- **AI Providers**: Anthropic Claude Sonnet 4.5, OpenAI GPT-4o, DeepSeek, Perplexity.
- **Database**: PostgreSQL (Neon) with pgvector extension.
- **Embeddings**: OpenAI `text-embedding-ada-002`.