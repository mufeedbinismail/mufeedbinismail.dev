import { getCollection, type CollectionEntry } from 'astro:content';

/** Everything a case study view needs, as plain data that can cross into a React island. */
export type CaseStudy = CollectionEntry<'cases'>['data'] & { slug: string };

/** Case studies in their display order. */
export async function caseStudiesInOrder(): Promise<CaseStudy[]> {
  const entries = await getCollection('cases');
  return entries
    .map((entry) => ({ ...entry.data, slug: entry.id }))
    .sort((a, b) => a.order - b.order);
}
