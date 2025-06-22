# yeti-dashboard

## Starting the project

Open the [.env.example](/.env.example) and fill in your Prisma, Auth & Resend Configurations then save it as .env the run the following command:

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```
