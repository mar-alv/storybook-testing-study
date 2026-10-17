import {
  formatPokemonName,
  formatPokemonNumber,
  getPokemonArtworkUrl,
} from '@/lib/pokemon-utils';

export interface LegacyPokemonCardProps {
  id: number;
  name: string;
  onSelect: (name: string) => void;
}

export function LegacyPokemonCard({ id, name, onSelect }: LegacyPokemonCardProps) {
  return (
    <div
      onClick={() => onSelect(name)}
      className="w-40 cursor-pointer rounded border border-gray-200 p-3 text-center"
    >
      <img src={getPokemonArtworkUrl(id)} width={96} height={96} className="mx-auto" />
      <p className="text-xs text-gray-400">{formatPokemonNumber(id)}</p>
      <p className="text-sm text-gray-400">{formatPokemonName(name)}</p>
    </div>
  );
}
