import { describe, expect, it } from 'vitest';
import {
  formatHeight,
  formatPokemonName,
  formatPokemonNumber,
  formatStatName,
  formatWeight,
  getPokemonArtworkUrl,
  getPokemonIdFromUrl,
  getTotalPages,
} from '@/lib/pokemon-utils';

describe('pokemon-utils', () => {
  it.each([
    ['https://pokeapi.co/api/v2/pokemon/25/', 25],
    ['https://pokeapi.co/api/v2/pokemon/1', 1],
    ['https://pokeapi.co/api/v2/type/3/', 0],
  ])('extracts the id from %s', (url, expected) => {
    expect(getPokemonIdFromUrl(url)).toBe(expected);
  });

  it('builds the artwork url', () => {
    expect(getPokemonArtworkUrl(6)).toMatch(/official-artwork\/6\.png$/);
  });

  it.each([
    ['pikachu', 'Pikachu'],
    ['mr-mime', 'Mr Mime'],
    ['nidoran-f', 'Nidoran F'],
  ])('formats the name %s', (name, expected) => {
    expect(formatPokemonName(name)).toBe(expected);
  });

  it.each([
    [1, '#001'],
    [25, '#025'],
    [1017, '#1017'],
  ])('formats the number %d', (id, expected) => {
    expect(formatPokemonNumber(id)).toBe(expected);
  });

  it('translates known stats and falls back to the formatted name', () => {
    expect(formatStatName('special-attack')).toBe('Atq. Esp.');
    expect(formatStatName('unknown-stat')).toBe('Unknown Stat');
  });

  it('formats height and weight with a decimal comma', () => {
    expect(formatHeight(7)).toBe('0,7 m');
    expect(formatWeight(60)).toBe('6,0 kg');
  });

  it('calculates the total pages', () => {
    expect(getTotalPages(40, 20)).toBe(2);
    expect(getTotalPages(41, 20)).toBe(3);
    expect(getTotalPages(0, 20)).toBe(1);
  });
});
