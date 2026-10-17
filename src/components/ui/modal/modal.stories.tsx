import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { Button } from '@/components/ui/button/button';
import { Modal } from '@/components/ui/modal/modal';

const meta = {
  title: 'UI/Modal',
  component: Modal,
  parameters: { layout: 'fullscreen' },
  args: {
    open: true,
    title: 'Título do modal',
    onClose: fn(),
    children: (
      <div className="space-y-3">
        <p className="text-slate-800">Conteúdo de exemplo dentro do modal.</p>
        <Button>Ação principal</Button>
      </div>
    ),
  },
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dialog = await canvas.findByRole('dialog', { name: 'Título do modal' });
    await waitFor(() => expect(dialog).toHaveFocus());
  },
};

export const Closed: Story = {
  args: { open: false },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryByRole('dialog')).not.toBeInTheDocument();
  },
};

export const ClosesWithEscape: Story = {
  play: async ({ args }) => {
    await userEvent.keyboard('{Escape}');
    await expect(args.onClose).toHaveBeenCalledTimes(1);
  },
};

export const ClosesWithCloseButton: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: 'Fechar' }));
    await expect(args.onClose).toHaveBeenCalledTimes(1);
  },
};

export const TrapsFocus: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const closeButton = await canvas.findByRole('button', { name: 'Fechar' });
    const actionButton = canvas.getByRole('button', { name: 'Ação principal' });

    await userEvent.tab();
    await expect(closeButton).toHaveFocus();

    await userEvent.tab();
    await expect(actionButton).toHaveFocus();

    await userEvent.tab();
    await expect(closeButton).toHaveFocus();

    await userEvent.tab({ shift: true });
    await expect(actionButton).toHaveFocus();
  },
};
