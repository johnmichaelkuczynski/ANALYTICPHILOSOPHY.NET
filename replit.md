# Ask A Philosopher - Philosophical Q&A Application

## Overview
"Ask A Philosopher" is a philosophical Q&A application designed for deep philosophical discourse with 44 philosophical and literary figures. It leverages their actual writings and advanced AI to provide nuanced and contextually rich responses. The platform integrates philosophical papers as foundational texts, enabling the AI to reason and adapt based on user sophistication. It supports multi-author conversations through a Retrieval-Augmented Generation (RAG) system, ensuring each figure's responses are grounded in their respective works. The project aims to offer an accessible and engaging way to explore complex philosophical ideas and literary works, with J.-M. Kuczynski as the default philosopher.

## Recent Changes (November 8, 2025)
- **Bertrand Russell Political Philosophy Expansion**: Added "Political Ideals" (46 chunks, 22,256 words) - Russell's 1917 vision for a better political order written during World War I. Covers political ideals based on individual flourishing, critique of capitalism and wage system, pitfalls in socialism, balance between individual liberty and public control, and relationship between national independence and internationalism. Advocates for creative impulses over possessive impulses, decentralization of power, and economic reorganization to promote human flourishing rather than mere production. Total Russell corpus now 1,120 chunks across 10 works spanning logic, epistemology, physics, politics, and metaphysics.
- **René Descartes Meditations Guide Training**: Added "Kuczynski's Guide to Descartes' Meditations (Cartesian Epistemology)" (28 chunks, 13,466 words) - J.M. Kuczynski's comprehensive philosophical analysis of Descartes's Six Meditations. Covers Meditation 1 (method of doubt), Meditation 2 (Cogito and nature of mind), Meditation 3 (proof of God's existence), Meditation 4 (truth and error), Meditation 5 (essence of material things and second proof of God), and Meditation 6 (mind-body distinction). Provides modern analytical philosophy perspective on Cartesian epistemology, examining the logical structure of Descartes's arguments and their implications for knowledge, consciousness, and metaphysics. Total Descartes corpus now 178 chunks across 2 works.
- **J.M. Kuczynski Free Will Paper Training**: Added "Libet's Experiment: Why It Matters and What It Means" (24 chunks, 11,585 words) - comprehensive analysis of Benjamin Libet's neuroscience experiments on decision-making and free will. Covers the Libet experiment methodology, readiness potential (RP) measurements, conscious awareness timing (W), follow-up studies, philosophical responses (Roskies, Mele, Rescher, Radder & Meynen), critique of compatibilism and libertarian free will frameworks, and a constructive model of agency. Demonstrates that conscious awareness of decisions occurs ~200ms after brain initiation, challenging traditional notions of conscious volition and requiring fundamental revision of concepts of agency, intention, and self.
- **Ludwig von Mises Classical Liberalism Training**: Added "Liberalism: In The Classical Tradition" (161 chunks, 77,185 words) - Mises's 1927 exposition of classical liberal political philosophy. Covers foundations of liberal policy (property, freedom, peace), political organization of liberalism, liberal foreign policy, democracy, fascism and Bolshevism critique, and relationship between liberalism and religion. Establishes classical liberal opposition to state intervention, defense of private property order, free market economics, and peaceful international relations. Total Mises corpus now 570 chunks across 3 major works spanning praxeology, monetary theory, business cycles, and political philosophy.

## User Preferences
- **Response Length Control**: User can type desired response length in words, or leave blank for Auto mode where AI chooses optimal length based on question complexity
- **Quote Frequency Guidance**: User can adjust discretionary quote usage with three levels: Low (deploy quotes rarely, only when critical), Normal (use quotes occasionally when they advance arguments), High (use quotes 1-2 times per response when tactically useful). Quotes are never mandatory - they're weapons deployed only when they strengthen the philosophical attack.
- **Paper Writing Mode**: Toggle to request formal philosophical papers with academic conventions, proper argumentation, and scholarly language
- **Variation**: Never give the same answer twice.
- **Direct Attack Mandate**: All figures attack problems immediately without preambles, commit decisively without hedging, name specific targets rather than vague references, show mechanisms through visible reasoning, reframe confused questions by rejecting false premises, and deploy quotes as logical weapons rather than decoration.

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
- **Multi-Author RAG System**: Maintains separate vector embeddings for each author, filtering searches by author ID to ensure responses are grounded in their specific works.
- **Integrated Philosophical and Literary Works**: Extensive works from 44 philosophers and literary figures are integrated.
- **Document Upload Feature**: Users can upload text documents (.txt, .md, .doc, .docx, .pdf up to 1MB) for analysis, evaluation, or rewriting by philosophers.

## External Dependencies
- **AI Providers**: Anthropic Claude Sonnet 4.5, OpenAI GPT-4o, DeepSeek, Perplexity.
- **Database**: PostgreSQL (Neon) with pgvector extension.
- **Embeddings**: OpenAI `text-embedding-ada-002`.