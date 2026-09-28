---
order: 2
title: 'New-client deployment: 3–4 months down to 2–3 hours'
summary: Replaced copy-paste client forks with one versioned core and turned scattered customisations into configurable features.
metric: 2–3 h
metricLabel: to onboard a client, down from 3–4 months
year: 2021–2023
role: Developer
tags: [Git workflow, Architecture, Configuration, Process]
metrics:
  - { value: 3–4 mo, label: deployment before }
  - { value: 2–3 h, label: deployment after }
  - { value: '1', label: central codebase for 200+ clients }
problem: Each new client started as a copy of another client’s code with git history stripped out. Features and bugs drifted across 10+ divergent copies. Merging a single feature into a new deployment took 1–2 days, and a full rollout took months.
steps:
  - heading: Fix git discipline first
    text: Moved the team off giant commits, live edits on production and dated backup folders, toward one commit per unit of work. That made every later step possible.
  - heading: Create a core project with provenance
    text: New clients are now forked from core, and their first commit records the source repo and commit. Every divergence can be traced, and fixes flow across projects.
  - heading: Turn customisations into options
    text: Identified the customisations clients kept asking for and rebuilt them as optional, configurable features inside core instead of per-client patches.
outcome: Setting up a new client went from a quarter-long merge project to an afternoon. Upgrades and cross-client bug fixes became routine instead of risky.
lesson: The biggest speedups were process and structure, not code. Code only became reusable once history was trustworthy.
---
