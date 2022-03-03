# Accords-library.com

## Technologies

#### [Back](https://github.com/Accords-Library/strapi.accords-library.com)

- CMS: Stapi
  - GraphQL endpoint
  - Multilanguage support
  - Markdown format for the rich text fields

#### [Front](https://github.com/Accords-Library/accords-library.com) (this repository)

- Language: [TypeScript](https://www.typescriptlang.org/)
- Queries: [GraphQL](https://graphql.org/)
  - [GraphQL Code Generator](https://www.graphql-code-generator.com/) to automatically generated types for the operations variables and responses
  - The operations are stored in a graphql file and then retrieved and wrap as an actual TypeScript function
- Markdown: [markdown-to-jsx](https://www.npmjs.com/package/markdown-to-jsx)
  - Support for Arbitrary React Components and Component Props!
- Styling: [Tailwind CSS](https://tailwindcss.com/)
  - Good typographic defaults using [Tailwind/Typography](https://tailwindcss.com/docs/typography-plugin)
  - Beside the theme declaration no CSS outside of Tailwind CSS
  - Manually added support for scrollbar styling
  - Support for [Material Icons](https://fonts.google.com/icons)
  - Support for light and dark mode with a manual switch and system's selected theme by default
  - Support for creating any arbitrary theming mode by swapping CSS variables
- Framework: [Next.js](https://nextjs.org/) (React)
  - Multilanguage support
- State Management: [React Context](https://reactjs.org/docs/context.html)
  - Persistent app state using LocalStorage
- Support for many screen sizes and resolutions
- Data quality testing
  - Data from the CMS is subject to a battery of tests (about 20 warning types and 40 error types) at build time
  - Each warning/error comes with a front-end link to the incriminating element, as well as a link to the CMS to fix it.
  - Check for completeness, conformity, and integrity

## Installation

```bash
git clone https://github.com/Accords-Library/accords-library.com.git
cd accords-library.com
npm install
```

Create a env file:

```bash
nano .env.local
```

Enter the followind information:

```txt
URL_GRAPHQL=https://url-to.strapi-accords-library.com/graphql
ACCESS_TOKEN=genatedcode-by-strapi-api
NEXT_PUBLIC_URL_CMS=https://url-to.strapi-accords-library.com/
NEXT_PUBLIC_URL_IMG=https://url-to.img-accords-library.com/
NEXT_PUBLIC_URL_SELF=https://url-to-front-accords-library.com
```

Run in dev mode:

```bash
./run_accords_dev.sh
```

OR build and run in production mode

```bash
./run_accords_build.sh
./run_accords_prod.sh
```
