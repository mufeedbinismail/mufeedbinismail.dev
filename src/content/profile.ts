import type { YearMonth } from '../lib/tenure';

export const profile = {
  name: 'Mohamed Mufeed',
  /** Job title, as the employer gives it. */
  headline: 'Senior Developer',
  /** What the work is, in one line under the name. */
  title: 'Full-stack developer · business software',
  location: 'Dubai, UAE',
  linkedin: 'https://www.linkedin.com/in/mohamed-mufeed',
  github: 'https://github.com/mufeedbinismail',
  repo: 'https://github.com/mufeedbinismail/mufeedbinismail.dev',
  /** First job: Poornam Info Vision. */
  careerStart: '2019-07' as YearMonth,
  /** Direct Axis, Kannur branch; the Dubai entity followed in 2021. */
  companyStart: '2020-06' as YearMonth,
  dubaiSince: 2021,
  /**
   * CVs linked from the page, served from `public/cv/`. Only files present at build time are linked.
   * The Laravel and Backend & DevOps PDFs stay in `public/cv/` so links already sent out keep working.
   */
  cvs: [{ label: 'CV (PDF)', file: 'mohamed-mufeed-full-stack.pdf' }],
};
