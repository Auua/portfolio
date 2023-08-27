import { NextResponse } from 'next/server';

const formUrl = process.env.DISCORD_WEBHOOK || '';

export async function POST(request: Request) {
  const data = await request.json();

  const response = await fetch(formUrl, {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    // eslint-disable-next-line no-console TODO: add logging
  }).catch((error) => console.error(error));

  return NextResponse.json(response);
}
