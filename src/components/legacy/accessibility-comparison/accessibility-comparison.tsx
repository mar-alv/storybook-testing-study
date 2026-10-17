import { LegacyPokemonCard } from '@/components/legacy/legacy-pokemon-card/legacy-pokemon-card';
import { PokemonCard } from '@/components/pokemon/pokemon-card/pokemon-card';

export interface AccessibilityComparisonProps {
  id: number;
  name: string;
  onSelect: (name: string) => void;
}

export function AccessibilityComparison({ id, name, onSelect }: AccessibilityComparisonProps) {
  return (
    <div className="flex flex-wrap items-start gap-8">
      <section aria-label="Versão antiga" className="flex flex-col items-center gap-2">
        <h2 className="text-sm font-bold text-slate-900">Antigo</h2>
        <LegacyPokemonCard id={id} name={name} onSelect={onSelect} />
      </section>
      <section aria-label="Versão atual" className="flex w-40 flex-col items-center gap-2">
        <h2 className="text-sm font-bold text-slate-900">Atual</h2>
        <PokemonCard id={id} name={name} onSelect={onSelect} />
      </section>
    </div>
  );
}
