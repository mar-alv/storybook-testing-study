import { cn } from '@/lib/cn';
import { formatPokemonName } from '@/lib/pokemon-utils';

export interface PokemonTypeBadgeProps {
  type: string;
}

const typeClasses: Record<string, string> = {
  normal: 'bg-stone-200 text-stone-900',
  fire: 'bg-orange-100 text-orange-900',
  water: 'bg-blue-100 text-blue-900',
  grass: 'bg-green-100 text-green-900',
  electric: 'bg-yellow-100 text-yellow-900',
  ice: 'bg-cyan-100 text-cyan-900',
  fighting: 'bg-red-100 text-red-900',
  poison: 'bg-purple-100 text-purple-900',
  ground: 'bg-amber-100 text-amber-900',
  flying: 'bg-sky-100 text-sky-900',
  psychic: 'bg-pink-100 text-pink-900',
  bug: 'bg-lime-100 text-lime-900',
  rock: 'bg-stone-300 text-stone-900',
  ghost: 'bg-indigo-100 text-indigo-900',
  dragon: 'bg-violet-100 text-violet-900',
  dark: 'bg-slate-300 text-slate-900',
  steel: 'bg-slate-200 text-slate-900',
  fairy: 'bg-fuchsia-100 text-fuchsia-900',
};

export function PokemonTypeBadge({ type }: PokemonTypeBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
        typeClasses[type] ?? 'bg-slate-200 text-slate-900',
      )}
    >
      {formatPokemonName(type)}
    </span>
  );
}
