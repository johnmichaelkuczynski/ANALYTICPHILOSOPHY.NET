# Ask A Philosopher - Philosophical Q&A Application

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