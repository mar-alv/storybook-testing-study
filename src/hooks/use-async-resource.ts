"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export type AsyncState<T> =
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "success"; data: T };

export interface AsyncResource<T> {
  state: AsyncState<T>;
  retry: () => void;
}

type SettledResult<T> = Exclude<AsyncState<T>, { status: "loading" }>;

interface Settled<T> {
  request: object;
  result: SettledResult<T>;
}

export function useAsyncResource<T>(load: () => Promise<T>): AsyncResource<T> {
  const [settled, setSettled] = useState<Settled<T> | null>(null);
  const [attempt, setAttempt] = useState(0);
  const request = useMemo(() => ({ load, attempt }), [load, attempt]);

  useEffect(() => {
    let cancelled = false;

    load()
      .then((data) => {
        if (!cancelled) {
          setSettled({ request, result: { status: "success", data } });
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setSettled({
            request,
            result: {
              status: "error",
              error:
                error instanceof Error ? error : new Error("Erro desconhecido"),
            },
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [load, request]);

  const retry = useCallback(() => setAttempt((current) => current + 1), []);

  const state: AsyncState<T> =
    settled && settled.request === request
      ? settled.result
      : { status: "loading" };

  return { state, retry };
}
