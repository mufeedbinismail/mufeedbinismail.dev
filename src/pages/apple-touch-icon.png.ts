import type { APIRoute } from 'astro';
import { touchIcon } from '../lib/og-image';

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await touchIcon(180)), { headers: { 'Content-Type': 'image/png' } });
