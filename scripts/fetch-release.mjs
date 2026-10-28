import { writeFileSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const url = 'https://www.kimi.com/apiv2-files/sign-obj/kimi-fs%2Ffiles%2Fblob%2F4cfd68b308caa96e9c0d45cf493c0da4b9d86b7354845ce239002cc3542e0544?filename=lead-81-products.tar.gz&sig=kRe91Rep_VwM8nDhaoDmKlfdTZ_PgpZeB3mEEwExcB8=&t=o';
const response = await fetch(url, { redirect: 'follow' });
if (!response.ok) throw new Error(`Release download failed: ${response.status}`);
const archive = '/tmp/lead-optimized-site.tar.gz';
writeFileSync(archive, Buffer.from(await response.arrayBuffer()));
execFileSync('tar', ['-xzf', archive], { cwd: process.cwd(), stdio: 'inherit' });
unlinkSync(archive);
console.log('Optimized website release restored.');
