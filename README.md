This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Requirements

- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org/)

## Instalation

git clone https://gitlab.com/go-labs/codecoco.git
cd codecoco
npm install

## Getting Started

First, run the development server:

```bash
npm run dev
```

For migrations on dev run:

```bash
npx prisma migrate reset
npx prisma migrate dev

```

To update the database when changes are made:

```bash
npx prisma db push
npx prisma migrate dev && npx prisma migrate reset
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

The following environment variables are used in this project:

- `DATABASE_URL` - The URL to your database.
- `NEXTAUTH_SECRET` - A secret used for NextAuth.js.
- `NEXTAUTH_URL` - The URL to your app.
- `GITHUB_CLIENT_ID` - Your GitHub OAuth app's client ID.
- `GITHUB_CLIENT_SECRET` - Your GitHub OAuth app's client secret.
- `FACEBOOK_CLIENT_ID` - Your Facebook OAuth app's client ID.
- `FACEBOOK_CLIENT_SECRET` - Your Facebook OAuth app's client secret.
- `FACEBOOK_GRAPH_VERSION` - Your Facebook Graph API version.
- `TIKTOK_CLIENT_KEY ` - Your TikTok OAuth app's client ID.
- `TIKTOK_CLIENT_SECRET` - Your TikTok OAuth app's client secret.
- `GOOGLE_CLIENT_ID` - Your Google OAuth app's client ID.
- `GOOGLE_CLIENT_SECRET` - Your Google OAuth app's client secret.
- `AWS_ACCESS_KEY_ID` - Your AWS access key ID.
- `AWS_SECRET_ACCESS_KEY` - Your AWS secret access key.
- `AWS_REGION` - The AWS region your bucket is in.
- `AWS_BUCKET_NAME` - The name of your AWS bucket.
- `BUSINESS_ID_DEWIN ` - The ID of your business on Dewin.
- `BUSINESS_TOKEN_DEWIN` - The token of your business on Dewin.
- `BUSINESS_ID_SOPHIA ` - The ID of your business on Sophia.
- `BUSINESS_TOKEN_SOPHIA` - The token of your business on Sophia.

Check for any migrations pending

Staging

```bash
npx prisma migrate reset
npx prisma migrate dev
```

```bash
npx prisma migrate deploy
```

Run this commands on the productions server

```bash
pm2 stop 0

npm run build

pm2 start 0
```

You can set these environment variables in a `.env` file in the root directory of the project. See the [Deploy](#deploy) section for more information.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
