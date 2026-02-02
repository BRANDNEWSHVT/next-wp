![Faust.js Logo](./.github/assets/faustjs-logo.svg) 

# Faust.js Starter Kit

This repository contains a starter kit to get you up and running quickly on [WP Engine's Headless Platform](https://wpengine.com/headless-wordpress/) with a WordPress site skeleton for more advanced developers.

## For more information

To get started on WP Engine's Platform please follow the docs here [https://developers.wpengine.com/docs/atlas/getting-started/create-app/](https://developers.wpengine.com/docs/atlas/getting-started/create-app/)

## WordPress Setup

### Required Plugins

Install and activate the following plugins on your WordPress site:

1. **[WPGraphQL](https://wordpress.org/plugins/wp-graphql/)** - Exposes WordPress data through a GraphQL API
2. **[Faust.js](https://wordpress.org/plugins/faustwp/)** - Enables headless WordPress features and previews
3. **[WPGraphQL Content Blocks](https://github.com/wpengine/wp-graphql-content-blocks)** - Exposes Gutenberg blocks via GraphQL (optional)

### Plugin Configuration

#### Faust.js Plugin Settings

1. Navigate to **Settings → Faust** in your WordPress admin
2. Configure the following:
   - **Front-end site URL**: Your Next.js application URL (e.g., `http://localhost:3000` for development)
   - **Secret Key**: Generate a secret key and copy it for your `.env.local` file

#### WPGraphQL Settings

1. Navigate to **GraphQL → Settings**
2. Enable **Public Introspection** (for development)
3. Set **GraphQL Endpoint** (default: `/graphql`)

### Menu Setup

Create the following menus in **Appearance → Menus**:

1. **Primary Menu**: Assign to the "Primary" location
2. **Footer Menu**: Assign to the "Footer" location

### Environment Variables

Create a `.env.local` file in your project root:

```bash
# Your WordPress site URL (without trailing slash)
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com

# Faust.js secret key from WordPress admin (Settings → Faust)
FAUST_SECRET_KEY=your-secret-key-here
```

## Project Structure

```
├── src/
│   ├── __generated__/     # Auto-generated GraphQL types
│   ├── app/               # Next.js App Router pages
│   │   ├── api/           # API routes
│   │   ├── error.tsx      # Error page
│   │   ├── loading.tsx    # Loading state
│   │   ├── not-found.tsx  # 404 page
│   │   └── layout.tsx     # Root layout
│   ├── components/        # React components
│   │   ├── ErrorBoundary.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── PageTransition.tsx
│   ├── lib/               # Utility functions
│   │   ├── apollo-client.ts
│   │   ├── queries.ts
│   │   ├── rate-limit.ts
│   │   └── sanitize.ts
│   ├── styles/            # Global styles
│   └── wp-templates/      # WordPress template components
│       ├── archive.tsx
│       ├── front-page.tsx
│       ├── page.tsx
│       └── single.tsx
├── codegen.ts             # GraphQL codegen config
├── faust.config.js        # Faust.js configuration
├── next.config.js         # Next.js configuration
├── package.json
├── possibleTypes.json
└── tsconfig.json
```

## Available Commands

| Command         | Script                                                                 | Description                        |
| --------------- | ---------------------------------------------------------------------- | ---------------------------------- |
| `dev`           | `npm run generate && concurrently "faust dev" "npm run watch-codegen"` | Start dev server and watch codegen |
| `build`         | `faust build`                                                          | Build the project for production   |
| `generate`      | `faust generatePossibleTypes`                                          | Generate GraphQL possible types    |
| `start`         | `faust start`                                                          | Start the production server        |
| `codegen`       | `graphql-codegen`                                                      | Run GraphQL code generation        |
| `watch-codegen` | `graphql-codegen -w`                                                   | Watch and auto-run GraphQL codegen |
| `format`        | `prettier . --write`                                                   | Format code with Prettier          |
| `test:format`   | `prettier . --check`                                                   | Check code formatting              |

## Features

- **Next.js 16** with App Router
- **TypeScript** with strict mode enabled
- **GSAP** page transitions
- **HTML Sanitization** with DOMPurify for XSS protection
- **Rate Limiting** on API routes
- **Error Boundaries** for graceful error handling
- **SEO Optimized** with meta tags, Open Graph, and JSON-LD
- **Accessible** with proper ARIA labels and keyboard navigation

## Plugin Ecosystem 🪄

- [Faust.js](https://faustjs.org)
- [HWP Toolkit](https://github.com/wpengine/hwptoolkit)
- [WPGraphQL](https://www.wpgraphql.com)
- [WPGraphQL Content Blocks](https://github.com/wpengine/wp-graphql-content-blocks)
- [WPGraphQL IDE](https://github.com/wp-graphql/wpgraphql-ide)
- [WP GraphQL ACF](https://github.com/wp-graphql/wp-graphql-acf)

## Documentation 🔎

> [!NOTE]
> We are continuously adding new docs for [Faustjs.org](https://faustjs.org/docs)

- [Faust.js Documentation](https://faustjs.org/docs/)
- [Headless Platform Documentation](https://wpengine.com/headless-wordpress/)
- [WPGraphQL Documentation](https://developers.wpengine.com/docs/atlas/overview/)
