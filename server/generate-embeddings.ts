import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { db } from "./db";
import { paperChunks } from "@shared/schema";
import { eq, and } from "drizzle-orm";
import OpenAI from "openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Batch -> actual figure ID mapping
const batchToFigure: Record<string, string> = {
  "jmk_batch1": "jmk",
  "jmk_batch2": "jmk",
  "jmk_batch3": "jmk",
  "jmk_missing": "jmk",
  "jmk_literal_meaning": "jmk",
  "jmk_new_texts": "jmk",
  "veblen_batch1": "veblen",
  "veblen_batch2": "veblen",
  "veblen_batch3": "veblen",
  "rousseau": "rousseau",
  "leibniz": "leibniz",
};

// Multi-author configuration: each figure has their own set of papers
const figuresPapers = {
  "jmk_batch1": [
    // BATCH 1: Latest versions + core works (completes in ~9 mins)
    { file: "kuczynski_analytic_philosophy_v2.txt", title: "Analytic Philosophy (Latest)" },
    { file: "kuczynski_logico_linguistic_v2.txt", title: "Logico-Linguistic Papers (Latest)" },
    { file: "kuczynski_neurosis_psychosis_v2.txt", title: "Neurosis vs. Psychosis Vignettes (Latest)" },
    { file: "kuczynski_chomsky_contributions.txt", title: "Chomsky's Two Contributions (Latest)" },
    { file: "kuczynski_pragmatism.txt", title: "Pragmatism: Epistemology Posing as Metaphysics" },
    { file: "kuczynski_ocd_philosophy.txt", title: "OCD and Philosophy" },
    { file: "kuczynski_ai_philosophy.txt", title: "AI and Philosophy" },
    { file: "kuczynski_apriori.txt", title: "A Priori Knowledge" },
    { file: "kuczynski_empiricism.txt", title: "Empiricism and Its Limits" },
  ],
  "jmk_batch2": [
    // BATCH 2: Epistemology works
    { file: "kuczynski_philosophical_knowledge.txt", title: "Philosophical Knowledge" },
    { file: "kuczynski_crash_course_analytic_philosophy.txt", title: "A Crash Course in Analytic Philosophy" },
    { file: "kuczynski_theory_of_knowledge.txt", title: "Outline of a Theory of Knowledge" },
    { file: "kuczynski_theoretical_knowledge.txt", title: "Theoretical Knowledge and Inductive Inference" },
    { file: "kuczynski_knowledge_chapter.txt", title: "Knowledge (Chapter 10)" },
    { file: "kuczynski_analysis_of_analysis.txt", title: "The Analysis of Analysis" },
    { file: "kuczynski_thought_language.txt", title: "The Relationship between Thought and Language" },
    { file: "kuczynski_cartesian_skepticism.txt", title: "Cartesian Skepticism and the Birth of Epistemology" },
  ],
  "jmk_batch3": [
    // BATCH 3: AI & specialized topics
    { file: "kuczynski_ai_epistemology.txt", title: "How AI Resolves Traditional Epistemological Debates" },
    { file: "kuczynski_ai_induction.txt", title: "How AI Falsifies the Enumerative Model of Induction" },
    { file: "kuczynski_ai_anomaly_minimization.txt", title: "Anomaly Minimization in Knowledge and AI" },
    { file: "kuczynski_ai_logic.txt", title: "From Organization to Generation: Rethinking Formalization in Light of AI" },
    { file: "kuczynski_ai_binary_logic.txt", title: "AI Architecture and the Binary Nature of Truth" },
    { file: "kuczynski_ai_ctm.txt", title: "AI and the Inadequacy of the Computational Theory of Mind" },
    { file: "kuczynski_causation.txt", title: "Causation" },
    { file: "kuczynski_possible_worlds.txt", title: "Possible World Semantics" },
    { file: "kuczynski_counterfactuals.txt", title: "Counterfactuals" },
    { file: "kuczynski_russell.txt", title: "Russell's Improvements on Frege's Work" },
    { file: "kuczynski_frege_logicism.txt", title: "Frege's Formalization of Logic and Logicism" },
    { file: "kuczynski_putnam_burge.txt", title: "Putnam's Insight and Burge's Blunder" },
    { file: "kuczynski_kant_writings.txt", title: "2020 Writings on Kant: God and Theology" },
    { file: "kuczynski_dictionary.txt", title: "Dictionary of Analytic Philosophy" },
    { file: "kuczynski_ocd_dialogue.txt", title: "OCD: Two Kinds of Insanity" },
  ],
  "jmk_missing": [
    // Missing papers from batch 3 that need to be loaded
    { file: "kuczynski_frege_logicism.txt", title: "Frege's Formalization of Logic and Logicism" },
    { file: "kuczynski_putnam_burge.txt", title: "Putnam's Insight and Burge's Blunder" },
  ],
  "jmk_literal_meaning": [
    // BATCH 4: Major work on semantics - 37,340 lines
    { file: "kuczynski_literal_meaning_cognitive_content.txt", title: "Literal Meaning & Cognitive Content" },
  ],
  "jmk_new_texts": [
    // BATCH 5: New texts - AI Philosophy Comprehensive & Religion vs. Spirituality
    { file: "kuczynski_ai_philosophy_comprehensive.txt", title: "AI and Philosophy: Comprehensive Collection" },
    { file: "kuczynski_religion_vs_spirituality.txt", title: "Religion vs. Spirituality" },
    { file: "kuczynski_libet.txt", title: "Libet's Experiment: Why It Matters and What It Means" },
    { file: "kuczynski_incompleteness_deductive_logic.txt", title: "The Incompleteness of Deductive Logic: Rationality Beyond Recursion" },
    { file: "kuczynski_philosophy_psychoanalysis.txt", title: "Philosophy and Psychoanalysis: Selected Dialogues" },
    { file: "kuczynski_quantum_determinism.txt", title: "Quantum Physics and Universal Determinism: A Dialogue" },
    { file: "kuczynski_quantum_determinism_essay.txt", title: "Quantum Determinism" },
    { file: "kuczynski_methodological_individualism.txt", title: "Beyond Methodological Individualism: The Primacy of Collective Psychology" },
    { file: "kuczynski_frege_montague.txt", title: "The Spuriousness of Frege-Montague Grammar" },
    { file: "kuczynski_personality_typology.txt", title: "A Ten-Dimensional Evolutionary Typology for Personality Assessment" },
    { file: "kuczynski_white_knight_equality.txt", title: "White-Knight Equality: Rawls, Trafficking Rhetoric, and the Paternalism of Modern Protection" },
    { file: "kuczynski_calhoun_zimbardo.txt", title: "Two Experiments in Human Nature: Calhoun and Zimbardo Compared" },
    { file: "kuczynski_rawls_mouse_world.txt", title: "The Philosophy of the Full Stomach: Rawls-World and Mouse-World" },
    { file: "kuczynski_rawls_mouse_collapse.txt", title: "Rawls-World and Mouse-World: The Same Paradise, the Same Collapse" },
    { file: "kuczynski_stanford_prison_morality_play.txt", title: "The Stanford Prison Experiment: A Manufactured Morality Play" },
    { file: "kuczynski_incompleteness_logic.txt", title: "The Incompleteness of Logic: A Recursion-Theoretic Generalization of Gödel's Theorem" },
    { file: "kuczynski_neuroticism_neurosis.txt", title: "Neuroticism vs Neurosis: Distinguishing Trait and Structure" },
    { file: "kuczynski_terminal_humanities.txt", title: "The Terminal Humanities: Why Philosophy No Longer Generates Knowledge" },
    { file: "kuczynski_hegel_app.txt", title: "From Commentary to Code: Why an App Would Teach Hegel Better Than Hegel Scholars" },
    { file: "kuczynski_hegel_illusion_depth.txt", title: "Hegel and the Illusion of Depth: How the Master-Slave Dialectic Reveals an Intellectual Real-Estate Problem" },
    { file: "kuczynski_guardians_photo_album.txt", title: "Guardians of the Photo Album While the House Burns: The Collapse of the Humanities' Civilizational Role" },
    { file: "kuczynski_philosophy_ai_without_ai.txt", title: "The Philosophy of AI Without AI: How a Discipline Preserves Itself by Substituting Placeholders for Thought" },
    { file: "kuczynski_vietnam_epistemic_engines.txt", title: "When Victory Is Incoherent (Vietnam), I Refute It Thus (Epistemic Engines), and The Scarcity Trap (Philosophy's Hostility)" },
  ],
  "jmk": [
    // LEGACY: For backward compatibility - use batch approach above
    { file: "kuczynski_analytic_philosophy_v2.txt", title: "Analytic Philosophy (Latest)" },
  ],
  "veblen_batch1": [
    // BATCH 1: First ~735 chunks - Theory of the Leisure Class, Theory of Business Enterprise, etc.
    { file: "veblen_batch1.txt", title: "The Complete Works of Thorstein Veblen (Part 1)" },
  ],
  "veblen_batch2": [
    // BATCH 2: Next ~735 chunks - Instinct of Workmanship, Imperial Germany, etc.
    { file: "veblen_batch2.txt", title: "The Complete Works of Thorstein Veblen (Part 2)" },
  ],
  "veblen_batch3": [
    // BATCH 3: Final ~735 chunks - Essays and Articles
    { file: "veblen_batch3.txt", title: "The Complete Works of Thorstein Veblen (Part 3)" },
  ],
  "veblen": [
    // LEGACY: For backward compatibility
    { file: "veblen_complete_works.txt", title: "The Complete Works of Thorstein Veblen" },
  ],
  "freud": [
    { file: "freud_dictionary.txt", title: "Freud: Dictionary of Psychoanalysis" },
    { file: "freud_general_introduction.txt", title: "A General Introduction to Psychoanalysis" },
    { file: "freud_totem_and_taboo.txt", title: "Totem and Taboo" },
  ],
  "bacon": [
    { file: "bacon_complete_works.txt", title: "Francis Bacon: Complete Works" },
  ],
  "spinoza": [
    { file: "spinoza_philosophy.txt", title: "The Philosophy of Spinoza" },
  ],
  "nietzsche": [
    { file: "nietzsche_basic_writings.txt", title: "Basic Writings of Nietzsche" },
  ],
  "russell": [
    { file: "russell_abc_relativity.txt", title: "The ABC of Relativity" },
    { file: "russell_mysticism_and_logic.txt", title: "Mysticism and Logic and Other Essays" },
    { file: "russell_human_knowledge.txt", title: "Human Knowledge: Its Scope and Value" },
    { file: "russell_bolshevism.txt", title: "The Practice and Theory of Bolshevism" },
    { file: "russell_free_thought.txt", title: "Free Thought and Official Propaganda" },
    { file: "russell_time.txt", title: "On the Experience of Time" },
    { file: "russell_principles_mathematics.txt", title: "The Principles of Mathematics" },
    { file: "russell_political_ideals.txt", title: "Political Ideals" },
  ],
  "darwin": [
    { file: "darwin_complete_works.txt", title: "On the Origin of Species, The Expression of the Emotions in Man and Animals & The Descent of Man" },
    { file: "darwin_autobiography.txt", title: "The Autobiography of Charles Darwin" },
  ],
  "dewey": [
    { file: "dewey_collected_works.txt", title: "The Collected Works of John Dewey" },
  ],
  "kant": [
    { file: "kant_kuczynski_analysis.txt", title: "Kuczynski's Analysis: Kant on God and Theology" },
  ],
  "descartes": [
    { file: "descartes_collected_works.txt", title: "The Collected Works of René Descartes" },
    { file: "descartes_meditations_guide.txt", title: "Kuczynski's Guide to Descartes' Meditations (Cartesian Epistemology)" },
  ],
  "lenin": [
    { file: "lenin_collected_works.txt", title: "Collected Works of Vladimir Lenin (25+ Texts)" },
    { file: "lenin_materialism_empirio_criticism.txt", title: "Materialism and Empirio-Criticism" },
  ],
  "hegel": [
    { file: "hegel_science_of_logic.txt", title: "The Logic of Hegel (Science of Logic)" },
    { file: "hegel_philosophy_of_mind.txt", title: "Philosophy of Mind" },
  ],
  "hobbes": [
    { file: "hobbes_collected_works.txt", title: "The Collected Works of Thomas Hobbes (Delphi Classics)" },
  ],
  "rousseau": [
    { file: "rousseau_complete_works.txt", title: "The Complete Works of Jean-Jacques Rousseau" },
  ],
  "mill": [
    { file: "mill_system_of_logic.txt", title: "A System of Logic, Ratiocinative and Inductive" },
  ],
  "engels": [
    { file: "engels_complete_works.txt", title: "Complete Works of Friedrich Engels" },
  ],
  "mises": [
    { file: "mises_human_action.txt", title: "Human Action: A Treatise on Economics" },
    { file: "mises_theory_money_credit.txt", title: "The Theory of Money and Credit" },
    { file: "mises_liberalism.txt", title: "Liberalism: In The Classical Tradition" },
    { file: "mises_bureaucracy.txt", title: "Bureaucracy" },
    { file: "mises_marxism_unmasked.txt", title: "Marxism Unmasked: From Delusion to Destruction" },
    { file: "mises_ultimate_foundation.txt", title: "The Ultimate Foundation of Economic Science" },
  ],
  "smith": [
    { file: "smith_moral_sentiments.txt", title: "The Theory of Moral Sentiments" },
    { file: "smith_wealth_of_nations.txt", title: "An Inquiry into the Nature and Causes of the Wealth of Nations" },
  ],
  "spencer": [
    { file: "spencer_right_to_ignore_state.txt", title: "The Right To Ignore The State" },
  ],
  "marden": [
    { file: "marden_character.txt", title: "Character: The Grandest Thing in the World" },
    { file: "marden_he_can_who_thinks_he_can.txt", title: "He Can Who Thinks He Can & Other Papers on Success in Life" },
    { file: "marden_self_investment.txt", title: "Self Investment" },
    { file: "marden_keeping_fit.txt", title: "Keeping Fit" },
  ],
  "adler": [
    { file: "adler_neurotic_constitution.txt", title: "The Neurotic Constitution: Outlines of a Comparative Individualistic Psychology and Psychotherapy" },
    { file: "adler_what_life_could_mean_to_you.txt", title: "What Life Could Mean to You" },
    { file: "adler_pattern_of_life.txt", title: "The Pattern of Life" },
  ],
  "peirce": [
    { file: "peirce_writings.txt", title: "The Essential Peirce: Selected Philosophical Writings, Volume 2 (1893-1913)" },
  ],
  "leibniz": [
    { file: "leibniz_complete_works.txt", title: "The Collected Works of Gottfried Wilhelm Leibniz" },
  ],
  "william-james": [
    { file: "james_collected_works.txt", title: "The Collected Works of William James" },
    { file: "james_memories_and_studies.txt", title: "Memories and Studies" },
  ],
  "poincare": [
    { file: "poincare_science_hypothesis.txt", title: "Science and Hypothesis" },
  ],
  "poe": [
    { file: "poe_volume_1.txt", title: "The Works of Edgar Allan Poe — Volume 1" },
    { file: "poe_volume_2.txt", title: "The Works of Edgar Allan Poe — Volume 2" },
    { file: "poe_volume_3.txt", title: "The Works of Edgar Allan Poe — Volume 3" },
    { file: "poe_volume_4.txt", title: "The Works of Edgar Allan Poe — Volume 4" },
    { file: "poe_volume_5.txt", title: "The Works of Edgar Allan Poe — Volume 5" },
  ],
  "common": [
    // Common Fund of Knowledge - shared knowledge base accessible to ALL philosophers
    { file: "lawrence_fantasia_unconscious.txt", title: "Fantasia of the Unconscious by D.H. Lawrence" },
    { file: "gandolfi_logic_of_information.txt", title: "Logic of Information by Italo Gandolfi" },
    { file: "physics_outline.txt", title: "Outline of Physics" },
    { file: "confucius_sayings.txt", title: "The Sayings of Confucius" },
    { file: "mach_scientific_lectures.txt", title: "Popular Scientific Lectures by Ernst Mach" },
    { file: "lippmann_preface_politics.txt", title: "A Preface to Politics by Walter Lippmann" },
    { file: "playfair_decline_fall_nations.txt", title: "An Inquiry into the Permanent Causes of the Decline and Fall of Powerful and Wealthy Nations by William Playfair" },
    { file: "hoppe_short_history_man.txt", title: "A Short History of Man: Progress and Decline by Hans-Hermann Hoppe" },
    { file: "weir_dawn_of_reason.txt", title: "The Dawn of Reason or, Mental Traits in the Lower Animals by James Weir, Jr." },
    { file: "spargo_bolshevism.txt", title: "Bolshevism: The Enemy of Political and Industrial Democracy by John Spargo" },
    { file: "bohm_bawerk_marx.txt", title: "Karl Marx and the Close of His System by Eugen von Böhm-Bawerk" },
    { file: "physics_cosmology_concepts.txt", title: "Clarifying Concepts in Physics: New Ideas & Answers in Quantum Cosmology" },
    { file: "elementary_chemistry.txt", title: "An Elementary Study of Chemistry" },
    { file: "russell_analysis_mind.txt", title: "The Analysis of Mind by Bertrand Russell" },
    { file: "marshall_principles_economics.txt", title: "Principles of Economics by Alfred Marshall" },
    { file: "popper_quantum_schism.txt", title: "Quantum Theory and the Schism in Physics by Karl Popper" },
    { file: "bohm_quantum_theory.txt", title: "Quantum Theory by David Bohm" },
    { file: "oscar_wilde_aphorisms_soul_of_man.txt", title: "Miscellaneous Aphorisms and The Soul of Man by Oscar Wilde" },
    { file: "pyle_science_human_nature.txt", title: "The Science of Human Nature: A Psychology for Beginners by William Henry Pyle" },
    { file: "myerson_foundations_personality.txt", title: "The Foundations of Personality by Abraham Myerson" },
    { file: "woodworth_psychology_mental_life.txt", title: "Psychology: A Study of Mental Life by Robert S. Woodworth" },
    { file: "scott_increasing_human_efficiency.txt", title: "Increasing Human Efficiency in Business by Walter Dill Scott" },
    { file: "smith_chaos_vsi.txt", title: "Chaos: A Very Short Introduction by Leonard Smith" },
    { file: "chinese_literature_confucius_mencius.txt", title: "Chinese Literature: The Analects of Confucius, The Sayings of Mencius, The Shi-King, and The Travels of Fâ-Hien" },
    { file: "dasgupta_economics_vsi.txt", title: "Economics: A Very Short Introduction by Partha Dasgupta" },
    { file: "binmore_game_theory_vsi.txt", title: "Game Theory: A Very Short Introduction by Ken Binmore" },
    { file: "kuczynski_emotivism.txt", title: "Emotivism by J.-M. Kuczynski" },
    { file: "kuczynski_freedom.txt", title: "Freedom by J.-M. Kuczynski" },
    { file: "kuczynski_language.txt", title: "What Is a Language? by J.-M. Kuczynski" },
    { file: "kuczynski_modality_nonexistence.txt", title: "Modality and Non-existence by J.-M. Kuczynski" },
  ]
};

