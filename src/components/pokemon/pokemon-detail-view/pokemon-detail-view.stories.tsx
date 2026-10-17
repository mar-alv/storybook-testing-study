import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { PokemonDetailView } from '@/components/pokemon/pokemon-detail-view/pokemon-detail-view';
import { createPokemonDetail } from '@/mocks/fixtures';

const meta = {
  title: 'Pokemon/PokemonDetailView',
  component: PokemonDetailView,
  parameters: { layout: 'padded' },
  args: {
    pokemon: createPokemonDetail('bulbasaur'),
  },
} satisfies Meta<typeof PokemonDetailView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const types = within(canvas.getByRole('list', { name: 'Tipos' }));
    await expect(types.getByText('Grass')).toBeInTheDocument();
    await expect(types.getByText('Poison')).toBeInTheDocument();
    await expect(canvas.getAllByRole('progressbar')).toHaveLength(6);
  },
};

export const SingleType: Story = {
  args: { pokemon: createPokemonDetail('pikachu') },
};

export const MaxedStats: Story = {
  args: {
    pokemon: createPokemonDetail('charizard', {
      stats: [
        { base_stat: 255, stat: { name: 'hp' } },
        { base_stat: 255, stat: { name: 'attack' } },
        { base_stat: 1, stat: { name: 'defense' } },
        { base_stat: 120, stat: { name: 'special-attack' } },
        { base_stat: 90, stat: { name: 'special-defense' } },
        { base_stat: 60, stat: { name: 'speed' } },
      ],
    }),
  },
};

export const LongNames: Story = {
  args: {
    pokemon: createPokemonDetail('venusaur', {
      name: 'ogerpon-wellspring-mask',
      abilities: [
        { ability: { name: 'water-absorb-and-something-very-long' }, is_hidden: false },
        { ability: { name: 'sap-sipper' }, is_hidden: true },
      ],
    }),
  },
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
