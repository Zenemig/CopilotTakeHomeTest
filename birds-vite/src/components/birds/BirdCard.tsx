import type { Bird } from '../../types';
import { WatermarkedImage } from '../common/WatermarkedImage';

interface BirdCardProps {
  bird: Bird;
  tabIndex: number;
  onBirdClick: (birdId: string) => void;
}

const cardClasses = [
  'w-42 flex flex-col gap-3 pb-3',
  'cursor-pointer group',
  'rounded-xl',
  'transition-all duration-300 ease-out',
  'hover:scale-[1.02] hover:-translate-y-1',
  'focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-border/20 focus-within:ring-offset-2'
].join(' ');

export const BirdCard = ({ bird, tabIndex, onBirdClick }: BirdCardProps) => {
  return (
    <li 
      key={bird.id} 
      onClick={() => onBirdClick(bird.id)} 
      className={cardClasses}
      tabIndex={tabIndex}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onBirdClick(bird.id);
        }
      }}
    >
      <div className="relative overflow-hidden rounded-lg transition-all duration-300 ease-out group-hover:shadow-lg group-hover:shadow-black/10">
        <WatermarkedImage 
          src={bird.thumb_url} 
          alt={bird.english_name} 
          className="w-full h-24 object-cover rounded-lg transition-all duration-300 ease-out group-hover:brightness-110 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out rounded-lg" />
      </div>
      <div className="flex flex-col transition-all duration-300 ease-out group-hover:translate-y-[-2px]">
        <h2 className="font-medium text-text-primary transition-colors duration-300 group-hover:text-primary-bg">{bird.english_name}</h2>
        <p className="text-xs font-normal text-text-secondary transition-colors duration-300 group-hover:text-text-primary">{bird.latin_name}</p>
      </div>
    </li>
  )
};