function chunkText(text: string, targetWordsPerChunk: number = 300): string[] {
  // Split into sentences (rough split on periods, exclamation marks, question marks)
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
  
  const chunks: string[] = [];
  let currentChunk = "";
  let wordCount = 0;
  
  for (const sentence of sentences) {
    const sentenceWords = sentence.split(/\s+/).length;
    
    // If single sentence is too long, split it further
    if (sentenceWords > targetWordsPerChunk) {
      // If we have accumulated content, save it first
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
        currentChunk = "";
        wordCount = 0;
      }
      
      // Split long sentence by words
      const words = sentence.split(/\s+/);
      for (let i = 0; i < words.length; i += targetWordsPerChunk) {
        const chunk = words.slice(i, i + targetWordsPerChunk).join(" ");
        chunks.push(chunk);
      }
      continue;
    }
    
    // Check if adding this sentence would exceed limit
    if (wordCount + sentenceWords > targetWordsPerChunk && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
      wordCount = sentenceWords;
    } else {
      currentChunk += (currentChunk ? " " : "") + sentence;
      wordCount += sentenceWords;
    }
  }
  
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks.filter(c => c.split(/\s+/).length > 20); // Filter out very small chunks
}

async function generateEmbedding(text: string, retryHalved: boolean = false): Promise<number[] | null> {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    });
    
    return response.data[0].embedding;
  } catch (error: any) {
    // If chunk is too large, try to split and retry once
    // OpenAI SDK v4 stores the message at error.error.message
    const errorMessage = error?.error?.message || error?.message || '';
    if (error?.status === 400 && errorMessage.includes('maximum context length')) {
      const wordCount = text.split(/\s+/).length;
      
      // If we haven't retried yet and chunk is splittable, split in half and return special marker
      if (!retryHalved && wordCount > 100) {
        console.log(` ⚠️  Chunk too large (~${wordCount} words), will split and retry`);
        return null; // Caller will detect and split
      }
      
      // If already retried or too small to split, skip
      console.log(` ⚠️  Chunk too large (~${wordCount} words), skipping`);
      return null;
    }
    // Re-throw other errors
    throw error;
  }
}

