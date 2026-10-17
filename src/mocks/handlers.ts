import { delay, http, HttpResponse } from 'msw';
import {
  createPokemonDetail,
  createPokemonListResponse,
  mockApiBaseUrl,
  placeholderSvg,
  pokemonNames,
} from '@/mocks/fixtures';

const listUrl = `${mockApiBaseUrl}/pokemon`;
const detailUrl = `${mockApiBaseUrl}/pokemon/:name`;

export const artworkHandler = http.get('https://raw.githubusercontent.com/PokeAPI/sprites/*', () =>
  HttpResponse.text(placeholderSvg, { headers: { 'Content-Type': 'image/svg+xml' } }),
);

export const pokemonListHandler = http.get(listUrl, ({ request }) => {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get('limit') ?? 20);
  const offset = Number(url.searchParams.get('offset') ?? 0);
  return HttpResponse.json(createPokemonListResponse({ limit, offset }));
});

export const pokemonDetailHandler = http.get(detailUrl, ({ params }) => {
  const name = String(params.name);

  if (!pokemonNames.includes(name)) {
    return HttpResponse.json({ detail: 'Not found' }, { status: 404 });
  }

  return HttpResponse.json(createPokemonDetail(name));
});

export const defaultPokemonHandlers = [pokemonListHandler, pokemonDetailHandler];

export const pokemonListErrorHandler = http.get(listUrl, () =>
  HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 }),
);

export const pokemonListLoadingHandler = http.get(listUrl, async () => {
  await delay('infinite');
  return HttpResponse.json({});
});

export const pokemonListEmptyHandler = http.get(listUrl, () =>
  HttpResponse.json({ count: 0, next: null, previous: null, results: [] }),
);

export const pokemonDetailErrorHandler = http.get(detailUrl, () =>
  HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 }),
);

export const pokemonDetailLoadingHandler = http.get(detailUrl, async () => {
  await delay('infinite');
  return HttpResponse.json({});
});

export function createFlakyListHandler(failures: number) {
  let attempts = 0;

  return {
    handler: http.get(listUrl, ({ request }) => {
      attempts += 1;

      if (attempts <= failures) {
        return HttpResponse.json({ message: 'Service Unavailable' }, { status: 503 });
      }

      const url = new URL(request.url);
      const limit = Number(url.searchParams.get('limit') ?? 20);
      const offset = Number(url.searchParams.get('offset') ?? 0);
      return HttpResponse.json(createPokemonListResponse({ limit, offset }));
    }),
    reset: () => {
      attempts = 0;
    },
  };
}
