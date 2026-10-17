'use client';

import { useCallback, useEffect, useState } from 'react';

export type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; data: T };

export interface AsyncResource<T> {
  state: AsyncState<T>;
  retry: () => void;
}

export function useAsyncResource<T>(load: () => Promise<T>): AsyncResource<T> {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });

    load()
      .then((data) => {
        if (!cancelled) {
          setState({ status: 'success', data });
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            status: 'error',
            error: error instanceof Error ? error : new Error('Erro desconhecido'),
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [load, attempt]);

  const retry = useCallback(() => setAttempt((current) => current + 1), []);

  return { state, retry };
}
