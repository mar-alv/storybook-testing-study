import { setupServer } from 'msw/node';
import { artworkHandler, defaultPokemonHandlers } from '@/mocks/handlers';

export const server = setupServer(...defaultPokemonHandlers, artworkHandler);
