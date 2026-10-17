import Image from 'next/image';
import { PokemonTypeBadge } from '@/components/ui/pokemon-type-badge/pokemon-type-badge';
import {
  formatHeight,
  formatPokemonName,
  formatPokemonNumber,
  formatStatName,
  formatWeight,
  getPokemonArtworkUrl,
} from '@/lib/pokemon-utils';
import type { PokemonDetail } from '@/types/pokemon';

const maxBaseStat = 255;

export interface PokemonDetailViewProps {
  pokemon: PokemonDetail;
}

export function PokemonDetailView({ pokemon }: PokemonDetailViewProps) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      <div className="flex flex-col items-center gap-3 sm:w-48">
        <Image
          src={getPokemonArtworkUrl(pokemon.id)}
          alt={`Arte oficial de ${formatPokemonName(pokemon.name)}`}
          width={192}
          height={192}
          unoptimized
          className="h-40 w-40 object-contain sm:h-48 sm:w-48"
        />
        <p className="text-sm font-medium text-slate-600">{formatPokemonNumber(pokemon.id)}</p>
        <ul aria-label="Tipos" className="flex flex-wrap justify-center gap-2">
          {pokemon.types.map((entry) => (
            <li key={entry.type.name}>
              <PokemonTypeBadge type={entry.type.name} />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 space-y-5">
        <dl className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-slate-50 p-3">
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-600">Altura</dt>
            <dd className="text-base font-semibold text-slate-900">{formatHeight(pokemon.height)}</dd>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-600">Peso</dt>
            <dd className="text-base font-semibold text-slate-900">{formatWeight(pokemon.weight)}</dd>
          </div>
        </dl>

        <section>
          <h3 className="mb-2 text-sm font-bold text-slate-900">Habilidades</h3>
          <ul className="flex flex-wrap gap-2">
            {pokemon.abilities.map((entry) => (
              <li
                key={entry.ability.name}
                className="rounded-md border border-slate-300 px-2 py-1 text-sm text-slate-800"
              >
                {formatPokemonName(entry.ability.name)}
                {entry.is_hidden && ' (oculta)'}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="mb-2 text-sm font-bold text-slate-900">Estatísticas</h3>
          <ul className="space-y-2">
            {pokemon.stats.map((entry) => {
              const label = formatStatName(entry.stat.name);
              const percentage = Math.min(100, (entry.base_stat / maxBaseStat) * 100);

              return (
                <li key={entry.stat.name}>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-700">{label}</span>
                    <span className="font-semibold text-slate-900">{entry.base_stat}</span>
                  </div>
                  <div
                    role="progressbar"
                    aria-label={label}
                    aria-valuemin={0}
                    aria-valuemax={maxBaseStat}
                    aria-valuenow={entry.base_stat}
                    className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200"
                  >
                    <div
                      className="h-full rounded-full bg-red-600"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
