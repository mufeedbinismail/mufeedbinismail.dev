---
order: 3
title: Redesigning leave management so it’s hard to get wrong
summary: Rebuilt a fragile, tangled HRM module into a strategy-driven design where a new leave type is one declarative policy file.
metric: 4 → 1
metricLabel: files per new leave type
year: '2026'
role: Designed & delivered
tags: [Strategy pattern, Type safety, Refactoring, HRM]
metrics:
  - { value: 4 → 1, label: files touched per new leave type }
  - { value: 6 days, label: from broken to redesigned }
  - { value: '3', label: 'clean layers: processor, logic, policy' }
problem: Leave rules had been hardcoded into HRM with no clear design. Accrual, lapse, validation and payment logic were intertwined across central files. When a junior developer refactored it for API work, it broke.
steps:
  - heading: Find the exact friction point
    text: Instead of designing top-down, I started at the processor and located where rules and mechanics got tangled.
  - heading: Separate layers under a strict type system
    text: Split the module into processor, processing logic and policy, with types strict enough that invalid combinations fail early.
  - heading: Extract reusable strategies
    text: Accrual, lapse and payment became interchangeable strategies. A policy file now describes what a leave type wants, not how to compute it.
outcome: Adding a leave type no longer needs edits to four central files, just one policy. Junior developers can extend the module safely.
lesson: Refactor bottom-up. Build from the processor up to the policy and the pattern reveals itself. Top-down designs tend to be wrong or over-engineered.
---
