---
name: sanity-cms-schema
description: Use when setting up Sanity CMS for any ZOLCUZ project — agency site or client demo sites. Owns all schema definitions, GROQ queries, and CMS setup instructions.
---
# Sanity CMS Schema

## Setup
```bash
npm create sanity@latest -- --project YOUR_PROJECT_ID --dataset production --template clean
```
Install in /sanity subfolder of your project.

## Schema files structure
```
/sanity
  /schemas
    index.js          — exports all schemas
    documents/
      project.js      — portfolio case studies
      service.js      — service offerings
      testimonial.js  — client testimonials
      faq.js          — FAQ items
      serviceArea.js  — location/service area pages
      page.js         — generic pages (privacy, terms, etc.)
    objects/
      seoMeta.js      — reusable SEO fields
  sanity.config.js
```

## schemas/index.js
```javascript
import project from './documents/project'
import service from './documents/service'
import testimonial from './documents/testimonial'
import faq from './documents/faq'
import serviceArea from './documents/serviceArea'
import page from './documents/page'
import seoMeta from './objects/seoMeta'

export const schemaTypes = [
  project, service, testimonial, faq, serviceArea, page, seoMeta
]
```

## documents/project.js (portfolio case studies)
```javascript
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Project Title', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: Rule => Rule.required() },
    { name: 'niche', title: 'Niche', type: 'string',
      options: { list: [
        { title: 'Custom Kitchen', value: 'kitchen' },
        { title: 'Home Theater', value: 'theater' },
        { title: 'Custom Closet', value: 'closet' },
        { title: 'Premium Bathroom', value: 'bathroom' },
        { title: 'Windows & Doors', value: 'windows' }
      ]}
    },
    { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string', validation: Rule => Rule.required() }]
    },
    { name: 'gallery', title: 'Gallery Images', type: 'array',
      of: [{ type: 'image', options: { hotspot: true },
        fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }]
      }]
    },
    { name: 'description', title: 'Project Description', type: 'text', rows: 4 },
    { name: 'completionYear', title: 'Year Completed', type: 'number' },
    { name: 'location', title: 'Location (City, State)', type: 'string' },
    { name: 'projectValue', title: 'Project Value Range', type: 'string',
      options: { list: ['$50K–$100K', '$100K–$200K', '$200K–$500K', '$500K+'] }
    },
    { name: 'beforeImage', title: 'Before Image', type: 'image', options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }]
    },
    { name: 'testimonial', title: 'Client Testimonial', type: 'reference', to: [{ type: 'testimonial' }] },
    { name: 'seo', title: 'SEO', type: 'seoMeta' },
    { name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false },
    { name: 'order', title: 'Display Order', type: 'number' }
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'niche', media: 'heroImage' }
  }
}
```

## documents/service.js
```javascript
export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    { name: 'title', title: 'Service Name', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'price', title: 'Price', type: 'number' },
    { name: 'priceLabel', title: 'Price Label', type: 'string', description: 'e.g. "Starting from" or "One-time"' },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    { name: 'outcomes', title: 'Outcome Bullets', type: 'array', of: [{ type: 'string' }] },
    { name: 'deliveryDays', title: 'Delivery Timeline', type: 'string', description: 'e.g. "48 hours" or "3 weeks"' },
    { name: 'featured', title: 'Featured Package', type: 'boolean', initialValue: false },
    { name: 'order', title: 'Display Order', type: 'number' }
  ],
  preview: {
    select: { title: 'title', subtitle: 'priceLabel' }
  }
}
```

## documents/testimonial.js
```javascript
export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: Rule => Rule.required() },
    { name: 'authorName', title: 'Author Name', type: 'string', validation: Rule => Rule.required() },
    { name: 'authorTitle', title: 'Author Title / Role', type: 'string' },
    { name: 'company', title: 'Company Name', type: 'string' },
    { name: 'photo', title: 'Author Photo', type: 'image', options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }]
    },
    { name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url', description: 'For verification badge' },
    { name: 'niche', title: 'Niche', type: 'string',
      options: { list: ['kitchen', 'theater', 'closet', 'bathroom', 'windows'] }
    },
    { name: 'featured', title: 'Show on Homepage', type: 'boolean', initialValue: false }
  ],
  preview: {
    select: { title: 'authorName', subtitle: 'company', media: 'photo' }
  }
}
```

## documents/faq.js
```javascript
export default {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    { name: 'question', title: 'Question', type: 'string', validation: Rule => Rule.required() },
    { name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: Rule => Rule.required() },
    { name: 'category', title: 'Category', type: 'string',
      options: { list: ['General', 'Pricing', 'Process', 'Technical', 'Niche-specific'] }
    },
    { name: 'order', title: 'Display Order', type: 'number' }
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'question', subtitle: 'category' } }
}
```

## documents/serviceArea.js
```javascript
export default {
  name: 'serviceArea',
  title: 'Service Area',
  type: 'document',
  fields: [
    { name: 'city', title: 'City', type: 'string', validation: Rule => Rule.required() },
    { name: 'region', title: 'State / County', type: 'string' },
    { name: 'country', title: 'Country', type: 'string',
      options: { list: [{ title: 'United States', value: 'US' }, { title: 'United Kingdom', value: 'GB' }] },
      validation: Rule => Rule.required()
    },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'city' } },
    { name: 'niche', title: 'Primary Niche', type: 'string',
      options: { list: ['kitchen', 'theater', 'closet', 'bathroom', 'windows', 'all'] }
    },
    { name: 'headline', title: 'Page Headline', type: 'string' },
    { name: 'body', title: 'Page Body', type: 'text', rows: 6 },
    { name: 'seo', title: 'SEO', type: 'seoMeta' }
  ],
  preview: {
    select: { title: 'city', subtitle: 'country' }
  }
}
```

