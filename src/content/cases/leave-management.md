---
order: 4
title: Redesigning leave management
summary: Clients kept asking for their own leave types, and each one meant editing four central files that were easy to break. I rebuilt the module so a new leave type is a single policy file.
year: '2026'
area: AxisPro HR
role: Designed and built it
stack: [PHP, Laravel, Strategy pattern, Strict types]
problem: Leave types were hardcoded into four central pieces. Taken leave, accrual, adjustments, lapse and carry-forward all depended on each other, so a client-specific leave type added by someone who didn’t know the whole system would quietly break the balance of another type.
steps:
  - heading: Start where it’s tangled
    text: I started at the processor, found the exact point where rules and mechanics got mixed, and moved that into its own layer.
  - heading: Strategies for the parts that vary
    text: The schedule became calendar-year or service-year strategies, and accrual became tiered or flat ones, behind types strict enough that invalid combinations fail early.
  - heading: Policies say what, not how
    text: A leave type is now a policy file describing what it wants. One processor does the work for all of them.
outcome: A new leave type that used to need changes in four central files now needs one policy file, and colleagues can add one without knowing how the processor works.
lesson: It took six days and could have taken three. Working bottom-up, from the processor to the policy, is faster because the pattern shows itself. Top-down, I tend to guess wrong or over-build.
---
