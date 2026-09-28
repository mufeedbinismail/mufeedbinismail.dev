import type { YearMonth } from '../lib/tenure';

export const profile = {
  name: 'Mohamed Mufeed',
  headline: 'Senior Developer',
  location: 'Dubai, UAE',
  linkedin: 'https://www.linkedin.com/in/mohamed-mufeed',
  github: 'https://github.com/mufeedbinismail',
  repo: 'https://github.com/mufeedbinismail/mufeedbinismail.dev',
  /** First job: Poornam Info Vision. */
  careerStart: '2019-07' as YearMonth,
  /** Direct Axis, Kannur branch; the Dubai entity followed in 2021. */
  companyStart: '2020-06' as YearMonth,
  dubaiSince: 2021,
  /** Tailored CVs, served from `public/cv/`. Only files present at build time are linked. */
  cvs: [
    { label: 'Full-Stack', file: 'mohamed-mufeed-full-stack.pdf' },
    { label: 'Laravel', file: 'mohamed-mufeed-laravel.pdf' },
    { label: 'Backend & DevOps', file: 'mohamed-mufeed-backend-devops.pdf' },
  ],
};
