---
order: 2
title: One core codebase for every client
summary: New clients used to start as a copy of another client’s code. I set up a single core project they fork from and turned common customisations into settings. Setting up a client went from 3–4 months to 2–3 hours, and later to about 15 minutes.
year: 2023 onward
area: AxisPro core
role: Proposed it, built it, maintained it
stack: [Git, PHP, Configuration]
problem: Each new client began as a copy of an existing client’s code with the git history removed. Features and fixes were scattered across many copies, merging one feature into a new client took a day or two, and going live took three to four months. When about ten new clients arrived around the start of 2023, the team couldn’t keep up.
steps:
  - heading: Git habits first
    text: This only works if history can be trusted, so the team had to commit one unit of work at a time instead of large mixed commits, edits on production and _backup folders. I had spent the previous months in Calicut teaching exactly that.
  - heading: A core project with a recorded origin
    text: New clients are copied from core, and their first commit records which repository and commit they came from. Fixes that apply to everyone go into core and reach clients from there, and every client’s divergence can be traced.
  - heading: Customisations become settings
    text: Customisations that kept coming up across clients were rebuilt once in core as optional features, switched on per client.
outcome: Setting up a new client went from 3–4 months to 2–3 hours, and to about 15 minutes once I had automated most of the steps. Upgrades and fixes across clients became routine.
lesson: Most of the time saved came from process and structure, not code. The code only became reusable once the history could be trusted.
---
