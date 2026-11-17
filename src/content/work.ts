/**
 * The work list on the home page, grouped by the part of the system it touched.
 * An item with a write-up takes its title, year and summary from that write-up
 * in `src/content/cases/`, so the two never drift apart.
 */
export type WorkItem = { writeUp: string } | { title: string; year: string; text: string };

export const work: { area: string; items: WorkItem[] }[] = [
  {
    area: 'Acodax',
    items: [
      {
        title: 'Settings that loaded on every request',
        year: '2026',
        text: 'The settings module, the busiest part of Acodax, added about 400 ms to every request before the app had booted. I restructured it, and traced the deeper causes of the slowness: Eloquent models used as read models and N+1 queries built into the API resources, which are being moved to a new foundation gradually.',
      },
      { writeUp: 'acodax-repository' },
      {
        title: 'One private network for the servers',
        year: '2026',
        text: 'During the move from AWS to Oracle Cloud, I connected all servers through Tailscale with a jump server on Oracle Cloud. It relays to the local build machine through a low-privilege user, and the build worker can run only whitelisted commands.',
      },
      {
        title: 'Guidelines for the team',
        year: '2026',
        text: 'Wrote the architecture and coding guidelines, including the ones the team’s AI coding tools follow, and defined the development workflow, so new code lands on the new foundation.',
      },
    ],
  },
  {
    area: 'AxisPro core',
    items: [
      { writeUp: 'client-onboarding' },
      { writeUp: 'laravel-on-legacy-php' },
      {
        title: 'A slow invoice screen',
        year: '2022',
        text: 'A client was about to leave over slowness, and each earlier fix had been a bigger server. Profiling showed heavy dashboard reports running on every page and the invoice screen recalculating the whole balance each time. I gated the reports and kept balances up to date as invoices, payments and refunds happened. The invoice screen went from over three minutes to one to three seconds; the client stayed and later upgraded.',
      },
      {
        title: 'Duplicate invoice numbers and half-saved records',
        year: '2021',
        text: 'Two intermittent bugs nobody could reproduce. After a deadlock, the app retried the failed query on a transaction that had already rolled back, saving half a record. And reference numbers came from MAX + 1, which two people could read at once. The retry fix was small; numbering needed a rewrite around a locked sequence.',
      },
      {
        title: 'Permissions as roles',
        year: '2023',
        text: 'Access was checked against hardcoded IDs. I turned them into permissions on roles, which made roles clonable, gave juniors one way to add a permission, and allowed a report of who can do what.',
      },
      {
        title: 'AutoFetch, a browser extension',
        year: '2021',
        text: 'Staff at a client did their work on government portals. The extension recorded each transaction as they worked (service, customer, payment reference) so invoicing became a few clicks and bank payments reconciled cleanly.',
      },
      {
        title: 'SMS providers',
        year: '2021–2023',
        text: 'Etisalat, Reason8 and RouteMobile, added as clients asked for them, behind one driver interface. Adding another is now a few lines of configuration.',
      },
    ],
  },
  {
    area: 'AxisPro HR',
    items: [{ writeUp: 'leave-management' }, { writeUp: 'workflow-engine' }],
  },
  {
    area: 'AxisPro servers and data',
    items: [
      { writeUp: 'innodb-recovery' },
      {
        title: 'Backups that look after themselves',
        year: '2024',
        text: 'I found my director deleting backups by hand because the 4TB backup server kept filling. Each backup pulled in all ten days of daily copies from every server. I switched to incremental backups with a retention script (30 daily, 24 weekly, 12 monthly, 7 yearly). Usage dropped to about 600GB, and nobody has had to touch it since.',
      },
      {
        title: 'Real-time notifications',
        year: '2021–2023',
        text: 'Polling for notifications filled Apache’s workers and locked users out. Pusher fixed that but became expensive with 100+ users online at once. After laravel-websockets, I settled on Soketi, containerised on its own server. It now carries notifications for 200+ clients.',
      },
      {
        title: 'A crashed MariaDB table',
        year: '2023',
        text: 'A client had been down for about half a day when I was asked to look. It was a crashed table; MariaDB’s crash recovery brought it back within half an hour.',
      },
      {
        title: 'More clients per server',
        year: '2023–2024',
        text: 'With the performance work above, one server comfortably hosts about four clients. AWS cost per client fell from AED 44 to AED 11 a month.',
      },
    ],
  },
];
