import type { Page } from '@playwright/test';
import {
  createPokemonDetail,
  createPokemonListResponse,
  placeholderSvg,
  pokemonNames,
} from '@/mocks/fixtures';

const corsHeaders = { 'access-control-allow-origin': '*' };

export interface MockPokeApiOptions {
  failListRequests?: number;
}

export async function mockPokeApi(page: Page, options: MockPokeApiOptions = {}) {
  let failuresLeft = options.failListRequests ?? 0;

  await page.route('https://raw.githubusercontent.com/**', (route) =>
    route.fulfill({ status: 200, contentType: 'image/svg+xml', body: placeholderSvg }),
  );

  await page.route('https://pokeapi.co/api/v2/pokemon**', (route) => {
    const url = new URL(route.request().url());
    const name = url.pathname.split('/').filter(Boolean)[3];

    if (name) {
      if (!pokemonNames.includes(name)) {
        return route.fulfill({ status: 404, headers: corsHeaders, json: { detail: 'Not found' } });
      }

      return route.fulfill({ headers: corsHeaders, json: createPokemonDetail(name) });
    }

    if (failuresLeft > 0) {
      failuresLeft -= 1;
      return route.fulfill({ status: 500, headers: corsHeaders, json: { message: 'error' } });
    }

    const limit = Number(url.searchParams.get('limit') ?? 20);
    const offset = Number(url.searchParams.get('offset') ?? 0);

    return route.fulfill({ headers: corsHeaders, json: createPokemonListResponse({ limit, offset }) });
  });
}
