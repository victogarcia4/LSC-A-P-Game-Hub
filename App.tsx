
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ExamType, Theme } from './types';
import { GAMES_DATA, GENERIC_SONG_URL } from './constants';
import GameCard from './components/GameCard';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState<Theme>('light');
  const [isMuted, setIsMuted] = useState(true);
  const [activeExam, setActiveExam] = useState<ExamType>(ExamType.EXAM_1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Filter logic: Only shows games matching search term and selected exam
  const filteredGames = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return GAMES_DATA.filter(game => {
      const matchesSearch = term === '' || 
        game.title.toLowerCase().includes(term) ||
        game.subjects.some(s => s.toLowerCase().includes(term));
      const matchesExam = game.exam === activeExam;
      return matchesSearch && matchesExam;
    });
  }, [searchTerm, activeExam]);

  // Dark Mode Toggle - Explicitly targeting document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Audio Playback Handling
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(GENERIC_SONG_URL);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
    
    const audio = audioRef.current;
    
    if (isMuted) {
      audio.pause();
    } else {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn("Audio playback failed:", error);
          setIsMuted(true);
        });
      }
    }

    return () => {
      audio.pause();
    };
  }, [isMuted]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleMute = () => setIsMuted(prev => !prev);

  return (
    <div className="min-h-screen bg-[#f0f0f0] selection:bg-neo-yellow selection:text-black font-sans pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b-4 border-black bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-neo-yellow border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-display text-black uppercase leading-none tracking-tight">LSC A&P Game Hub</h1>
              <p className="text-[10px] text-black/60 mt-1 uppercase tracking-[0.2em] font-bold">North Harris Campus</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleMute}
              className={`p-3 border-2 border-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${
                !isMuted 
                ? 'bg-neo-blue text-white' 
                : 'bg-white text-black'
              }`}
              title={isMuted ? "Enable Music" : "Mute Music"}
              aria-label="Toggle Background Music"
            >
              {!isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.983 5.983 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.984 3.984 0 00-1.172-2.828a1 1 0 010-1.415z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Intro */}
        <div className="max-w-4xl mb-16 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-neo-pink -mr-16 -mt-16 rotate-45 border-b-4 border-black" />
          <h2 className="text-5xl sm:text-7xl font-display text-black mb-8 leading-[0.9] uppercase tracking-tighter">
            Anatomy & <br/>Physiology <span className="text-neo-blue">Games</span>
          </h2>
          <p className="text-xl text-black font-medium max-w-2xl leading-relaxed">
            Interactive student-built labs and games designed to master A&P concepts. 
            Select an exam below and explore the topics gathered by Dr. Martinez.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-16 space-y-12">
          {/* Search bar */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text"
              placeholder="SEARCH SUBJECTS..."
              className="block w-full pl-16 pr-6 py-6 border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-[6px] focus:translate-y-[6px] transition-all text-black placeholder-black/30 text-2xl font-bold uppercase outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Exam Filters */}
          <div className="flex flex-wrap gap-4">
            {[ExamType.EXAM_1, ExamType.EXAM_2, ExamType.EXAM_3, ExamType.EXAM_4].map((exam) => (
              <button
                key={exam}
                onClick={() => setActiveExam(exam)}
                className={`px-10 py-4 border-4 border-black text-lg font-display uppercase transition-all transform active:translate-x-[4px] active:translate-y-[4px] active:shadow-none ${
                  activeExam === exam 
                    ? 'bg-neo-blue text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' 
                    : 'bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-neo-yellow'
                }`}
              >
                {exam}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredGames.length > 0 ? (
            filteredGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))
          ) : (
            <div className="col-span-full py-32 text-center bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="mb-8 inline-flex p-8 border-4 border-black bg-neo-red shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-4xl font-display text-black mb-4 uppercase">No match found</h3>
              <p className="text-black font-bold max-w-md mx-auto uppercase text-sm px-4">
                {activeExam !== ExamType.EXAM_1 
                  ? "SYSTEM ERROR: CONTENT UNDER CONSTRUCTION." 
                  : "TRY ANOTHER KEYWORD. DATA NOT FOUND."}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-32 border-t-4 border-black bg-neo-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <div>
              <p className="text-3xl font-display text-black uppercase mb-2">Gathered by Dr. Martinez</p>
              <p className="text-lg font-bold text-black/80">Lone Star College North Harris · A&P Faculty</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-3">
              <div className="px-6 py-2 border-2 border-black bg-white font-mono text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                EMPOWERING LEARNING
              </div>
              <p className="font-mono text-xs font-bold uppercase">© {new Date().getFullYear()} LSC-North Harris. BUILD VERSION 4.0</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
