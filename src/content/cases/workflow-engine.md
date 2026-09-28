---
order: 4
title: A configurable workflow engine for every approval
summary: Replaced a single hardwired approval path with one engine for tasks and multi-level approvals across the product.
metric: 1 engine
metricLabel: for all approval flows
year: '2024'
role: Designer & implementer
tags: [Workflow engine, Architecture, Laravel, Developer experience]
metrics:
  - { value: N levels, label: of configurable approval }
  - { value: 1 place, label: for all tasks and activities }
  - { value: '0', label: engine internals needed to add a flow }
problem: Document changes, leave requests and new order applications each needed approvals, but the product had one fixed, non-configurable path. Every new requirement meant custom code.
steps:
  - heading: Unify tasks and activities
    text: Modelled every approvable action as a task that moves through defined steps, so they all live in one place.
  - heading: Make approval levels configuration
    text: Clients can define who approves at each level without code changes.
  - heading: Hide the engine behind a small contract
    text: Adding a workflow means declaring what happens at each step. Colleagues don’t need to understand the internals.
outcome: New workflows went from custom builds to short definitions, and clients got approval chains that match how they actually operate.
lesson: A good internal engine is measured by how little other developers need to know about it.
---
