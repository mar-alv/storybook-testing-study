'use client';

import { useCallback } from 'react';
import { useAsyncResource } from '@/hooks/use-async-resource';
import { fetchPokemonDetail } from '@/lib/pokemon-api';

export function usePokemonDetail(name: string) {
  const load = useCallback(() => fetchPokemonDetail(name), [name]);
  return useAsyncResource(load);
}
