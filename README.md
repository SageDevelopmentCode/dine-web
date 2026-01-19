# Dine Web

<img width="918" height="520" alt="image" src="https://github.com/user-attachments/assets/3b0b0f5a-a103-46b8-91d4-77b09a38d764" />

A web platform for managing and sharing food allergy profiles, enabling individuals, families, and restaurants to communicate critical dietary information safely and effectively.

## About

Dine Web is the public/private profile component of the Dine food allergy management ecosystem. It provides shareable web profiles for users and restaurants to communicate food allergy information, safety protocols, and dietary accommodations.

### Key Features

**For Individuals:**

<img width="480" height="764" alt="p3" src="https://github.com/user-attachments/assets/2e8f87de-3a6c-405a-a5b1-978e9481ac19" />


- Create and share personalized food allergy profiles
- Generate shareable emergency cards with critical allergy information
- Access travel phrases for communicating allergies in different languages
- Store and share EpiPen/medication details
- Public or private profile visibility options

**For Families:**
- Parent accounts to manage children's food allergy profiles
- Share profiles with schools, camps, and caregivers
- Centralized management of multiple family members' allergies

**For Restaurants:**

<img width="480" height="270" alt="Restaurant Profile" src="https://github.com/user-attachments/assets/44fa5699-dd4c-4834-b51d-4cb0b90f74f6" />


- Create detailed restaurant profiles showcasing allergy accommodations
- Share menu information and dietary options
- Document safety protocols and cross-contamination prevention measures
- Highlight cuisine types and specific allergens accommodated
- Build trust with allergy-conscious diners

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (assumed based on Next.js best practices)
- **Font Optimization:** [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) with [Geist](https://vercel.com/font)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Account Types

1. **Individual Accounts** - Personal food allergy profiles for sharing with restaurants, friends, and healthcare providers
2. **Family Accounts** - Parent-managed accounts for children with food allergies
3. **Restaurant Accounts** - Business profiles showcasing allergy accommodations and safety measures

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
