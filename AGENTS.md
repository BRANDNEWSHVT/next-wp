# PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-28
**Commit:** 386de53
**Branch:** main

## OVERVIEW

Faust.js headless WordPress frontend. Next.js 16 App Router + React 19 + Apollo Client 3.

## STRUCTURE

```
faust/
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root layout with ApolloWrapper
│   │   └── [[...slug]]/       # Catch-all WordPress route
│   │       └── page.tsx       # RSC with template resolution
│   ├── lib/                   # Apollo client setup
│   │   ├── apollo-client.ts   # Server-side client
│   │   ├── apollo-wrapper.tsx # Client-side provider
│   │   └── queries.ts         # GraphQL queries
│   ├── wp-templates/          # WordPress template components
│   │   ├── front-page.tsx     # Homepage
│   │   ├── page.tsx           # Static pages
│   │   ├── single.tsx         # Single posts
│   │   └── archive.tsx        # Archives/categories
│   ├── components/            # Shared components
│   ├── __generated__/         # GraphQL codegen output (DO NOT EDIT)
│   ├── fragments/             # GraphQL fragments
│   ├── queries/               # GraphQL queries (legacy)
│   └── styles/                # CSS modules
├── faust.config.js            # Faust configuration
├── codegen.ts                 # GraphQL codegen config
└── next.config.js             # Next.js config (withFaust wrapper)
```

## WHERE TO LOOK

| Task                    | Location                       | Notes                               |
| ----------------------- | ------------------------------ | ----------------------------------- |
| Add new template        | `src/wp-templates/`            | Client component with props         |
| Modify routing logic    | `src/app/[[...slug]]/page.tsx` | RSC, fetches data server-side       |
| Change layout/providers | `src/app/layout.tsx`           | ApolloWrapper wraps children        |
| Add GraphQL query       | `src/lib/queries.ts`           | Or run `npm run generate` for types |
| Add component           | `src/components/`              | Add 'use client' if using hooks     |
| Change WP endpoint      | `faust.config.js` + env vars   | NEXT_PUBLIC_WORDPRESS_URL           |

## APP ROUTER ARCHITECTURE

### Server Component (RSC) Flow

```
app/[[...slug]]/page.tsx (RSC)
  ├── getClient() → fetches data server-side
  ├── Resolves WordPress node type
  └── Renders appropriate client template with props
```

### Template Pattern

Templates are client components that receive pre-fetched data:

```tsx
// src/wp-templates/page.tsx
"use client";
export default function PageTemplate({ node, siteData, menuData }) { ... }
```

| Template          | WordPress Type | File           |
| ----------------- | -------------- | -------------- |
| FrontPageTemplate | Homepage       | front-page.tsx |
| PageTemplate      | Page           | page.tsx       |
| SingleTemplate    | Post           | single.tsx     |
| ArchiveTemplate   | Category/Tag   | archive.tsx    |

## CONVENTIONS

- **GraphQL**: Server-side queries use `getClient()` from `@/lib/apollo-client`
- **Client components**: Must have `"use client"` directive
- **Types**: Shared types exported from `front-page.tsx` (SiteData, MenuData)
- **Path aliases**: `@/*` maps to `./src/*`
- **Trailing slashes**: Enabled in next.config.js

## ANTI-PATTERNS (THIS PROJECT)

- **DO NOT** manually edit `src/__generated__/` - regenerated on build
- **DO NOT** use useQuery in RSC page.tsx - fetch server-side with getClient()
- **DO NOT** import faust.config in App Router files - config loaded at build
- **DO NOT** add templates without updating the switch in [[...slug]]/page.tsx

## COMMANDS

```bash
npm run dev        # Dev server + codegen watch
npm run generate   # One-time GraphQL codegen
npm run build      # Production build
npm run codegen    # Explicit codegen run
```

## NOTES

- WordPress backend: `faustexample.wpengine.com`
- Faust API routes (preview, auth) not migrated - need manual implementation
- Apollo Client 3 used due to @faustwp/core compatibility
- possibleTypes.json required for Apollo cache (generated)
