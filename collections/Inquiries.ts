import { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'country', 'productInterest', 'createdAt'],
    description: 'Contact-form submissions from the website. Read-only records.',
  },
  access: {
    read: () => true,
    create: () => true, // public website form posts via the local API route
    update: () => false,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'country',
      type: 'text',
    },
    {
      name: 'productInterest',
      type: 'text',
      admin: {
        description: 'Product category or model the visitor is interested in',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'website-contact-form',
      admin: {
        readOnly: true,
      },
    },
  ],
  timestamps: true,
}
