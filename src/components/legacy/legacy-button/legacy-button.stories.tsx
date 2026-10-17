import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { LegacyButton } from '@/components/legacy/legacy-button/legacy-button';

const meta = {
  title: 'A11y/LegacyButton',
  component: LegacyButton,
  parameters: { a11y: { test: 'todo' } },
  args: { children: 'Capturar', onClick: fn() },
} satisfies Meta<typeof LegacyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
