'use client';

import { useState } from 'react';
import { PokemonDetailModal } from '@/components/pokemon/pokemon-detail-modal/pokemon-detail-modal';
import {
  PokemonGrid,
  PokemonGridSkeleton,
} from '@/components/pokemon/pokemon-grid/pokemon-grid';
import { FeedbackMessage } from '@/components/ui/feedback-message/feedback-message';
import { Pagination } from '@/components/ui/pagination/pagination';
import { usePokemonList } from '@/hooks/use-pokemon-list';
import { pokemonPageSize } from '@/lib/pokemon-api';
import { getTotalPages } from '@/lib/pokemon-utils';

export function Pokedex() {
  const [page, setPage] = useState(1);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const { state, retry } = usePokemonList(page);

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl w-full flex-col gap-6 px-4 py-8">
      <header className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="h-8 w-8 rounded-full border-4 border-slate-900 bg-gradient-to-b from-red-600 from-50% to-white to-50%"
        />
        <h1 className="text-2xl font-extrabold text-slate-900">Pokédex</h1>
      </header>

      {state.status === 'loading' && <PokemonGridSkeleton count={pokemonPageSize} />}

      {state.status === 'error' && (
        <FeedbackMessage
          variant="error"
          title="Não foi possível carregar os Pokémon"
          description={state.error.message}
          actionLabel="Tentar novamente"
          onAction={retry}
        />
      )}

      {state.status === 'success' && state.data.results.length === 0 && (
        <FeedbackMessage variant="empty" title="Nenhum Pokémon encontrado" />
      )}

      {state.status === 'success' && state.data.results.length > 0 && (
        <>
          <PokemonGrid items={state.data.results} onSelect={setSelectedName} />
          <Pagination
            currentPage={page}
            totalPages={getTotalPages(state.data.count, pokemonPageSize)}
            onPageChange={setPage}
          />
        </>
      )}

      <PokemonDetailModal name={selectedName} onClose={() => setSelectedName(null)} />
    </main>
  );
}
