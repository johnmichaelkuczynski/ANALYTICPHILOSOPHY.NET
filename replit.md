# Ask A Philosopher - Philosophical Q&A Application

## Recent Changes (November 8, 2025)
- **CRITICAL PRODUCTION BUG FIXED (v2)**: Resolved persistent race condition where streaming responses vanished in deployment. Root cause: refetch completed BEFORE server committed message to database, overwriting cache with old data. Fix: Keep message visible as `pendingAssistantMessage` until refetch confirms persistence (message count increase + content match), preventing blank screen during database write delay. Uses local accumulators to avoid stale state closure bugs. Applied to both main chat and figure chat.
- **Isaac Newton Complete Works Training**: Added "Delphi Collected Works of Sir Isaac Newton" (2,145 chunks, 705,529 words) - Newton's complete scientific and philosophical works including Principia Mathematica, Opticks, mathematical writings, and natural philosophy
- **Quote Frequency Control Feature**: Added new setting allowing users to adjust quote frequency (Low/Normal/High) controlling how many verbatim quotes (1, 1-2, or 2-3) appear in responses
- **Russell Bergson Critique Training**: Added "The Philosophy of Bergson" (34 chunks, 13,311 words) - Russell's critical analysis of Bergson's philosophy covering pragmatism, intuition vs intellect, duration, creative evolution, and vital impulse
- **Kuczynski Legal Philosophy Training**: Added "The Moral Structure of Legal Obligation" (41 chunks, 16,266 words) - comprehensive treatise on legal philosophy covering the relationship between law and morality, Hart-Dworkin debate, nature of legal obligation, governmental assurances, legal interpretation, and international law
- **Aristotle Complete Works Training**: Successfully trained Aristotle on his complete works (309 semantic chunks from 123,307 words) covering physics, metaphysics, ethics, politics, logic, rhetoric, poetics, biology, and the foundations of Western philosophy
- **Freud Complete Works Training**: Successfully trained Sigmund Freud on his complete collected works (459 semantic chunks from 183,468 words) covering Three Contributions to the Theory of Sex, Dream Psychology, psychoanalysis, sexual development, neuroses, unconscious processes, and psychodynamic theory
- **Kuczynski Causality & Empiricism Training Complete**: Added "Causality" (71 chunks, 28,381 words) and "Empiricism and its Limits" (49 chunks, 19,492 words) - comprehensive coverage of causation theory, INUS-conditions, Aristotle's four causes, empiricism vs rationalism, sense-perception, universals, and non-empirical knowledge
- **Kuczynski Paradoxes Training Complete**: Added "Ninety Paradoxes of Philosophy and Psychology" (28 chunks, 10,931 words) - comprehensive collection of philosophical paradoxes including Liar Paradox, Sorites Paradox, Buridan's Ass, Analysis Paralysis, Self-absorption Paradox, and many more with Kuczynski's original solutions
- **William James Complete Works Training**: Successfully trained William James on his complete collected works (8 major collections including The Will to Believe, Talks to Teachers, Varieties of Religious Experience, Pragmatism, A Pluralistic Universe, The Meaning of Truth, Memories and Studies, and Essays in Radical Empiricism) - 1,719 semantic chunks from 644,981 words covering pragmatism, psychology, religious experience, radical empiricism, and philosophical psychology
- **Kuczynski Epistemology Training Complete**: Added 3 major works (223 semantic chunks total): "A Crash Course in Analytic Philosophy" (52 chunks), "Theoretical Knowledge & Inductive Inference" (90 chunks), and "Kant: Analogue vs Digital Reasoning" (81 chunks) - comprehensive coverage of epistemology, inductive inference, knowledge theory, and Kant's cognitive architecture
- **CRITICAL DEPLOYMENT BUG FIXED**: Resolved race condition where AI responses vanished after streaming completed in production. Fixed by immediately adding completed message to cache before clearing streaming state, eliminating the timing issue between refetch and UI update.
- **Markdown Syntax Removed**: Added universal formatting rule preventing all philosophers from using markdown syntax (###, **, etc.) - responses now display as clean plain text
- **Leibniz Training Complete**: Added "Theodicy: Essays on the Goodness of God, the Freedom of Man and the Origin of Evil" (49 chunks from 556 lines) - comprehensive treatise on theodicy, the problem of evil, God's justice, free will, optimism, and the best of all possible worlds
- **Side-by-Side Comparison Mode Added**: Users can now select TWO philosophers and compare their perspectives in real-time! A "Compare Thinkers" button opens a modal where users select 2 figures, ask one question, and see both philosophers respond simultaneously in side-by-side columns with streaming responses. Perfect for comparing how Freud vs Jung, or Plato vs Aristotle, etc., would answer the same question.
- **Comparison Modal Scrolling Fixed**: Both conversation columns now have independent scrolling, preventing response cutoff at the top
- **Work Citation Capability Enhanced**: Philosophers can now cite their own works by title when asked "In which works do you discuss X?" - RAG system provides paper titles in context, and figures are explicitly instructed to list relevant works and reference them by name
- **Response Length Input**: Replaced slider with text input for word count (enter number of words or leave blank for Auto mode where AI chooses optimal length)
- **Settings UI Simplified**: Removed 9 unused persona settings (voice type, intelligence level, emotional tone, voice gender, formality, focus on goals, narration, background image), narrowed sidebar from w-80/xl:w-96 to w-64, keeping only Response Length input and Write a Paper toggle
- **Database Schema Streamlined**: Converted writePaper from integer (0/1) to proper boolean type, removed all unused persona settings fields
- **Code Cleanup**: Removed goals management features, TTS/narration functionality, and all related mutations and API endpoints
- **Prompt Builder Simplified**: Replaced complex persona logic with simple responseLength and writePaper handling for clean, focused philosophical discourse
- **Marden New Training Complete**: Added "Keeping Fit" (2,062 lines on health, fitness, nutrition, aging well) and "Self Investment" (116 chunks from 1,947 lines on personal development, success principles, character building)
- **Kuczynski Major Work Available**: "Literal Meaning & Cognitive Content" (37,341 lines) - comprehensive treatise on semantics, reference, meaning, word-meaning vs thought-content, Frege's paradoxes, cognitive content, externalism, empty names, definite descriptions
- **Kuczynski New Training Complete**: Added comprehensive "AI and Philosophy" collection (65 chunks covering AI Logic, epistemology, System L, Gettier problem, CTM critique, etc.) and "Religion vs. Spirituality" text
- **Cross-Figure Awareness System Deployed**: Created universal system preventing stonewalling when philosophers are asked to compare views with other figures
- **8 Key Philosophers Updated & Deployed**: Peirce, Kuczynski, Freud, Adler, Descartes, Galileo, Russell, and Plato now have cross-figure awareness active
- **Peirce Stonewalling Issue FIXED**: Peirce now engages substantively when asked to compare with Kuczynski or any other philosopher
- **Status**: 8 of 44 philosophers have full cross-figure awareness; remaining 36 can be updated for system-wide consistency

## Overview
"Ask A Philosopher" is a philosophical Q&A application for deep philosophical discourse with 44 philosophical and literary figures using their actual writings and advanced AI. J.-M. Kuczynski remains the default philosopher. It integrates philosophical papers as foundational texts, enabling AI to reason and adapt responses based on user sophistication. The platform supports multi-author conversations with various philosophical and literary figures, each grounded in their respective works through a Retrieval-Augmented Generation (RAG) system. The project aims to provide an accessible and engaging way to explore complex philosophical ideas and literary works.

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
- **Layout**: A 3-column layout includes a far-left column for philosophical figures, a narrow middle sidebar (w-64) for simple settings, and a right area for the main chat.
- **Accessibility**: No login is required; settings are minimal and directly visible (Response Length text input and Write a Paper toggle only).
- **Visuals**: Features an animated Kuczynski icon in the header, AI-generated portrait avatars for all philosophical and literary figures, and minimalistic design with elegant typography. Dark mode is supported.
- **"Talk with X" Feature**: The far-left column displays clickable philosophical figures with portrait avatars, allowing personalized conversations.
- **"Compare Thinkers" Feature**: Header button opens a modal for selecting two philosophers. Once selected, displays a two-column comparison view where both philosophers answer the same question simultaneously with real-time streaming. Each column shows the philosopher's avatar, name, conversation history, and streaming response. Perfect for exploring how different philosophical perspectives approach the same topic.

### Technical Implementations
- **Frontend**: Built with React, TypeScript, Wouter, TanStack Query, Shadcn UI, and Tailwind CSS.
- **Backend**: Utilizes Express.js with Node.js and Drizzle ORM.
- **AI Interaction**: Anthropic Claude Sonnet 4.5 is the primary AI. The AI extrapolates and reasons beyond integrated papers, grounded with authentic quotes, maintains conversation history, and has an AI temperature of 0.7. Figures are configured for "METICULOUS ARGUMENT ENGAGEMENT" requiring them to identify, acknowledge, and address specific logical mechanics of arguments point-by-point, provide step-by-step reasoning, and parse the logical structure of every question. They are also configured to prohibit meta-commentary, use a first-person voice, defend their positions, provide thorough responses, intelligently evaluate questions, and always include mandatory verbatim quotes from their works. Philosophers can cite their own works by title when asked which works discuss specific topics, using paper titles provided by the RAG retrieval system.
- **Streaming**: Server-Sent Events (SSE) provide real-time word-by-word AI response streaming.
- **Quote Verification**: A comprehensive normalization system handles quote matching across various text formats.
- **Settings**: Users can type desired Response Length in words (or leave blank for Auto mode), adjust Quote Frequency (Low/Normal/High), and toggle Write a Paper mode for formal philosophical papers.
- **Paper Writing Feature**: Users can request any philosopher to write original papers (up to 1500 words) on any topic in their authentic voice, drawing on their actual works via RAG retrieval. Papers are generated with streaming, can be downloaded as text files, and include verbatim quotes.
- **Guest User Management**: Session-based storage with auto-generated guest user IDs maintains state without authentication.
- **RAG System**: Papers are chunked into 400-word segments, embedded into 1536-dimension vectors, and stored in a PostgreSQL database with the pgvector extension. Semantic search retrieves the top 6 most relevant chunks for the LLM (12 for paper writing).
- **Multi-Author RAG System**: Maintains separate vector embeddings for each author, filtering semantic searches by author ID to ensure responses are grounded solely in their respective works.
- **Integrated Philosophical and Literary Works**: The system integrates extensive works from various philosophers including J.-M. Kuczynski, Plato, Karl Marx, John Maynard Keynes, Carl Jung, Immanuel Kant, Arthur Schopenhauer, Henri Poincaré, Henri Bergson, Niccolò Machiavelli, David Hume, Isaac Newton, John Locke, Charles Darwin, Bertrand Russell, Galileo Galilei, Friedrich Nietzsche, Gustave Le Bon, Francis Bacon, Sigmund Freud, William James, Gottfried Wilhelm Leibniz, Baruch Spinoza, Aristotle, John Dewey, René Descartes, Vladimir Lenin, G.W.F. Hegel, Thomas Hobbes, Thorstein Veblen, Jean-Jacques Rousseau, John Stuart Mill, Friedrich Engels, Ludwig von Mises, Adam Smith, Herbert Spencer, Orison Swett Marden, Alfred Adler, and Charles Sanders Peirce, and literary figures such as Edgar Allan Poe, Jack London, Ambrose Bierce, François de La Rochefoucauld, and James Allen.

## External Dependencies
- **AI Providers**: Anthropic Claude Sonnet 4.5, OpenAI GPT-4o, DeepSeek, Perplexity.
- **Database**: PostgreSQL (Neon) with pgvector extension.
- **Embeddings**: OpenAI `text-embedding-ada-002`.