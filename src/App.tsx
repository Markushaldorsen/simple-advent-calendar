import { useState } from 'react';
import confetti from 'canvas-confetti';
import { isBefore, startOfDay } from 'date-fns';
import { Snow } from './components/Snow';
import { Hatch } from './components/Hatch';
import { Modal } from './components/Modal';
import { useAdventState } from './hooks/useAdventState';
import { adventContent, DayContent } from './data/content';
import { Heart } from 'lucide-react';

function App() {
  const { openedDays, markDayOpened, loading } = useAdventState();
  const [selectedContent, setSelectedContent] = useState<DayContent | null>(null);

  // Date Logic
  // For testing: You can override 'today' to simulate different dates
  // const today = new Date(2023, 11, 15); // Dec 15
  const today = new Date();
  const currentYear = today.getFullYear();

  // TESTING MODE: Set this to true to allow opening any hatch regardless of date
  const TESTING_MODE = false;
  
  // Helper to check if a day is locked
  const isDayLocked = (day: number) => {
    if (TESTING_MODE) return false;

    // Create a date object for the specific day of December of the current year
    // Note: Month is 0-indexed in JS Date (0 = Jan, 11 = Dec)
    const hatchDate = new Date(currentYear, 11, day);
    
    // If today is before the hatch date, it's locked
    // We use startOfDay to compare dates without time
    return isBefore(startOfDay(today), startOfDay(hatchDate));
  };

  const handleHatchClick = (content: DayContent) => {
    const locked = isDayLocked(content.day);
    if (locked) {
      // Shake animation is handled in Hatch component via onLockedClick
      // We can add a toast here if we want
      return;
    }

    const isAlreadyOpen = openedDays.includes(content.day);

    if (!isAlreadyOpen) {
      // First time opening
      markDayOpened(content.day);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#00ff00', '#ffffff', '#ffff00']
      });
      // Delay modal slightly for door animation
      setTimeout(() => setSelectedContent(content), 600);
    } else {
      // Re-opening
      setSelectedContent(content);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-red-950 to-slate-900 text-slate-100 font-sans selection:bg-red-500/30 pb-20">
      <Snow />
      
      <header className="relative z-10 pt-12 pb-8 text-center px-4">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Heart className="text-red-500 fill-red-500 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 drop-shadow-sm">
            Our Advent Calendar
          </h1>
          <Heart className="text-red-500 fill-red-500 animate-pulse" />
        </div>
        <p className="text-red-200/80 text-lg font-serif italic">
          24 days of love, surprises, and us.
        </p>
        {TESTING_MODE && (
          <div className="mt-4 inline-block bg-yellow-500/20 border border-yellow-500/50 rounded px-3 py-1 text-yellow-200 text-sm font-mono">
            🚧 TESTING MODE ENABLED: All hatches unlocked
          </div>
        )}
      </header>

      <main className="relative z-10 container mx-auto px-4 max-w-5xl">
        {loading ? (
          <div className="text-center py-20 text-white/50 animate-pulse">
            Loading our memories...
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {adventContent.map((content) => (
              <Hatch
                key={content.day}
                content={content}
                isOpen={openedDays.includes(content.day)}
                isLocked={isDayLocked(content.day)}
                onOpen={() => handleHatchClick(content)}
                onLockedClick={() => {
                  // Optional: Add a toast or sound here
                  console.log("Locked!");
                }}
              />
            ))}
          </div>
        )}
      </main>

      <Modal 
        content={selectedContent} 
        onClose={() => setSelectedContent(null)} 
      />

      <footer className="relative z-10 text-center mt-20 text-white/20 text-sm">
        <p>Made with ❤️ for you.</p>
      </footer>
    </div>
  );
}

export default App;
