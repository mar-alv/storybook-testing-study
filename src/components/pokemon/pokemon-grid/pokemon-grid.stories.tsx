import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import {
  PokemonGrid,
  PokemonGridSkeleton,
} from '@/components/pokemon/pokemon-grid/pokemon-grid';
import { createPokemonListResponse } from '@/mocks/fixtures';

const meta = {
  title: 'Pokemon/PokemonGrid',
  component: PokemonGrid,
  parameters: { layout: 'padded' },
  args: {
    items: createPokemonListResponse({ limit: 20 }).results,
    onSelect: fn(),
  },
} satisfies Meta<typeof PokemonGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FewItems: Story = {
  args: { items: createPokemonListResponse({ limit: 3 }).results },
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};

export const Tablet: Story = {
  globals: { viewport: { value: 'tablet', isRotated: false } },
};

export const SelectsSecondCard: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /ivysaur/i }));
    await expect(args.onSelect).toHaveBeenCalledWith('ivysaur');
  },
};

export const Loading: Story = {
  render: () => <PokemonGridSkeleton />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('status')).toHaveTextContent('Carregando Pokémon');
  },
};
