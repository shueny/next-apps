This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Tools and Languages

- **Framework**: [Next.js](https://nextjs.org/) - A React framework for building server-side rendered applications.
- **Package Manager**: [pnpm](https://pnpm.js.org/) - A fast, disk space-efficient package manager.
- **UI Library**: [Radix UI](https://www.radix-ui.com/) - A set of accessible UI components for building high-quality design systems and web applications.

## App Structure

The project structure is organized as follows:

```
├── src
│   ├── app
│   │   ├── layout.tsx          # Root layout for the application
│   │   └── page.tsx            # Main page component
│   ├── components
│   │   ├── header.tsx          # Navigation menu component
│   │   └── layout.tsx          # Layout component for wrapping pages
│   ├── pages
│   │   ├── _app.tsx            # Custom App component for Next.js
│   │   ├── index.tsx           # Home page component
│   │   └── quiz-card
│   │       ├── index.tsx       # Quiz card page component
│   │       ├── js-quiz.json    # JSON file containing JavaScript questions
│   │       └── react-quiz.json  # JSON file containing React questions
│   ├── styles
│   │   └── globals.css         # Global styles for the application
│   └── utils                   # Utility functions (if any)
├── public                       # Static assets (images, etc.)
├── tailwind.config.ts           # Tailwind CSS configuration
├── next.config.mjs              # Next.js configuration
├── package.json                 # Project dependencies and scripts
└── README.md                    # Project documentation
```

## Getting Started

First, run the development server:

```bash
pnpm run dev
# or
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
