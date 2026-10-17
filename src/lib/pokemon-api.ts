import type { PokemonDetail, PokemonListResponse } from '@/types/pokemon';

export const pokeApiBaseUrl = 'https://pokeapi.co/api/v2';
export const pokemonPageSize = 20;

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${pokeApiBaseUrl}${path}`);

  if (!response.ok) {
    throw new Error(`Falha ao carregar dados (${response.status})`);
  }

  return response.json() as Promise<T>;
}

export function fetchPokemonList(page: number): Promise<PokemonListResponse> {
  const offset = (page - 1) * pokemonPageSize;
  return request<PokemonListResponse>(`/pokemon?limit=${pokemonPageSize}&offset=${offset}`);
}

export function fetchPokemonDetail(name: string): Promise<PokemonDetail> {
  return request<PokemonDetail>(`/pokemon/${encodeURIComponent(name)}`);
}
