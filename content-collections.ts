import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

const stories = defineCollection({
  name: 'stories',
  directory: 'content/stories',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    genre: z.string(),
    order: z.number(),
  }),
  transform: async (doc) => {
    return {
      ...doc,
      slug: doc.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, ''),
    }
  },
})

export default defineConfig({
  collections: [stories],
})
