// make.fun entry — "Promote make.fun's make-your-own-bounty post on X"
//
// The entry is the post itself: one public post on X that quotes make.fun's
// make-your-own-bounty post, carries a photo of its own, and names make.fun and
// the entrant's play code in its text. The house reads that post's replies,
// reposts and quotes through FxTwitter and ranks entries by their sum.
//
// This program is the whole of the code the gate runs. Its only job is to hand
// the post's address to the gate as /output/POST.json, and to refuse to hand
// over an address that cannot be this bounty's post: a spelling X never uses, a
// status id that is not numeric, or the sponsoring post itself (which is a quote
// source, never an entry).
//
// Node 22, standard library only. No network, no wall clock, no randomness: two
// runs on the same repository write the same bytes and exit 0.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand
// in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

/** The post this bounty asks entrants to quote or link. It is never the entry. */
const SPONSOR_STATUS = '2124915864336236646';

/** An address X itself prints for a post: /<handle>/status/<numeric id>. */
const POST_ADDRESS = /^https:\/\/(?:www\.)?(?:x|twitter)\.com\/([A-Za-z0-9_]{1,15})\/status\/(\d{5,25})\/?$/;

type Post = { url: string; handle: string; status: string };

/** Read POST.json, or say exactly why it cannot be read. */
function readPost(file: string): Post {
  let raw: string;
  try {
    raw = readFileSync(file, 'utf8');
  } catch (err) {
    throw new Error(`POST.json is missing at ${file}: ${(err as Error).message}`);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new Error(`POST.json is not JSON: ${(err as Error).message}`);
  }

  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('POST.json must be an object of the form {"url": "https://x.com/<handle>/status/<id>"}');
  }

  const url = (parsed as Record<string, unknown>).url;
  if (typeof url !== 'string') {
    throw new Error('POST.json carries no "url" string');
  }

  const match = POST_ADDRESS.exec(url.trim());
  if (match === null) {
    throw new Error(`POST.json's url is not a post's address on X: ${JSON.stringify(url)}`);
  }

  const [, handle, status] = match;
  if (status === SPONSOR_STATUS) {
    throw new Error('POST.json names the sponsoring post; the entry must be a post of the entrant\'s own');
  }

  return { url: `https://x.com/${handle}/status/${status}`, handle, status };
}

function main(): number {
  let post: Post;
  try {
    post = readPost(join(BOT_DIR, 'POST.json'));
  } catch (err) {
    console.error(`entry refused: ${(err as Error).message}`);
    return 1;
  }

  // One line, canonical: the address X prints, normalised to x.com and stripped
  // of a trailing slash or a www. so the gate reads the same string every run.
  const payload = `${JSON.stringify({ url: post.url })}\n`;

  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(join(OUTPUT_DIR, 'POST.json'), payload, { encoding: 'utf8', mode: 0o644 });

  console.log(`post entered: ${post.url} (@${post.handle}, status ${post.status})`);
  return 0;
}

process.exit(main());
