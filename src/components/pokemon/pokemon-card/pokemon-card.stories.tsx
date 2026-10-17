import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { PokemonCard } from '@/components/pokemon/pokemon-card/pokemon-card';

const meta = {
  title: 'Pokemon/PokemonCard',
  component: PokemonCard,
  args: {
    id: 25,
    name: 'pikachu',
    onSelect: fn(),
  },
  argTypes: {
    id: { control: { type: 'number', min: 1, max: 1025 } },
    name: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div className="w-44">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PokemonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleDigitId: Story = {
  args: { id: 1, name: 'bulbasaur' },
};

export const LongName: Story = {
  args: { id: 1017, name: 'ogerpon-wellspring-mask' },
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};

export const Tablet: Story = {
  globals: { viewport: { value: 'tablet', isRotated: false } },
};

export const SelectsOnClick: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /pikachu/i }));
    await expect(args.onSelect).toHaveBeenCalledWith('pikachu');
  },
};

export const SelectsWithKeyboard: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: /pikachu/i })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onSelect).toHaveBeenCalledTimes(1);
  },
};
