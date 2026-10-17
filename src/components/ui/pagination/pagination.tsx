import { Button } from '@/components/ui/button/button';
import { getPaginationRange } from '@/lib/pagination';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}: PaginationProps) {
  const items = getPaginationRange(currentPage, totalPages);

  return (
    <nav aria-label="Paginação" className="flex items-center justify-between gap-2 sm:justify-center">
      <Button
        variant="secondary"
        size="sm"
        disabled={disabled || currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Anterior
      </Button>

      <p className="text-sm font-medium text-slate-700 sm:hidden">
        Página {currentPage} de {totalPages}
      </p>

      <ul className="hidden items-center gap-1 sm:flex">
        {items.map((item, index) =>
          item === 'ellipsis' ? (
            <li key={`ellipsis-${index}`} aria-hidden="true" className="px-2 text-slate-600">
              …
            </li>
          ) : (
            <li key={item}>
              <Button
                variant={item === currentPage ? 'primary' : 'ghost'}
                size="sm"
                className="min-w-8"
                aria-label={`Página ${item}`}
                aria-current={item === currentPage ? 'page' : undefined}
                disabled={disabled}
                onClick={() => onPageChange(item)}
              >
                {item}
              </Button>
            </li>
          ),
        )}
      </ul>

      <Button
        variant="secondary"
        size="sm"
        disabled={disabled || currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Próxima
      </Button>
    </nav>
  );
}
