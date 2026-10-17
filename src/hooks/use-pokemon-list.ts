'use client';

import { useCallback } from 'react';
import { useAsyncResource } from '@/hooks/use-async-resource';
import { fetchPokemonList } from '@/lib/pokemon-api';

export function usePokemonList(page: number) {
  const load = useCallback(() => fetchPokemonList(page), [page]);
  return useAsyncResource(load);
}
