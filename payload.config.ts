import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { Products } from './collections/Products'
import { News } from './collections/News'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { Inquiries } from './collections/Inquiries'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Products, News, Inquiries],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'a-very-secure-secret-key-for-lead-website-2024',
  sharp,
  // Local development defaults to zero-setup SQLite (file:./payload.db).
  // Set MONGODB_URI (e.g. MongoDB Atlas on Vercel) to switch to MongoDB.
  db: process.env.MONGODB_URI
    ? mongooseAdapter({
        url: process.env.MONGODB_URI,
      })
    : sqliteAdapter({
        client: {
          url: process.env.DATABASE_URI || 'file:./payload.db',
        },
      }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
  upload: {
    limits: {
      fileSize: 5000000, // 5MB
    },
  },
})
