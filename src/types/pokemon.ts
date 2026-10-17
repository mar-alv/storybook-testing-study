export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonTypeEntry {
  slot: number;
  type: { name: string };
}

export interface PokemonStatEntry {
  base_stat: number;
  stat: { name: string };
}

export interface PokemonAbilityEntry {
  is_hidden: boolean;
  ability: { name: string };
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonTypeEntry[];
  stats: PokemonStatEntry[];
  abilities: PokemonAbilityEntry[];
}
