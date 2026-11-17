/** What every product below was built with, front and back. */
export const builtWith = 'PHP, Laravel, Blade, jQuery and plain JavaScript, Bootstrap with the Metronic theme, MariaDB.';

interface Product {
  name: string;
  when: string;
  where: string;
  /** What it does, for the people who use it. */
  what: string;
  /** What I did on it, and what became of it. */
  part: string;
}

/** Newest first. */
export const products: Product[] = [
  {
    name: 'Typing-centre orders',
    when: '2024',
    where: 'Part of AxisPro · Dubai',
    what: 'Prepaid orders for typing centres: take payment up front, complete each sub-task partly or fully, record expenses as they come up, and see the sales and profit on every order. It runs on the existing accounting core.',
    part: 'A first version built elsewhere couldn’t be merged without breaking existing clients, so I rebuilt it inside the core product. It brought in many small clients.',
  },
  {
    name: 'Tadbeer: domestic-worker services',
    when: '2023',
    where: 'Built on AxisPro · on a client site in Abu Dhabi',
    what: 'Scheduling and contracts for domestic-worker agencies: contract lifecycle, progressive invoicing, accrual-based revenue recognition, instalments and reminders.',
    part: 'The first version, a four-week add-on to the ERP, didn’t fit how agencies work, and we lost that client. For the next one I worked on site, learned their operation, and built a new MVP in four weeks before handing it to a colleague. It is now sold as its own product.',
  },
  {
    name: 'HR and payroll',
    when: '2021–2022',
    where: 'Built on AxisPro · on a client site in Dubai',
    what: 'Attendance, shifts, leave, overtime, payroll, loans and advances, gratuity and end of service, pension, visas and documents, with payroll posted straight into the accounts. Reads attendance machines and Emirates ID cards.',
    part: 'Built from scratch, sitting with the client’s finance and HR teams; the prototype before it couldn’t be reused. It started as an MVP, became a full HR system, and is now sold as its own product.',
  },
  {
    name: 'Car rental agreements',
    when: '2020',
    where: 'Kannur, India',
    what: 'Lease agreements, quotations and invoices with every revision tracked, and an agreement builder that printed exactly as designed.',
    part: 'Built it end to end. The project stopped when the client left over a payment dispute.',
  },
];
