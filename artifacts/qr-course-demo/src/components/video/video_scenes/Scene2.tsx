import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Scene2({ setCursorPos, setIsClicking }: { setCursorPos: (pos: {x: string, y: string}) => void, setIsClicking: (val: boolean) => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setCursorPos({ x: '35vw', y: '45vh' }); 
    
    const t1 = setTimeout(() => {
      setCursorPos({ x: '25vw', y: '23vh' }); // Move to LONG toggle
    }, 1500);

    const t2 = setTimeout(() => {
      setIsClicking(true);
      setPhase(1); // LONG clicked
    }, 2800);

    const t3 = setTimeout(() => {
      setIsClicking(false);
    }, 3000);

    const t4 = setTimeout(() => {
      setCursorPos({ x: '75vw', y: '16vh' }); // Move to Practice tab
    }, 3300);

    const t5 = setTimeout(() => {
      setIsClicking(true);
      setPhase(2); // Practice clicked
    }, 4500);

    const t6 = setTimeout(() => {
      setIsClicking(false);
      setPhase(3); // Show practice problem
    }, 5100);

    const t7 = setTimeout(() => {
      setCursorPos({ x: '60vw', y: '16vh' }); // Move back to Tutor tab
    }, 6500);

    const t8 = setTimeout(() => {
      setIsClicking(true);
      setPhase(4); // Tutor clicked
    }, 7800);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
      clearTimeout(t5); clearTimeout(t6); clearTimeout(t7); clearTimeout(t8);
    };
  }, [setCursorPos, setIsClicking]);

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full bg-background flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Left Pane: Lecture Content */}
      <div className="w-1/2 h-full border-r border-border p-12 overflow-hidden flex flex-col relative">
        <div className="text-xs font-bold tracking-widest text-muted-foreground mb-4">WEEK 1 — ANALYTIC PHILOSOPHY AS LOGICAL ANALYSIS</div>
        <h1 className="text-3xl font-serif text-primary mb-8">1.1 The logical form of ordinary language</h1>
        
        <div className="flex bg-muted/50 rounded-lg p-1 w-fit mb-10 border border-border">
          <div className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${phase < 1 ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground'}`}>Short</div>
          <div className="px-4 py-1.5 rounded-md text-sm font-medium text-muted-foreground">Medium</div>
          <div className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${phase >= 1 ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground'}`}>Long</div>
        </div>

        <div className="prose prose-sm max-w-none text-foreground/80 space-y-6">
          <h2 className="font-serif text-2xl text-primary">Philosophy delineates structures</h2>
          <p>
            Philosophy delineates the structures of the categories in terms of which we think about the world. We don't ask what exists, we ask what our language commits us to. Take a simple sentence: "Someone smokes." What is its logical form?
          </p>
          <p>
            An ordinary sentence can mask its true logical structure. Logical analysis regiment ordinary language into formal logic to reveal exactly what is being claimed.
          </p>
          
          <AnimatePresence>
            {phase >= 1 && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-6"
              >
                <p>
                  Consider: "Someone smokes but Smith does not". In symbolic logic, we break this into parts using quantifiers and connectives. We let S(x) stand for "x smokes" and s stand for "Smith".
                </p>
                <p>
                  The logical form is: ∃x(Sx) ∧ ¬Ss. This makes it completely transparent: there exists an entity x such that x smokes, AND it is not the case that Smith smokes.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Pane: Tutor / Practice */}
      <div className="w-1/2 h-full bg-white flex flex-col relative">
        <div className="flex border-b border-border px-4 pt-4 bg-background">
          <div className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${phase < 2 || phase >= 4 ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}>Ask the tutor</div>
          <div className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${phase >= 2 && phase < 4 ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}>Practice on this</div>
        </div>

        <div className="flex-1 p-8 relative overflow-hidden">
          <AnimatePresence mode="popLayout">
            {phase < 2 || phase >= 4 ? (
              <motion.div 
                key="tutor"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col justify-end"
              >
                <div className="mb-4 text-xs font-semibold text-muted-foreground uppercase tracking-widest">Starter questions for this section</div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <div className="px-3 py-1.5 rounded-full border border-border text-sm text-primary bg-muted/30">Why regiment language into logic at all?</div>
                  <div className="px-3 py-1.5 rounded-full border border-border text-sm text-primary bg-muted/30">What is a logical form?</div>
                  <div className="px-3 py-1.5 rounded-full border border-border text-sm text-primary bg-muted/30">How does this differ from traditional grammar?</div>
                </div>
                <div className="w-full h-24 border border-border rounded-lg bg-muted/20 p-3 text-muted-foreground text-sm flex items-end shadow-inner">
                  <div className="w-full flex justify-between">
                    <span>Ask a question about logical analysis...</span>
                    <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center cursor-pointer opacity-50">↑</div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="practice"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-full flex flex-col"
              >
                <h3 className="font-serif text-xl text-primary mb-6">Generated Practice Problem</h3>
                
                {phase === 2 ? (
                  <div className="space-y-3">
                    <motion.div className="h-4 bg-muted rounded w-full overflow-hidden relative">
                      <motion.div className="absolute inset-0 bg-white/50 w-1/2" animate={{ x: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 1 }} />
                    </motion.div>
                    <motion.div className="h-4 bg-muted rounded w-5/6 overflow-hidden relative">
                      <motion.div className="absolute inset-0 bg-white/50 w-1/2" animate={{ x: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 1, delay: 0.1 }} />
                    </motion.div>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="p-6 border border-border rounded-xl shadow-sm bg-white"
                  >
                    <p className="text-foreground font-medium mb-6">
                      Translate into symbolic logic: "Someone smokes but Smith does not". Use S(x) for "x smokes" and s for Smith.
                    </p>
                    <div className="w-full h-12 border border-border rounded-md bg-muted/10 mb-4 px-3 flex items-center text-muted-foreground">Type your answer...</div>
                    <div className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium w-fit ml-auto">Submit</div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}