import { existsSync } from 'node:fs';
import { profile } from '../content/profile';

export interface PublishedCv {
  label: string;
  href: string;
}

const onDisk = profile.cvs.filter((cv) => existsSync(`public/cv/${cv.file}`));
const missing = profile.cvs.filter((cv) => !onDisk.includes(cv));
if (missing.length) {
  console.warn(`[cv] not in public/cv/, so not linked: ${missing.map((cv) => cv.file).join(', ')}`);
}

/** CVs whose PDF is in `public/cv/`; one that hasn't been dropped in yet is left out rather than linked broken. */
export const publishedCvs: PublishedCv[] = onDisk.map((cv) => ({ label: cv.label, href: `/cv/${cv.file}` }));
