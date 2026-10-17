const artworkBaseUrl =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

const statLabels: Record<string, string> = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  'special-attack': 'Atq. Esp.',
  'special-defense': 'Def. Esp.',
  speed: 'Velocidade',
};

export function getPokemonIdFromUrl(url: string): number {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? Number(match[1]) : 0;
}

export function getPokemonArtworkUrl(id: number): string {
  return `${artworkBaseUrl}/${id}.png`;
}

export function formatPokemonName(name: string): string {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function formatPokemonNumber(id: number): string {
  return `#${String(id).padStart(3, '0')}`;
}

export function formatStatName(name: string): string {
  return statLabels[name] ?? formatPokemonName(name);
}

export function formatHeight(decimeters: number): string {
  return `${(decimeters / 10).toFixed(1).replace('.', ',')} m`;
}

export function formatWeight(hectograms: number): string {
  return `${(hectograms / 10).toFixed(1).replace('.', ',')} kg`;
}

export function getTotalPages(count: number, pageSize: number): number {
  return Math.max(1, Math.ceil(count / pageSize));
}
