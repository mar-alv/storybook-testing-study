import type { PokemonDetail, PokemonListResponse } from '@/types/pokemon';

export const mockApiBaseUrl = 'https://pokeapi.co/api/v2';

export const pokemonNames = [
  'bulbasaur',
  'ivysaur',
  'venusaur',
  'charmander',
  'charmeleon',
  'charizard',
  'squirtle',
  'wartortle',
  'blastoise',
  'caterpie',
  'metapod',
  'butterfree',
  'weedle',
  'kakuna',
  'beedrill',
  'pidgey',
  'pidgeotto',
  'pidgeot',
  'rattata',
  'raticate',
  'spearow',
  'fearow',
  'ekans',
  'arbok',
  'pikachu',
  'raichu',
  'sandshrew',
  'sandslash',
  'nidoran-f',
  'nidorina',
  'nidoqueen',
  'nidoran-m',
  'nidorino',
  'nidoking',
  'clefairy',
  'clefable',
  'vulpix',
  'ninetales',
  'jigglypuff',
  'wigglytuff',
];

const typeCycle = ['grass', 'fire', 'water', 'bug', 'normal', 'electric', 'ground', 'poison'];

const knownTypes: Record<string, string[]> = {
  bulbasaur: ['grass', 'poison'],
  ivysaur: ['grass', 'poison'],
  venusaur: ['grass', 'poison'],
  charmander: ['fire'],
  charmeleon: ['fire'],
  charizard: ['fire', 'flying'],
  squirtle: ['water'],
  wartortle: ['water'],
  blastoise: ['water'],
  butterfree: ['bug', 'flying'],
  pikachu: ['electric'],
  raichu: ['electric'],
};

const statNames = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

export const placeholderSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">' +
  '<circle cx="60" cy="60" r="52" fill="#f1f5f9" stroke="#334155" stroke-width="6"/>' +
  '<path d="M8 60a52 52 0 0 1 104 0z" fill="#dc2626" stroke="#334155" stroke-width="6"/>' +
  '<circle cx="60" cy="60" r="14" fill="#ffffff" stroke="#334155" stroke-width="6"/>' +
  '</svg>';

interface ListOptions {
  offset?: number;
  limit?: number;
}

export function createPokemonListResponse({
  offset = 0,
  limit = 20,
}: ListOptions = {}): PokemonListResponse {
  const count = pokemonNames.length;
  const results = pokemonNames.slice(offset, offset + limit).map((name, index) => ({
    name,
    url: `${mockApiBaseUrl}/pokemon/${offset + index + 1}/`,
  }));

  return {
    count,
    next: offset + limit < count ? `${mockApiBaseUrl}/pokemon?offset=${offset + limit}&limit=${limit}` : null,
    previous: offset > 0 ? `${mockApiBaseUrl}/pokemon?offset=${Math.max(offset - limit, 0)}&limit=${limit}` : null,
    results,
  };
}

export function createPokemonDetail(
  name: string,
  overrides: Partial<PokemonDetail> = {},
): PokemonDetail {
  const index = Math.max(pokemonNames.indexOf(name), 0);
  const id = index + 1;
  const types = knownTypes[name] ?? [typeCycle[index % typeCycle.length]];

  return {
    id,
    name,
    height: 3 + ((id * 3) % 20),
    weight: 40 + ((id * 17) % 900),
    types: types.map((type, slot) => ({ slot: slot + 1, type: { name: type } })),
    stats: statNames.map((stat, position) => ({
      base_stat: 30 + ((id * (position + 3) * 7) % 100),
      stat: { name: stat },
    })),
    abilities: [
      { ability: { name: 'overgrow' }, is_hidden: false },
      { ability: { name: 'chlorophyll' }, is_hidden: true },
    ],
    ...overrides,
  };
}
