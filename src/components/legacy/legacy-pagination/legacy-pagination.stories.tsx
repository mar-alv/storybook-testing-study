import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { LegacyPagination } from '@/components/legacy/legacy-pagination/legacy-pagination';

const meta = {
  title: 'A11y/LegacyPagination',
  component: LegacyPagination,
  parameters: { a11y: { test: 'todo' } },
  args: { currentPage: 1, totalPages: 5, onPageChange: fn() },
} satisfies Meta<typeof LegacyPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
