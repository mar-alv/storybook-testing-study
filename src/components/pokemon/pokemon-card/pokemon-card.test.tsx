import { composeStories } from '@storybook/nextjs-vite';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@/components/pokemon/pokemon-card/pokemon-card.stories';

const { Default, SingleDigitId, LongName, SelectsOnClick, SelectsWithKeyboard } =
  composeStories(stories);

describe('PokemonCard', () => {
  it('shows the number and the formatted name', () => {
    render(<Default />);
    expect(screen.getByRole('button', { name: '#025 Pikachu' })).toBeInTheDocument();
  });

  it('pads single digit ids', () => {
    render(<SingleDigitId />);
    expect(screen.getByText('#001')).toBeInTheDocument();
  });

  it('reuses the click interaction story', async () => {
    await SelectsOnClick.run();
  });

  it('reuses the keyboard interaction story', async () => {
    await SelectsWithKeyboard.run();
  });

  it.each([
    ['Default', Default],
    ['SingleDigitId', SingleDigitId],
    ['LongName', LongName],
  ])('matches the snapshot for %s', (_, Story) => {
    const { container } = render(<Story />);
    expect(container).toMatchSnapshot();
  });
});
