import Image from 'next/image';
import {
  formatPokemonName,
  formatPokemonNumber,
  getPokemonArtworkUrl,
} from '@/lib/pokemon-utils';

export interface PokemonCardProps {
  id: number;
  name: string;
  onSelect: (name: string) => void;
}

export function PokemonCard({ id, name, onSelect }: PokemonCardProps) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => onSelect(name)}
      className="cursor-pointer flex w-full flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-red-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
    >
      <Image
        src={getPokemonArtworkUrl(id)}
        alt=""
        width={120}
        height={120}
        unoptimized
        className="h-24 w-24 object-contain sm:h-28 sm:w-28"
      />
      <span className="text-xs font-medium text-slate-600">{formatPokemonNumber(id)}</span>
      <span className="text-sm font-semibold text-slate-900">{formatPokemonName(name)}</span>
    </button>
  );
}
