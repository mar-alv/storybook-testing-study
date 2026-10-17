export interface LegacyPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function LegacyPagination({ currentPage, totalPages, onPageChange }: LegacyPaginationProps) {
  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, index) => index + 1);

  return (
    <div className="flex items-center gap-3 text-gray-400">
      <a
        href="#"
        onClick={(event) => {
          event.preventDefault();
          onPageChange(currentPage - 1);
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </a>
      {pages.map((page) => (
        <span
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? 'cursor-pointer font-bold text-red-300' : 'cursor-pointer text-gray-300'}
        >
          {page}
        </span>
      ))}
      <a
        href="#"
        onClick={(event) => {
          event.preventDefault();
          onPageChange(currentPage + 1);
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </a>
    </div>
  );
}
