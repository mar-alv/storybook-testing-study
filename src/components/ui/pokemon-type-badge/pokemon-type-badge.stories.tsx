import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PokemonTypeBadge } from '@/components/ui/pokemon-type-badge/pokemon-type-badge';

const meta = {
  title: 'UI/PokemonTypeBadge',
  component: PokemonTypeBadge,
  args: { type: 'fire' },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'normal',
        'fire',
        'water',
        'grass',
        'electric',
        'ice',
        'fighting',
        'poison',
        'ground',
        'flying',
        'psychic',
        'bug',
        'rock',
        'ghost',
        'dragon',
        'dark',
        'steel',
        'fairy',
      ],
    },
  },
} satisfies Meta<typeof PokemonTypeBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fire: Story = {};

export const Water: Story = {
  args: { type: 'water' },
};

export const UnknownType: Story = {
  args: { type: 'shadow' },
};

export const AllTypes: Story = {
  render: () => (
    <ul className="flex max-w-md flex-wrap gap-2">
      {[
        'normal',
        'fire',
        'water',
        'grass',
        'electric',
        'ice',
        'fighting',
        'poison',
        'ground',
        'flying',
        'psychic',
        'bug',
        'rock',
        'ghost',
        'dragon',
        'dark',
        'steel',
        'fairy',
      ].map((type) => (
        <li key={type}>
          <PokemonTypeBadge type={type} />
        </li>
      ))}
    </ul>
  ),
};
