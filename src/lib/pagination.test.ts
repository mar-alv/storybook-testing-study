import { describe, expect, it } from 'vitest';
import { getPaginationRange } from '@/lib/pagination';

describe('getPaginationRange', () => {
  it('returns every page when there are few of them', () => {
    expect(getPaginationRange(2, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('shows an ellipsis only on the right near the start', () => {
    expect(getPaginationRange(1, 20)).toEqual([1, 2, 3, 4, 5, 'ellipsis', 20]);
  });

  it('shows an ellipsis only on the left near the end', () => {
    expect(getPaginationRange(20, 20)).toEqual([1, 'ellipsis', 16, 17, 18, 19, 20]);
  });

  it('shows ellipses on both sides in the middle', () => {
    expect(getPaginationRange(10, 20)).toEqual([1, 'ellipsis', 9, 10, 11, 'ellipsis', 20]);
  });

  it('respects the sibling count', () => {
    expect(getPaginationRange(10, 20, 2)).toEqual([1, 'ellipsis', 8, 9, 10, 11, 12, 'ellipsis', 20]);
  });
});
