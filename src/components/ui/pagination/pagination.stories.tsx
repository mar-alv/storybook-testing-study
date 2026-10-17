import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Pagination } from '@/components/ui/pagination/pagination';

const meta = {
  title: 'UI/Pagination',
  component: Pagination,
  args: {
    currentPage: 1,
    totalPages: 68,
    onPageChange: fn(),
  },
  argTypes: {
    currentPage: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 1 } },
    disabled: { control: 'boolean' },
  },
  render: function Render(args) {
    const [page, setPage] = useState(args.currentPage);

    return (
      <Pagination
        {...args}
        currentPage={page}
        onPageChange={(next) => {
          setPage(next);
          args.onPageChange(next);
        }}
      />
    );
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Anterior' })).toBeDisabled();
    await expect(canvas.getByRole('button', { name: 'Próxima' })).toBeEnabled();
  },
};

export const MiddlePage: Story = {
  args: { currentPage: 34 },
};

export const LastPage: Story = {
  args: { currentPage: 68 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Próxima' })).toBeDisabled();
  },
};

export const FewPages: Story = {
  args: { totalPages: 3 },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};

export const Tablet: Story = {
  globals: { viewport: { value: 'tablet', isRotated: false } },
};

export const GoesToNextPage: Story = {
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);

    await step('clica em próxima', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Próxima' }));
    });

    await step('notifica a nova página', async () => {
      await expect(args.onPageChange).toHaveBeenCalledWith(2);
    });
  },
};

export const JumpsToPage: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Página 5' }));
    await expect(args.onPageChange).toHaveBeenCalledWith(5);
    await expect(canvas.getByRole('button', { name: 'Página 5' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  },
};
