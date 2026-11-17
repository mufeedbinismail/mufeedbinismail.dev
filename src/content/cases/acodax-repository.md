---
order: 1
title: Moving builds out of a 27GB repository
summary: The Acodax repository had grown to 27GB because front-end builds were committed with every UI change, and pulling it for a deploy could take a server down for lack of disk. I rewrote its history without the builds, bringing it to about 280MB, and made the build a step of every deployment.
year: '2026'
area: Acodax
role: Did the clean-up and built the pipeline
stack: [Git, git filter-repo, Laravel Forge, Tailscale, Oracle Cloud, rsync, Bash]
problem: Acodax is one monolithic codebase holding more than twelve applications on a single main branch, with around twenty long-lived client branches beside it. Front-end builds were committed whenever the UI changed, so the repository had reached 27GB. Pulling changes to deploy could fill a server's disk and take it down.
steps:
  - heading: Measure before changing anything
    text: I analysed the repository and found that the client branches carried the build commits in their history. A dry run without the builds showed the code itself was about 280MB.
  - heading: Rewrite the history
    text: I archived the old repository, then rewrote the history with git filter-repo to remove every trace of the build commits, so the builds are gone from the history as well as the working tree.
  - heading: Connect the servers to a build machine
    text: The company had just moved from AWS to Oracle Cloud. I set up a Tailscale network with a jump server on Oracle Cloud that connects all the servers and relays to the local build machine through a low-privilege user. On the build machine, a worker user can run only the whitelisted commands the build script needs.
  - heading: Build as part of deployment
    text: When a Laravel Forge deployment runs, the server rsyncs only the changed files to the worker, the worker compiles the build, and the server downloads, extracts and installs it.
outcome: The repository is about 280MB, builds are no longer in Git or its history, and a deploy no longer risks filling a server's disk.
lesson: This fixed the size and the deploys, not the workflow behind them. One long-lived branch per client in a single monolith still needs untangling, and that is the harder part.
---
