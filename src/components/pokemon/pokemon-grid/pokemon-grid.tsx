import { PokemonCard } from '@/components/pokemon/pokemon-card/pokemon-card';
import { getPokemonIdFromUrl } from '@/lib/pokemon-utils';
import type { PokemonListItem } from '@/types/pokemon';

const gridClasses = 'grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5';

export interface PokemonGridProps {
  items: PokemonListItem[];
  onSelect: (name: string) => void;
}

export interface PokemonGridSkeletonProps {
  count?: number;
}

export function PokemonGrid({ items, onSelect }: PokemonGridProps) {
  return (
    <ul className={gridClasses}>
      {items.map((item) => (
        <li key={item.name}>
          <PokemonCard id={getPokemonIdFromUrl(item.url)} name={item.name} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
}

export function PokemonGridSkeleton({ count = 20 }: PokemonGridSkeletonProps) {
  return (
    <div aria-busy="true">
      <p role="status" className="sr-only">
        Carregando Pokémon…
      </p>
      <ul aria-hidden="true" className={gridClasses}>
        {Array.from({ length: count }, (_, index) => (
          <li key={index} className="h-44 animate-pulse rounded-xl bg-slate-200" />
        ))}
      </ul>
    </div>
  );
}
