import { composeStories } from '@storybook/nextjs-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from '@/components/ui/pagination/pagination';
import * as stories from '@/components/ui/pagination/pagination.stories';

const { FirstPage, LastPage } = composeStories(stories);

describe('Pagination', () => {
  it('marks the current page', () => {
    render(<Pagination currentPage={3} totalPages={10} onPageChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Página 3' })).toHaveAttribute('aria-current', 'page');
  });

  it('requests the previous and next pages', async () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={3} totalPages={10} onPageChange={onPageChange} />);

    await userEvent.click(screen.getByRole('button', { name: 'Anterior' }));
    await userEvent.click(screen.getByRole('button', { name: 'Próxima' }));

    expect(onPageChange).toHaveBeenNthCalledWith(1, 2);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 4);
  });

  it('disables previous on the first page using the story', () => {
    render(<FirstPage />);
    expect(screen.getByRole('button', { name: 'Anterior' })).toBeDisabled();
  });

  it('disables next on the last page using the story', () => {
    render(<LastPage />);
    expect(screen.getByRole('button', { name: 'Próxima' })).toBeDisabled();
  });
});
