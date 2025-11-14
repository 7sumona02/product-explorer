Product Explorer

A minimal, clean product browsing application built with Next.js, shadcn/ui, and Zod validation.
Browse products, view full details, switch gallery images, read reviews, and add items to cart.

🚀 Getting Started
Install Dependencies
npm install

Run Development Server
npm run dev


App will start on: http://localhost:3000

Build for Production
npm run build
npm start

Design Decisions
Minimal, whitespace-driven UI

Followed a minimal design approach.

Used ample whitespace to draw attention to the product content.

Intentionally kept distractions low to maintain a clean storefront feel.

Inspired by Nykaa & Amazon

Product details page takes inspiration from:

Nykaa → clean image gallery, structured information blocks

Amazon → review layout, section-based details, price + rating hierarchy

Details are presented in a systematic, scannable layout:

Clear image gallery with selectable thumbnails

Highlighted price + rating

Structured info rows for brand, category, MOQ

Dashed boxes for warranty, shipping, availability

Review cards aligned like e-commerce sites

UI Library — shadcn/ui

Used shadcn components for:

Buttons

InputGroup (search bar)

Loaders

Layout consistency

All components are accessible, theme-friendly, and easy to extend.

API Validation — Zod

Every API response is parsed using Zod before being used in UI.

Prevents runtime crashes due to malformed API data.

Ensures typed, trusted data flows through components.

Libraries Used
Framework	Next.js (App Router)
UI components	shadcn/ui
Icons	lucide-react
Validation	Zod
State	React useState (simple cart)
API Validation Details
Where Schema Lives

/lib/schemas/product.ts

How It Works
const parsed = productSchema.safeParse(data);

if (!parsed.success) {
  console.error("Invalid API response:", parsed.error);
  setError("The product data returned from server is invalid.");
  return;
}

setProduct(parsed.data);

Why Zod?

Catches undefined/missing fields

Prevents UI from breaking

Ensures only clean & expected data is rendered

Provides typed safety throughout the component tree

Security & Sanitization

Avoided dangerouslySetInnerHTML entirely.

All API strings are treated as untrusted.

Future HTML-based content must be sanitized before rendering.

Cart Functionality

Simple “Add to Cart” button on product detail page

Stores selected product in a local cart state (expandable later)

Can be extended to global store (Zustand/Redux) if needed

Trade-offs & Remaining Work

Cart not persisted to localStorage (kept simple)

No global state management

No pagination or infinite scroll

Error UI is basic but functional

Currently all fetching is client-side

These choices helped keep the project lightweight and easy to review.

Demo

Add soon:

Live Deployment (Vercel)

20-second demo video or GIF
