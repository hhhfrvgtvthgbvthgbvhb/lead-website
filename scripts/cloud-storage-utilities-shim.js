/**
 * Client-bundle shim for '@payloadcms/plugin-cloud-storage/utilities'.
 *
 * The real barrel re-exports server-only utilities (resolveSignedURLKey →
 * payload internals → pino/node builtins), which breaks the browser build.
 * Admin client components only need getFileKey/sanitizePrefix, so the
 * lightweight, dependency-free implementations are mirrored here.
 */
import path from 'path'
import { sanitizeFilename } from 'payload/shared'

export function sanitizePrefix(prefix) {
  let decodedPrefix
  try {
    decodedPrefix = decodeURIComponent(prefix)
  } catch {
    return ''
  }
  if (/%[0-9a-f]{2}/i.test(decodedPrefix)) {
    return ''
  }
  return decodedPrefix
    .replace(/\\/g, '/')
    .split('/')
    .filter((segment) => segment !== '..' && segment !== '.')
    .join('/')
    .replace(/^\/+/, '')
    // eslint-disable-next-line no-control-regex
    .replace(/[\x00-\x1f\x80-\x9f]/g, '')
}

export function getFileKey({ collectionPrefix, docPrefix, filename, useCompositePrefixes = false }) {
  const safeCollectionPrefix = sanitizePrefix(collectionPrefix || '')
  const safeDocPrefix = sanitizePrefix(docPrefix || '')
  const safeFilename = sanitizeFilename(filename)
  const fileKey = useCompositePrefixes
    ? path.posix.join(safeCollectionPrefix, safeDocPrefix, safeFilename)
    : path.posix.join(safeDocPrefix || safeCollectionPrefix, safeFilename)
  return {
    fileKey,
    sanitizedCollectionPrefix: safeCollectionPrefix,
    sanitizedDocPrefix: safeDocPrefix,
    sanitizedFilename: safeFilename,
  }
}

// Server-only utilities — never called from the browser bundle.
export async function getFilePrefix() {
  return ''
}
export function initClientUploads() {
  throw new Error('initClientUploads is only available on the server')
}
export function resolveSignedURLKey() {
  throw new Error('resolveSignedURLKey is only available on the server')
}
