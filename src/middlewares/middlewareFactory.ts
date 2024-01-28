import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse,
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

export type MiddlewareFactory = (
  middleware: CustomMiddleware,
) => CustomMiddleware;

export function chain(
  middlewares: MiddlewareFactory[],
  index = 0,
): CustomMiddleware {
  const current = middlewares[index];

  if (current) {
    return current(chain(middlewares, index + 1));
  }
  return (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    return response;
  };
}
