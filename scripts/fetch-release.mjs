import { writeFileSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const url = 'https://www.kimi.com/apiv2-files/sign-obj/kimi-fs%2Ffiles%2Fblob%2F37d402895f224f5b9b8c358fec21c21784d8caa3d17082bd91bec7c36c3cc25c?filename=lead-81-products-complete.tar.gz&sig=z53aFiZdikJfPNI3B_jo2Z-_jXMVcX_LjH3JeAZeCt8=&t=o';
const response = await fetch(url, { redirect: 'follow' });
if (!response.ok) throw new Error(`Release download failed: ${response.status}`);
const archive = '/tmp/lead-optimized-site.tar.gz';
writeFileSync(archive, Buffer.from(await response.arrayBuffer()));
execFileSync('tar', ['-xzf', archive], { cwd: process.cwd(), stdio: 'inherit' });
unlinkSync(archive);
console.log('Optimized website release restored.');
