import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { LegacyPokemonCard } from '@/components/legacy/legacy-pokemon-card/legacy-pokemon-card';

const meta = {
  title: 'A11y/LegacyPokemonCard',
  component: LegacyPokemonCard,
  parameters: { a11y: { test: 'todo' } },
  args: { id: 25, name: 'pikachu', onSelect: fn() },
} satisfies Meta<typeof LegacyPokemonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
