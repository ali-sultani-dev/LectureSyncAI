import type { CollectionConfig } from 'payload'

export const Notes: CollectionConfig = {
  slug: 'notes',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'createdAt', 'owner', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      admin: {
        description: 'The main title of the lecture note.',
      },
    },
    {
      name: 'audioFile',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Audio File',
      filterOptions: {
        mimeType: { contains: 'audio' },
      },
      admin: {
        description: 'The uploaded audio recording file.',
      },
    },
    {
      name: 'transcript',
      label: 'Audio Transcript',
      type: 'richText',
      admin: {
        description: 'Full transcript content',
      },
    },
    {
      name: 'summary',
      type: 'richText',
      label: 'Summary Content',
      admin: {
        description: 'AI-generated or manually written summary of the lecture.',
      },
    },

    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      required: true,
      defaultValue: ({ user }) => user?.id,
      admin: {
        position: 'sidebar',
        readOnly: true,
        condition: (data) => Boolean(data?.owner),
      },
    },
  ],
  timestamps: true,
}
