import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { PokemonDetailModal } from '@/components/pokemon/pokemon-detail-modal/pokemon-detail-modal';
import {
  defaultPokemonHandlers,
  pokemonDetailErrorHandler,
  pokemonDetailLoadingHandler,
} from '@/mocks/handlers';

const meta = {
  title: 'Pokemon/PokemonDetailModal',
  component: PokemonDetailModal,
  parameters: {
    layout: 'fullscreen',
    msw: { handlers: { pokemon: defaultPokemonHandlers } },
  },
  args: {
    name: 'pikachu',
    onClose: fn(),
  },
  argTypes: {
    name: { control: 'select', options: ['bulbasaur', 'charizard', 'pikachu', 'jigglypuff'] },
  },
} satisfies Meta<typeof PokemonDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loaded: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dialog = await canvas.findByRole('dialog', { name: 'Pikachu' });
    await expect(await within(dialog).findByText('Electric')).toBeInTheDocument();
  },
};

export const Loading: Story = {
  parameters: { msw: { handlers: { pokemon: [pokemonDetailLoadingHandler] } } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Carregando detalhes…')).toBeInTheDocument();
  },
};

export const ServerError: Story = {
  parameters: { msw: { handlers: { pokemon: [pokemonDetailErrorHandler] } } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByRole('alert')).toHaveTextContent('Falha ao carregar dados (500)');
  },
};

export const NotFound: Story = {
  args: { name: 'missingno' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByRole('alert')).toHaveTextContent('(404)');
  },
};

export const ClosesWithEscape: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await canvas.findByText('Electric');
    await userEvent.keyboard('{Escape}');
    await expect(args.onClose).toHaveBeenCalledTimes(1);
  },
};
