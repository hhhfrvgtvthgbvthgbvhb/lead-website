import { writeFileSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const url = 'https://www.kimi.com/apiv2-files/sign-obj/kimi-fs%2Ffiles%2Fblob%2Fb270e6ceddb73e71efa2661318e6b37133ffcc9d034b6c31a8d1701884407011?filename=lead-optimized-site-complete.tar.gz&sig=q8NZ36_72Y9y-sIwF_EmNUwkRA9BchAjShqL-5hu3bw=&t=o';
const response = await fetch(url, { redirect: 'follow' });
if (!response.ok) throw new Error(`Release download failed: ${response.status}`);
const archive = '/tmp/lead-optimized-site.tar.gz';
writeFileSync(archive, Buffer.from(await response.arrayBuffer()));
execFileSync('tar', ['-xzf', archive], { cwd: process.cwd(), stdio: 'inherit' });
unlinkSync(archive);
console.log('Optimized website release restored.');
