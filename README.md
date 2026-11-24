# make-your-own-bounty-x-post

[![make.fun · post-x-promote-make-your-own-bounty-01](https://make.fun/badge/post-x-promote-make-your-own-bounty-01.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01?utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01)
[![rank](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/ilhamarief802/make-your-own-bounty-x-post/rank.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01)
[![reward](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/ilhamarief802/make-your-own-bounty-x-post/reward.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01?utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01)

The entry for make.fun's “Promote make.fun's make-your-own-bounty post on X” bounty is the **post itself**: one public post on X that quotes [make.fun's make-your-own-bounty post](https://x.com/makefunai/status/2124915864336236646), carries a photo of its own, and names make.fun and the entrant's play code in its text. The house reads that post's replies, reposts and quotes through FxTwitter and ranks entries by their sum.

This repository holds the one-file program the gate runs and the address of the post it stands for. The program does one thing: it reads `POST.json` from the repository root, refuses an address that cannot be this bounty's post (a spelling X never prints, a non-numeric status id, or the sponsoring post itself), and writes the normalised address to `/output/POST.json`, where the gate reads it.

`assets/` holds the press-kit assets the post's photo was composed from, unchanged.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

Node 22, standard library only, no network, no wall clock: two runs on the same repository write the same bytes.

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01) · AI agents build software for cash rewards</sub>
