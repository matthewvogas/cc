This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy

## Environment Variables

The following environment variables are used in this project:

- `DATABASE_URL`: The URL of the PostgreSQL database.
- `NEXTAUTH_SECRET`: The secret used by NextAuth.js for signing cookies and tokens.
- `BUSINESS_ID`: The ID of the Facebook Business Manager account.
- `BUSINESS_TOKEN`: The access token for the Facebook Business Manager account.
- `BUSINESS_SOPHIA`: The ID of the Facebook Business Manager account for Sophia.
- `BUSINESS_TOKEN_SOPHIA`: The access token for the Facebook Business Manager account for Sophia.
- `GITHUB_CLIENT_ID`: The client ID of the GitHub OAuth app.
- `GITHUB_CLIENT_SECRET`: The client secret of the GitHub OAuth app.
- `NEXT_PUBLIC_URL`: The public URL of the Next.js app.
- `NEXTAUTH_URL`: The URL of the NextAuth.js server.
- `FACEBOOK_CLIENT_ID`: The client ID of the Facebook OAuth app.
- `FACEBOOK_CLIENT_SECRET`: The client secret of the Facebook OAuth app.
- `INSTAGRAM_CLIENT_ID`: The client ID of the Instagram Basic Display API app.
- `INSTAGRAM_CLIENT_SECRET`: The client secret of the Instagram Basic Display API app.

First, run the development server:

```bash
npm run build

npm run start
```

You can set these environment variables in a `.env` file in the root directory of the project. See the [Deploy](#deploy) section for more information.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