## documents/page.js
```javascript
export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    { name: 'title', title: 'Page Title', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: Rule => Rule.required() },
    { name: 'body', title: 'Body Content', type: 'array',
      of: [{ type: 'block' }],
      description: 'Used for Privacy Policy, Terms of Service, and other static pages'
    },
    { name: 'seo', title: 'SEO', type: 'seoMeta' }
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' }
  }
}
```

## objects/seoMeta.js
```javascript
export default {
  name: 'seoMeta',
  title: 'SEO Metadata',
  type: 'object',
  fields: [
    { name: 'title', title: 'Meta Title', type: 'string',
      validation: Rule => Rule.max(60).warning('Should be under 60 characters') },
    { name: 'description', title: 'Meta Description', type: 'text', rows: 2,
      validation: Rule => Rule.max(160).warning('Should be under 160 characters') },
    { name: 'ogImage', title: 'OG Image', type: 'image',
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }] }
  ]
}
```

## GROQ queries for frontend

### Fetch all featured projects
```javascript
const FEATURED_PROJECTS = `*[_type == "project" && featured == true] | order(order asc) {
  _id,
  title,
  slug,
  niche,
  "heroImageUrl": heroImage.asset->url,
  "heroImageAlt": heroImage.alt,
  description,
  completionYear,
  location
}`
```

### Fetch single project by slug
```javascript
const PROJECT_BY_SLUG = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  niche,
  "heroImageUrl": heroImage.asset->url + "?w=1200&auto=format&q=45",
  "galleryImages": gallery[].{
    "url": asset->url + "?w=800&auto=format&q=45",
    "alt": alt
  },
  description,
  testimonial->{quote, authorName, company},
  seo
}`
```

### Fetch all testimonials
```javascript
const TESTIMONIALS = `*[_type == "testimonial" && featured == true] | order(_createdAt desc) {
  _id, quote, authorName, authorTitle, company,
  "photoUrl": photo.asset->url,
  linkedinUrl, niche
}`
```

## Sanity image URL helper
```javascript
// Use Sanity's image pipeline — converts to AVIF at quality 45
function sanityImage(baseUrl, width = 800) {
  return `${baseUrl}?w=${width}&auto=format&q=45&fit=crop`
}
```

## Wiring GROQ queries to frontend HTML — Required Pattern
Every CMS fetch must use optional chaining. Never assume data exists.
```javascript
// In app.js or the relevant section's JS file:
import { createClient } from 'https://esm.sh/@sanity/client';

const sanity = createClient({
  projectId: 'YOUR_PROJECT_ID', // replace with actual — do not use process.env in browser JS
  dataset: 'production',
  apiVersion: '2024-05-03',
  useCdn: true
});

// Example: load featured projects into the niches section
async function loadProjects() {
  const projects = await sanity.fetch(FEATURED_PROJECTS);

  projects?.forEach(project => {
    const card = document.querySelector(`.niche-card[data-niche="${project?.niche}"]`);
    if (!card) return;
    const img = card.querySelector('.niche-card__media img');
    const title = card.querySelector('.niche-card__title');
    const desc = card.querySelector('.niche-card__desc');
    if (img) {
      img.src = sanityImage(project?.heroImageUrl ?? '/assets/img/placeholder.svg');
      img.alt = project?.heroImageAlt ?? project?.title ?? '';
    }
    if (title) title.textContent = project?.title ?? '';
    if (desc) desc.textContent = project?.description ?? '';
  });
}

loadProjects().catch(err => console.error('CMS load failed:', err));
```

NOTE: In plain HTML projects without a bundler, import the Sanity client via esm.sh as shown above. Do not use process.env in browser-side JS — env vars are server-side only (Vercel serverless functions in /api/).

## Client-friendly CMS notes
Make the Sanity Studio easy for non-technical home improvement owners:
- Use descriptive field titles not technical names
- Add description helper text to every non-obvious field
- Use initialValue where sensible (featured: false)
- Keep document types to minimum — only what the client actually edits

## Defensive Rendering — CRITICAL
```javascript
// WRONG — will crash if heroImage is deleted
const imgUrl = data.heroImage.asset.url;

// CORRECT — shows placeholder if deleted
const imgUrl = data?.heroImage?.asset?.url ?? '/assets/img/placeholder.svg';
const title = data?.title ?? 'Untitled Project';
const desc = data?.description ?? '';
```

SVG placeholder for missing images:
```html
<svg class="img-placeholder" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="400" fill="#111113"/>
  <text x="50%" y="50%" text-anchor="middle" fill="#A7A195" font-size="14" font-family="sans-serif">
    Image coming soon
  </text>
</svg>
```

## Sanity API Config
```javascript
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID, // server-side only (Vercel functions)
  dataset: 'production',
  apiVersion: '2024-05-03', // pin this version — never omit
  useCdn: true,
});
```

## CORS Requirement
Add your Vercel production URL to Sanity project CORS origins:
https://www.sanity.io/manage → project → API → CORS Origins → Add https://zolcuz.com
Without this, API calls from your live domain will be blocked.

## Exit check
All schema files defined AND exported in index.js (including serviceArea.js and page.js)? Alt text required on all images? GROQ queries include image URL transformation? Sanity client initialized with projectId and dataset? Browser-side code uses esm.sh import (not process.env)? All CMS data access uses optional chaining and nullish coalescing?
