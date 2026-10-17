export type PaginationItem = number | 'ellipsis';

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export function getPaginationRange(
  currentPage: number,
  totalPages: number,
  siblings = 1,
): PaginationItem[] {
  const maxVisible = siblings * 2 + 5;

  if (totalPages <= maxVisible) {
    return range(1, totalPages);
  }

  const left = Math.max(currentPage - siblings, 1);
  const right = Math.min(currentPage + siblings, totalPages);
  const showLeftEllipsis = left > 2;
  const showRightEllipsis = right < totalPages - 1;
  const edgeCount = 3 + siblings * 2;

  if (!showLeftEllipsis && showRightEllipsis) {
    return [...range(1, edgeCount), 'ellipsis', totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    return [1, 'ellipsis', ...range(totalPages - edgeCount + 1, totalPages)];
  }

  return [1, 'ellipsis', ...range(left, right), 'ellipsis', totalPages];
}
