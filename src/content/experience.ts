import type { YearMonth } from '../lib/tenure';

interface Period {
  /** A year, or a span of months when the period had its own place or role. */
  when: string;
  role: string;
  text: string;
  /** Slug of the write-up for this period's main piece of work. */
  writeUp?: string;
}

interface Employer {
  company: string;
  title: string;
  from: YearMonth;
  /** Absent while the job is current. */
  to?: YearMonth;
  place: string;
  /** A job without periods, in a sentence or two. */
  summary?: string;
  /** For a job without periods: what the work covered, one line per area. */
  areas?: { label: string; text: string }[];
  periods: Period[];
}

/** Newest first. */
export const employers: Employer[] = [
  {
    company: 'Direct Axis Technology',
    title: 'Developer, then Senior Developer',
    from: '2020-06',
    place: 'Kannur, India → Dubai, UAE (2021)',
    summary: 'AxisPro is the company’s ERP for UAE businesses: accounting, HR and payroll, inventory and UAE government services, running for 200+ clients. Almost all of my work here is on AxisPro; since 2026 I also work on Acodax.',
    periods: [
      {
        when: '2026',
        role: 'Senior Developer · Acodax',
        text: 'Moved to Acodax (PHP 8.4, Laravel 13, React) to make it stable and faster: restructured the settings module that added about 400 ms to every request, took the repository from 27GB to about 280MB by moving builds into deployment, connected the servers through Tailscale during the move from AWS to Oracle Cloud, and wrote the team’s architecture and coding guidelines. Earlier in the year, on AxisPro: the leave management redesign, code review, incidents and financial demos for clients.',
        writeUp: 'leave-management',
      },
      {
        when: '2025',
        role: 'Senior Developer',
        text: 'Recovered a dropped client database from the raw disk.',
        writeUp: 'innodb-recovery',
      },
      {
        when: '2024',
        role: 'Senior Developer · core product',
        text: 'Sole owner of the core codebase every AxisPro client runs on. Built the workflow engine and typing-centre orders, rebuilt backups, and kept fitting more clients onto each server.',
        writeUp: 'workflow-engine',
      },
      {
        when: '2023',
        role: 'Senior Developer',
        text: 'Set up the single core codebase with version-controlled migrations, moved permissions to roles, and moved notifications to a self-hosted Soketi server. Built the Tadbeer MVP on a client site in Abu Dhabi.',
        writeUp: 'client-onboarding',
      },
      {
        when: 'Nov 2022 – Apr 2023',
        role: 'Team lead · Calicut, India',
        text: 'Six months at the Calicut office leading and training the AxisPro team: the business and the accounting behind the product, committing one unit of work at a time, coding standards, code review, client meetings, and progress reports to management.',
      },
      {
        when: 'Sep – Oct 2022',
        role: 'Developer · Dubai',
        text: 'Back at the main office. Fixed the slow invoice screen, upgraded the product from PHP 5.6 to 7.4, and brought in Laravel’s first layer.',
        writeUp: 'laravel-on-legacy-php',
      },
      {
        when: 'Mar 2021 – Aug 2022',
        role: 'Developer · on a client site',
        text: 'Eighteen months placed at a client. Built attendance, payroll and HR from scratch with their finance and HR teams, wrote the AutoFetch browser extension, replaced polling with real-time notifications, and kept supporting the accounting core.',
      },
      {
        when: 'Jan – Mar 2021',
        role: 'Developer · Dubai, team of 3',
        text: 'Moved to the Dubai office. Spent the first three months learning how the company sells the product and how clients use it to run their operations, alongside the other two developers.',
      },
      {
        when: '2020',
        role: 'Developer · Kannur, India',
        text: 'Joined on AxisPro, an ERP on PHP 5.6. Custom reports for clients, the car rental system, and a start on SAP UI5 for a property management project.',
      },
    ],
  },
  {
    company: 'Poornam Info Vision',
    title: 'Server Administrator & Technical Support',
    from: '2019-07',
    to: '2020-03',
    place: 'Kerala, India',
    summary: 'Ran Linux hosting servers and the websites and mail on them for clients. The server side of my later work started here.',
    areas: [
      { label: 'Linux servers', text: 'Managed Linux servers across dedicated and VPS environments: updates, security, users, permissions and SSH access. Monitored them with Prometheus and cleared CPU, memory, disk, inode and network bottlenecks, including slow MySQL queries, DDoS traffic and worker limits.' },
      { label: 'Web stack', text: 'Configured and tuned Apache, Nginx, PHP-FPM and MySQL / MariaDB, and fixed website problems at both server and code level, including WordPress and Magento sites.' },
      { label: 'Control panels', text: 'Administered cPanel / WHM and Plesk as a certified support engineer: websites, domains, DNS, SSL certificates, databases, backups and migrations. Provisioned VPS servers to client specifications with Let’s Encrypt SSL.' },
      { label: 'Mail and DNS', text: 'Ran mail on Exim, Dovecot and Postfix: dedicated IPs with PTR records, SPF, DKIM and DMARC, blacklist removal, spam filtering and deliverability. Managed DNS on BIND.' },
      { label: 'Security and recovery', text: 'Audited and cleaned up servers, investigated hosted sites for malicious or compromised files with backups secured first, and ran backup, recovery and disaster-recovery procedures to restore services after incidents.' },
      { label: 'Migrations and scripts', text: 'Moved websites and whole mailboxes from a cPanel server to a private VPS. Wrote Bash scripts, and documented configurations and procedures.' },
    ],
    periods: [],
  },
];

export const education = {
  degree: 'BTech, Computer Science',
  school: 'APJ Abdul Kalam Technological University',
  year: 2019,
};
