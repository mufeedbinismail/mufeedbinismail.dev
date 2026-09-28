---
order: 1
title: Carving 300+ invoices back from a dropped database
summary: A production database was dropped by accident. Using the previous day’s backup plus raw disk forensics, I got back every transaction written after it.
metric: AED 300K+
metricLabel: in transactions recovered
year: '2025'
role: Solo recovery
tags: [MariaDB, InnoDB internals, Go, Data forensics]
metrics:
  - { value: AED 200K+, label: in 300+ invoices restored }
  - { value: AED 130K+, label: in 120+ payments restored }
  - { value: 100%, label: of lost transactions recovered }
  - { value: 8 wks, label: from raw disk image to done }
problem: During a post-migration check, a colleague dropped a live client database. The last backup was from the day before, so a full day of invoices and payments existed only as fragments on disk. No off-the-shelf tool could reconstruct them.
steps:
  - heading: Learn the storage engine from the bytes up
    text: Studied InnoDB’s on-disk layout (pages, B-tree indexes, record formats and undo log structure), all well below the level most application developers ever touch.
  - heading: Write a Go carver for raw pages
    text: Reverse-engineered the page format and wrote tooling that scanned disk sectors, identified InnoDB pages, and decoded records back into rows. That recovered about 90% in four weeks.
  - heading: Switch mental models for the last 10%
    text: The remaining data only existed in undo logs, which use a different format and a different logic. Four more weeks rebuilt those records and reconciled them with the carved rows.
outcome: Every transaction from the gap was restored and reconciled against the backup, so the client lost no financial records.
lesson: Recovery work rewards changing your mental model. The technique that got the first 90% was useless for the last 10%.
---
