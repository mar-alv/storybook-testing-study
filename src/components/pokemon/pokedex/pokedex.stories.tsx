import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Pokedex } from '@/components/pokemon/pokedex/pokedex';
import {
  createFlakyListHandler,
  defaultPokemonHandlers,
  pokemonDetailHandler,
  pokemonListEmptyHandler,
  pokemonListErrorHandler,
  pokemonListLoadingHandler,
} from '@/mocks/handlers';

const flakyList = createFlakyListHandler(1);

const meta = {
  title: 'Pokemon/Pokedex',
  component: Pokedex,
  parameters: {
    layout: 'fullscreen',
    msw: { handlers: { pokemon: defaultPokemonHandlers } },
  },
} satisfies Meta<typeof Pokedex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByRole('button', { name: /bulbasaur/i })).toBeInTheDocument();
    await expect(canvas.getAllByRole('listitem').length).toBeGreaterThanOrEqual(20);
  },
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};

export const Tablet: Story = {
  globals: { viewport: { value: 'tablet', isRotated: false } },
};

export const Loading: Story = {
  parameters: { msw: { handlers: { pokemon: [pokemonListLoadingHandler] } } },
  play: async ({ canvasElement }) => {
    await expect(await within(canvasElement).findByText('Carregando Pokémon…')).toBeInTheDocument();
  },
};

export const ApiError: Story = {
  parameters: { msw: { handlers: { pokemon: [pokemonListErrorHandler] } } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByRole('alert')).toHaveTextContent('Falha ao carregar dados (500)');
  },
};

export const Empty: Story = {
  parameters: { msw: { handlers: { pokemon: [pokemonListEmptyHandler] } } },
  play: async ({ canvasElement }) => {
    await expect(await within(canvasElement).findByText('Nenhum Pokémon encontrado')).toBeInTheDocument();
  },
};

export const RecoversAfterRetry: Story = {
  beforeEach: () => {
    flakyList.reset();
  },
  parameters: { msw: { handlers: { pokemon: [flakyList.handler, pokemonDetailHandler] } } },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('exibe o erro na primeira tentativa', async () => {
      await expect(await canvas.findByRole('alert')).toHaveTextContent('(503)');
    });

    await step('tenta novamente e lista os Pokémon', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Tentar novamente' }));
      await expect(await canvas.findByRole('button', { name: /bulbasaur/i })).toBeInTheDocument();
    });
  },
};

export const PaginatesToSecondPage: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('aguarda a primeira página', async () => {
      await expect(await canvas.findByRole('button', { name: /bulbasaur/i })).toBeInTheDocument();
    });

    await step('navega para a próxima página', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Próxima' }));
      await expect(await canvas.findByRole('button', { name: /spearow/i })).toBeInTheDocument();
      await expect(canvas.queryByRole('button', { name: /bulbasaur/i })).not.toBeInTheDocument();
    });

    await step('volta para a primeira página', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Anterior' }));
      await expect(await canvas.findByRole('button', { name: /bulbasaur/i })).toBeInTheDocument();
    });
  },
};

export const OpensPokemonDetails: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('clica no card', async () => {
      await userEvent.click(await canvas.findByRole('button', { name: /charizard/i }));
    });

    await step('exibe os detalhes em um diálogo', async () => {
      const dialog = await canvas.findByRole('dialog', { name: 'Charizard' });
      await expect(await within(dialog).findByText('Fire')).toBeInTheDocument();
      await expect(within(dialog).getByText('Flying')).toBeInTheDocument();
    });

    await step('fecha com Escape e devolve o foco ao card', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(canvas.queryByRole('dialog')).not.toBeInTheDocument());
      await expect(canvas.getByRole('button', { name: /charizard/i })).toHaveFocus();
    });
  },
};
