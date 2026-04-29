
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <a 
      href={game.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group block relative bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 border-2 border-black bg-neo-yellow shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      
      <h3 className="text-2xl font-display text-black mb-3 leading-tight uppercase">{game.title}</h3>
      
      <div className="flex flex-wrap gap-2 mt-4">
        {game.subjects.map((subject, index) => (
          <span 
            key={index} 
            className="text-[10px] font-bold px-2 py-1 border-2 border-black bg-neo-green/20 text-black uppercase tracking-wider"
          >
            {subject}
          </span>
        ))}
      </div>
      
      <div className="mt-8 flex items-center text-sm font-display uppercase text-neo-blue group-hover:text-neo-pink transition-colors">
        Play Module 
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </a>
  );
};

export default GameCard;
