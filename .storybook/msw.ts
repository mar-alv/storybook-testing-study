import { setupWorker } from "msw/browser";
import type { RequestHandler } from "msw";

type HandlersParameter =
  | RequestHandler[]
  | Record<string, RequestHandler[]>
  | undefined;

const worker = setupWorker();
let started: Promise<unknown> | null = null;

function flattenHandlers(handlers: HandlersParameter): RequestHandler[] {
  if (!handlers) {
    return [];
  }

  return Array.isArray(handlers) ? handlers : Object.values(handlers).flat();
}

export async function mswLoader({
  parameters,
}: {
  parameters: { msw?: { handlers?: HandlersParameter } };
}) {
  started ??= worker.start({ onUnhandledRequest: "bypass", quiet: true });
  await started;

  worker.resetHandlers();
  worker.use(...flattenHandlers(parameters.msw?.handlers));
}
