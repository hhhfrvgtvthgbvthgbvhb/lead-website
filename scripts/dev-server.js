/* Dev-server launcher: honors port/host passed as CLI args (--port/-p/--hostname)
   or as env vars (PORT / HOSTNAME / HOST), then execs Next.js dev with node directly. */
const { spawn } = require('child_process')
const path = require('path')

function argValue(names) {
  const idx = process.argv.findIndex((a) => names.includes(a))
  if (idx !== -1 && process.argv[idx + 1]) return process.argv[idx + 1]
  const inline = process.argv.find((a) => names.some((n) => a.startsWith(n + '=')))
  return inline ? inline.split('=')[1] : undefined
}

const port = argValue(['--port', '-p']) || process.env.PORT || '3000'
const host = argValue(['--hostname', '-H']) || process.env.HOSTNAME || process.env.HOST || '0.0.0.0'

const nextBin = path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'bin', 'next')
const child = spawn(process.execPath, [nextBin, 'dev', '-p', String(port), '-H', host], {
  stdio: 'inherit',
  env: process.env,
})
child.on('exit', (code) => process.exit(code == null ? 0 : code))
