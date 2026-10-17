import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '@/components/ui/button/button';

describe('Button', () => {
  it('renders as a button of type button by default', () => {
    render(<Button>Capturar</Button>);
    expect(screen.getByRole('button', { name: 'Capturar' })).toHaveAttribute('type', 'button');
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Capturar</Button>);

    await userEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Capturar
      </Button>,
    );

    await userEvent.click(screen.getByRole('button'));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('is disabled and busy while loading', () => {
    render(<Button loading>Capturar</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it.each(['primary', 'secondary', 'ghost'] as const)('matches the snapshot for %s', (variant) => {
    const { container } = render(<Button variant={variant}>Capturar</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
