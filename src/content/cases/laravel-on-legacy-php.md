---
order: 3
title: Laravel underneath a legacy PHP codebase
summary: The product was plain PHP on an expired PHP 5.6. Instead of a rewrite, I upgraded it to 7.4 and brought Laravel in underneath the old code, one piece at a time, for 200+ clients.
year: 2022 onward
area: AxisPro core
role: Did the upgrade and the integration
stack: [PHP 7.4, Laravel, Redis, Soketi]
problem: PHP 5.6 had reached end of life. The code was plain PHP with folder-based routing, and database changes were made by hand on production, so a teammate’s change could cost hours of debugging before anyone found it.
steps:
  - heading: Upgrade to 7.4
    text: PHP 7.4 was the widely supported version then. Going straight to 8 would have been better, but management was worried about downtime, so we took the smaller step.
  - heading: Migrations first
    text: Laravel’s database migrations put schema changes under version control. That ended hand edits on production and gave Laravel its first foothold in the codebase.
  - heading: Laravel underneath
    text: I replaced the legacy authentication and session layers so Laravel runs under the old code. That made queues, events, scheduling, Redis caching, API routes and real-time notifications available to the whole product.
outcome: Legacy code can be moved to Laravel gradually, and new features use it straight away. The self-hosted notification server built on it serves every client.
lesson: A live system can be modernised one layer at a time, as long as each step is useful on its own.
---
