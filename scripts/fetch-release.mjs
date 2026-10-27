import { writeFileSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const url = 'https://www.kimi.com/apiv2-files/sign-obj/kimi-fs%2Ffiles%2Fblob%2Fe28418ebfd0e6668c2c77ccdad7d8b5dd8b98d989a3b3b1904c9da56123d3e48?filename=lead-optimized-site-final.tar.gz&sig=YLM6ibVhc4WE25j0RzU62q3UVq9rT1oQz7eg-zWhO1Y=&t=o';
const response = await fetch(url, { redirect: 'follow' });
if (!response.ok) throw new Error(`Release download failed: ${response.status}`);
const archive = '/tmp/lead-optimized-site.tar.gz';
writeFileSync(archive, Buffer.from(await response.arrayBuffer()));
execFileSync('tar', ['-xzf', archive], { cwd: process.cwd(), stdio: 'inherit' });
unlinkSync(archive);
console.log('Optimized website release restored.');
