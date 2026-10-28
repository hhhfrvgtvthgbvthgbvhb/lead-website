import { writeFileSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const url = 'https://www.kimi.com/apiv2-files/sign-obj/kimi-fs%2Ffiles%2Fblob%2F56de6fb72419ec16e2bfe9af809b0d4439f14ef0955d7119cc7a63a630b40bca?filename=lead-doctype-fix.tar.gz&sig=VSA7Ei3G3yQa2vr-tn88qvwz3eUGP8vNS928mb9Ku6E=&t=o';
const response = await fetch(url, { redirect: 'follow' });
if (!response.ok) throw new Error(`Release download failed: ${response.status}`);
const archive = '/tmp/lead-optimized-site.tar.gz';
writeFileSync(archive, Buffer.from(await response.arrayBuffer()));
execFileSync('tar', ['-xzf', archive], { cwd: process.cwd(), stdio: 'inherit' });
unlinkSync(archive);
console.log('Optimized website release restored.');
