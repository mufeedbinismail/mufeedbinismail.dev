---
order: 6
title: Recovering a dropped database from the raw disk
summary: A colleague dropped a live client database by accident, with binary logging off. The previous day’s backup was restored the same day; the rest of that day’s transactions I recovered from the disk itself, over eight weeks.
year: '2025'
area: AxisPro servers and data
role: On my own
stack: [MariaDB, InnoDB, Go]
problem: In May 2025, while cleaning up a server after a migration, a colleague deleted a live database. Binary logging was off, so there was nothing to replay. The backup on our NAS covered everything up to the day before. That day’s invoices and payments existed only as freed space on the disk, which any new write could overwrite.
steps:
  - heading: Stop writes, keep the client working
    text: We stopped the server straight away and moved the other clients on it to a new server. I restored the previous day’s backup so the client could carry on working.
  - heading: Learn how InnoDB stores data
    text: I read the MariaDB source to learn InnoDB’s on-disk format (pages, indexes, record layout, undo logs), learned Go, and wrote a tool that scanned the disk image byte by byte, found InnoDB pages and decoded the rows of the transactions table. That recovered about 90% in four weeks.
  - heading: Undo logs for the rest
    text: The remaining records existed only in the undo logs, which use a different format and have to be read differently. That took another four weeks.
outcome: All 300+ transactions from that day were restored and reconciled against the backup. The client lost no financial records.
lesson: The approach that recovered the first 90% was no use for the last 10%. I had to start again with a different picture of how the data was stored.
---
