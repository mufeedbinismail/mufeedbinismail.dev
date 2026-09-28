/** "More work": smaller wins that don't get a full case study. */
export const highlights = [
  { title: 'Backups: 4TB down to ~15%', year: '2025', text: 'Replaced full multiversion backups for 200+ clients with incremental backups and a GFS retention script. Storage became predictable, with 5–10× effective capacity.' },
  { title: 'Invoice screen: 3+ minutes to 1–3 seconds', year: '2023', text: 'Every invoice recalculated the full balance. Event-driven cached balances fixed it and kept a client who was about to leave; they later upgraded to premium.' },
  { title: 'Duplicate invoice reference numbers', year: '—', text: 'Traced MAX+1 races and unsafe deadlock retries. Rebuilt reference allocation around a row-locked sequence table.' },
  { title: 'Server crash recovered in 30 minutes', year: '2023', text: 'After half a day of client downtime, found a crashed table and configured MariaDB crash recovery.' },
  { title: 'A domestic-worker scheduling product for the UAE', year: '2023–24', text: 'Recognised that a rushed ERP add-on really needed to be a scheduling system. It grew into a product of its own.' },
  { title: 'Attendance, payroll & HRM', year: '2021–22', text: 'MVP in about two months, working on-site with finance. It grew into a full HRM suite that won many new clients.' },
  { title: 'Prepaid orders & expenses', year: '2024', text: 'Order, sub-task and expense tracking for high-volume typing centres, built on existing accounts. It brought in many small clients.' },
  { title: 'Browser extension for automated billing', year: '2022', text: 'Captured data from a government portal as staff worked, which automated billing and flagged unpaid applications.' },
  { title: 'Server density: 1 → 3–4 clients per server', year: '2023–24', text: 'Ongoing optimisation, up to 10 clients per server depending on configuration. AWS cost per client fell from AED 44 to AED 11 a month.' },
  { title: 'Permissions, devices & SMS', year: '2022', text: 'Centralised role-based access, integrated attendance machines and ID readers, and made SMS providers configurable.' },
];
