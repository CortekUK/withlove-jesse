# Withlove, Jesse

Production-ready full-stack ecommerce for personalised greeting cards. Fully manageable from the admin panel.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** SQLite (dev) / PostgreSQL (production) + Prisma
- **Auth:** NextAuth (credentials)
- **Uploads:** Local `public/uploads` (swap for S3/Cloudinary in production)

## Setup

### 1. Prerequisites

- Node.js 18+

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

```bash
cp .env.example .env
```

Required:

- `DATABASE_URL` – SQLite: `file:./dev.db` (default) or PostgreSQL for production
- `NEXTAUTH_URL` – e.g. `http://localhost:3000`
- `NEXTAUTH_SECRET` – `openssl rand -base64 32`

Optional (seed): `ADMIN_EMAIL`, `ADMIN_PASSWORD`

### 4. Database

```bash
npm run db:push
npm run db:seed
```

### 5. Run

```bash
npm run dev
```

- **Storefront:** http://localhost:3000
- **Admin:** http://localhost:3000/admin (`admin@withlovejesse.com` / `ChangeMe123!`)

## Admin (fully functional)

- **Dashboard** – Overview and quick actions
- **Products** – CRUD, image upload, SEO, personalisation
- **Categories** – CRUD, active toggle
- **Seasonal Campaigns** – CRUD, banner image, dates
- **Promotions** – CRUD, discount codes, banners
- **Content Blocks** – Hero, delivery/returns pages, site copy
- **FAQ** – CRUD
- **Navigation** – Header/footer links
- **Site Settings** – Contact, shipping, announcement
- **Orders** – List and detail view
- **Media** – Upload PNG, JPG, PDF (product images, banners)

## Uploads

Files are stored in `public/uploads/`. Supported: PNG, JPEG, PDF. Max 10MB.

For production, replace the upload handler with S3, Cloudinary, or similar and store URLs in the database.

## Deployment

1. **Database:** Use PostgreSQL (Supabase, Neon, Vercel Postgres). Update `DATABASE_URL`.
2. **Auth:** Set strong `NEXTAUTH_SECRET`.
3. **Payments:** Add Stripe and wire checkout.
4. **Uploads:** Configure cloud storage; update `/api/admin/media/upload`.

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start dev server         |
| `npm run build`| Build for production     |
| `npm run start`| Start production server  |
| `npm run db:push` | Push schema to DB    |
| `npm run db:seed` | Seed demo data       |
| `npm run db:studio` | Prisma Studio       |
