import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Pokedex } from '@/components/pokemon/pokedex/pokedex';
import { pokemonListErrorHandler } from '@/mocks/handlers';
import { server } from '@/mocks/server';

describe('Pokedex', () => {
  it('lists the first page and paginates', async () => {
    render(<Pokedex />);

    expect(await screen.findByRole('button', { name: /bulbasaur/i })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Próxima' }));

    expect(await screen.findByRole('button', { name: /spearow/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /bulbasaur/i })).not.toBeInTheDocument();
  });

  it('shows an error and recovers after retrying', async () => {
    server.use(pokemonListErrorHandler);
    render(<Pokedex />);

    expect(await screen.findByRole('alert')).toHaveTextContent('(500)');

    server.resetHandlers();
    await userEvent.click(screen.getByRole('button', { name: 'Tentar novamente' }));

    expect(await screen.findByRole('button', { name: /bulbasaur/i })).toBeInTheDocument();
  });

  it('opens the details dialog and closes it with Escape', async () => {
    render(<Pokedex />);

    await userEvent.click(await screen.findByRole('button', { name: /charizard/i }));

    const dialog = await screen.findByRole('dialog', { name: 'Charizard' });
    expect(await within(dialog).findByText('Fire')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