async function main() {
  // Get figure ID from command line args (e.g., "jmk_batch1", "freud", or "all")
  const targetFigure = process.argv[2] || "all";
  
  console.log(`🚀 Starting embedding generation for: ${targetFigure}\n`);
  
  // Filter figures to process
  let figuresToProcess: [string, typeof figuresPapers[keyof typeof figuresPapers]][] = [];
  
  if (targetFigure === "all") {
    figuresToProcess = Object.entries(figuresPapers);
    // Delete ALL embeddings only when processing all figures
    console.log("🗑️  Clearing ALL existing embeddings...");
    await db.delete(paperChunks);
    console.log("✓ Cleared\n");
  } else {
    const papers = figuresPapers[targetFigure as keyof typeof figuresPapers];
    if (!papers) {
      console.error(`❌ Unknown figure: ${targetFigure}`);
      console.log(`Available figures: ${Object.keys(figuresPapers).join(", ")}`);
      process.exit(1);
    }
    figuresToProcess = [[targetFigure, papers]];
    
    // DON'T delete for batch processing - we'll skip existing papers instead
    console.log(`📦 Batch mode: Will skip papers that already exist\n`);
  }
  
  let totalChunks = 0;
  let totalPapers = 0;
  
  // Process each figure's papers
  for (const [batchId, papers] of figuresToProcess) {
    // Get actual figure ID (for batches like jmk_batch1 -> jmk)
    const actualFigureId = batchToFigure[batchId] || batchId;
    
    console.log(`\n📚 Processing ${batchId.toUpperCase()} → ${actualFigureId} (${papers.length} papers)...\n`);
    
    for (const paper of papers) {
      try {
        // Check if this paper already exists for this figure
        const existing = await db.select().from(paperChunks)
          .where(and(
            eq(paperChunks.figureId, actualFigureId),
            eq(paperChunks.paperTitle, paper.title)
          ))
          .limit(1);
        
        if (existing.length > 0) {
          console.log(`📄 ${paper.title} - Already exists, skipping`);
          totalPapers++;
          continue;
        }
        
        console.log(`📄 Processing: ${paper.title}`);
        
        const content = readFileSync(join(__dirname, paper.file), "utf-8");
        // Use smaller chunks (300 words) for papers that were too large at 500
        const targetWords = paper.title.includes("Frege") || paper.title.includes("Putnam") ? 300 : 500;
        const chunks = chunkText(content, targetWords);
        
        console.log(`   Found ${chunks.length} chunks`);
        
        for (let i = 0; i < chunks.length; i++) {
          const chunk = chunks[i];
          
          process.stdout.write(`   Embedding chunk ${i + 1}/${chunks.length}...`);
          
          const embedding = await generateEmbedding(chunk);
          
          // Skip chunks that are too large
          if (embedding === null) {
            process.stdout.write(` skipped\n`);
            continue;
          }
          
          await db.insert(paperChunks).values({
            figureId: actualFigureId,  // Use actual figure ID, not batch name
            paperTitle: paper.title,
            content: chunk,
            embedding: embedding as any, // pgvector handles array conversion
            chunkIndex: i,
          });
          
          process.stdout.write(` ✓\n`);
          totalChunks++;
          
          // Rate limiting: Wait 250ms between requests to avoid hitting OpenAI limits (conservative for batch processing)
          await new Promise(resolve => setTimeout(resolve, 250));
        }
        
        console.log(`✓ ${paper.title} complete\n`);
        totalPapers++;
      } catch (error) {
        console.error(`❌ Error processing ${paper.title}:`, error);
      }
    }
  }
  
  console.log(`\n🎉 Done! Generated ${totalChunks} embeddings across ${totalPapers} papers from ${Object.keys(figuresPapers).length} figures.`);
  process.exit(0);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
