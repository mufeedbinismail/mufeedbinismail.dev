import type { YearMonth } from '../lib/tenure';

interface YearEntry {
  year: number;
  role: string;
  text: string;
  /** Slug of the case study this year's work is written up in. */
  caseStudy?: string;
}

interface Employer {
  company: string;
  title: string;
  from: YearMonth;
  /** Absent while the job is current. */
  to?: YearMonth;
  place: string;
  /** Concrete work, for a job too short for year-by-year entries. */
  responsibilities?: string[];
  /** What this job made possible later on. */
  carriedForward?: string;
  years: YearEntry[];
}

/** Newest first. */
export const employers: Employer[] = [
  {
    company: 'Direct Axis Technology',
    title: 'Senior Developer',
    from: '2020-06',
    place: 'Kannur, India → Dubai, UAE (2021)',
    years: [
      { year: 2026, role: 'Senior developer', text: 'Leave management redesign, code review, critical incidents and financial client demos. Now working on a different product.', caseStudy: 'leave-management' },
      { year: 2025, role: 'Senior developer', text: 'InnoDB forensic recovery; incremental backups with GFS retention.', caseStudy: 'innodb-recovery' },
      { year: 2024, role: 'Senior developer', text: 'Workflow engine, prepaid orders system, higher server density. Handed the scheduling product over to focus on the core product.', caseStudy: 'workflow-engine' },
      { year: 2023, role: 'Senior developer', text: 'Self-hosted WebSockets, invoice performance fix, crash recovery, and the start of the domestic-worker scheduling product.' },
      { year: 2022, role: 'Developer', text: 'Built attendance, payroll and HRM. Added database migrations, the PHP 7.4 upgrade, the first Laravel layer, and centralised permissions.', caseStudy: 'laravel-on-legacy-php' },
      { year: 2021, role: 'Developer · team of 3', text: 'Moved to Direct Axis in Dubai. Introduced proper git discipline and a single core codebase with traceable client forks.', caseStudy: 'client-onboarding' },
      { year: 2020, role: 'Developer · Kannur branch', text: 'Joined Direct Axis at its Kannur, India branch, working on the AxisPro ERP platform.' },
    ],
  },
  {
    company: 'Poornam Info Vision',
    title: 'Server Administrator & Technical Support',
    from: '2019-07',
    to: '2020-03',
    place: 'Kerala, India',
    responsibilities: [
      'Monitored production servers for hosting clients and cleared performance bottlenecks, with Prometheus for metrics.',
      'Kept client mail flowing: blacklist removal, spam filtering and deliverability fixes on Exim and Dovecot.',
      'Managed DNS on BIND so domains and mail resolved correctly.',
      'Provisioned and configured VPS servers to each client’s requirements, with Let’s Encrypt TLS.',
      'Supported cPanel/WHM and Plesk hosting, and the Magento and WordPress sites running on it.',
    ],
    carriedForward: 'The server side of every job since started here. It is why a crashed MariaDB table was a 30-minute fix in 2023, and why I could look after servers, backups and the WebSocket infrastructure alongside development.',
    years: [],
  },
];

export const education = {
  degree: 'BTech, Computer Science',
  school: 'APJ Abdul Kalam Technological University',
  year: 2019,
};
