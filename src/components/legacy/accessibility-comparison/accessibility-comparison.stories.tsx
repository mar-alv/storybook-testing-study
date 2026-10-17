import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { AccessibilityComparison } from '@/components/legacy/accessibility-comparison/accessibility-comparison';

const meta = {
  title: 'A11y/Comparison',
  component: AccessibilityComparison,
  parameters: { a11y: { test: 'todo' } },
  args: { id: 25, name: 'pikachu', onSelect: fn() },
} satisfies Meta<typeof AccessibilityComparison>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SideBySide: Story = {};

export const OnlyTheNewCardIsKeyboardReachable: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getAllByRole('button')).toHaveLength(1);

    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: /pikachu/i })).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    await expect(args.onSelect).toHaveBeenCalledWith('pikachu');
  },
};
