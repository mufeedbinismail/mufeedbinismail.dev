import type { APIRoute, GetStaticPaths } from 'astro';
import { profile } from '../../content/profile';
import { caseStudiesInOrder } from '../../lib/cases';
import { ogImageFor } from '../../lib/og-image';

/** One preview image for the home page (`/og/home.png`) and one per write-up. */
export const getStaticPaths = (async () => {
  const studies = await caseStudiesInOrder();
  return [
    {
      params: { slug: 'home' },
      props: { eyebrow: `${profile.headline} · ${profile.location}`, title: profile.title.replace(' · ', ', ') },
    },
    ...studies.map((study) => ({
      params: { slug: study.slug },
      props: { eyebrow: `${study.area} · ${study.year}`, title: study.title },
    })),
  ];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) =>
  new Response(new Uint8Array(await ogImageFor(props as Parameters<typeof ogImageFor>[0])), {
    headers: { 'Content-Type': 'image/png' },
  });
