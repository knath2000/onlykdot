// src/content/config.ts
import { z, defineCollection } from 'astro:content'; // Only import from astro:content

// Define the schema for the 'projects' collection
const projectsCollection = defineCollection({
  type: 'content', // 'content' for Markdown/MDX, 'data' for JSON/YAML
  schema: ({ image }) => z.object({ // Use function schema to get image helper
    title: z.string(),
    publishDate: z.date().optional(), // Made optional as per example data
    shortDesc: z.string(), // Short description for cards/previews
    thumbnail: image().optional(), // Use the destructured image helper
    techStack: z.array(z.string()).optional(), // List of technologies used
    problemStatement: z.string().optional(), // Optional section for project details
    // Define the links object schema
    links: z.object({
      live: z.string().url().optional(), // Optional live demo URL
      repo: z.string().url().optional(), // Optional repository URL
    }).optional(),
    isFeatured: z.boolean().optional().default(false), // Optional flag for featured projects
    isAnimated: z.boolean().optional().default(false), // Optional flag for animated cards
    // Add any other fields you might need, e.g., client, role
  }),
});

// Export a 'collections' object to register the collection(s)
export const collections = {
  'projects': projectsCollection,
};