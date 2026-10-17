import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { FeedbackMessage } from '@/components/ui/feedback-message/feedback-message';

const meta = {
  title: 'UI/FeedbackMessage',
  component: FeedbackMessage,
  args: {
    variant: 'error',
    title: 'Algo deu errado',
    description: 'Falha ao carregar dados (500)',
    actionLabel: 'Tentar novamente',
    onAction: fn(),
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['error', 'empty'] },
  },
} satisfies Meta<typeof FeedbackMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ErrorState: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('alert')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Tentar novamente' }));
    await expect(args.onAction).toHaveBeenCalledTimes(1);
  },
};

export const EmptyState: Story = {
  args: {
    variant: 'empty',
    title: 'Nenhum Pokémon encontrado',
    description: undefined,
    actionLabel: undefined,
    onAction: undefined,
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('status')).toBeInTheDocument();
  },
};
