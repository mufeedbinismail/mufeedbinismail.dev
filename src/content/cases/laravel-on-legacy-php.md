---
order: 5
title: Running Laravel on top of a legacy PHP codebase
summary: Modernised a native-PHP, directory-routed product in place, without a rewrite and without downtime for 200+ clients.
metric: 200+
metricLabel: clients migrated in place
year: 2022 → present
role: Incremental modernisation
tags: [Laravel, PHP 5.6 → 7.4, Redis, WebSockets, OAuth2 / JWT]
metrics:
  - { value: 5.6 → 7.4, label: PHP upgrade for new clients }
  - { value: 1 login, label: single sign-on across the app }
  - { value: Self-hosted, label: WebSockets replacing paid Pusher }
problem: The product was native PHP on an end-of-life runtime, with directory-based routing and schema changes applied by hand in production. A rewrite wasn’t realistic, but the codebase needed modern foundations.
steps:
  - heading: Start with migrations
    text: Introduced version-controlled database migrations, which ended manual production schema edits and gave Laravel its first foothold.
  - heading: Replace auth and session
    text: Swapped the legacy auth and session layers so Laravel runs underneath the old code. One auth provider, one login.
  - heading: Open the platform up
    text: Added API routes (JWT, OAuth2), middleware, queues, schedulers, events and Redis caching, plus a containerised Soketi server for real-time notifications.
outcome: Legacy code can now be ported gradually. The self-hosted notification centre serves every client and cut third-party costs significantly.
lesson: You can modernise a live system one layer at a time if each step pays for itself.
---
