---
order: 5
title: A workflow engine for approvals
summary: Every client wanted approvals, and every client’s flow was different. I replaced a fixed two-level setup with one engine that runs whatever flow a client configures.
year: '2024'
area: AxisPro HR
role: Designed and built it
stack: [PHP, Laravel, Interfaces]
problem: Approvals were a fixed level-one and level-two approver set on each user. It wasn’t configurable, so each client’s real flow for leave requests, document changes or new orders became custom code. It came to a head while merging HR into the core product.
steps:
  - heading: One place for tasks
    text: Leave requests, document changes and new orders all became tasks that move through steps, with the people involved discussing each one in the same place.
  - heading: Approvers as configuration
    text: Each step’s approver can be a user, a role, an employee, a dependant or an automated step, set per client without code.
  - heading: A small contract for developers
    text: A central engine handles the transitions. Adding a workflow means writing what happens at each step; nobody has to learn how the engine works.
outcome: New approval flows became short definitions instead of custom work, and clients got flows that match how they actually operate.
lesson: An internal engine is doing its job when other developers don’t have to think about it.
---
