# Product Explorer

A minimal, clean product browsing application built with Next.js, shadcn/ui, and Zod validation.
Browse products, view full details, switch gallery images, read reviews, and add items to cart.

## Installation

Install Dependencies

```bash
npm install
```

Start Dev Server

```bash
npm run dev
```

Build for Production

```bash
npm run build
npm start
```

## Design Decisions

Followed a minimal design approach.

Used ample whitespace to draw attention to the product content.

Intentionally kept distractions low to maintain a clean storefront feel.

Inspired by Nykaa & Amazon

### Product details page takes inspiration from:

Nykaa: clean image gallery, structured information blocks

Amazon: review layout, section-based details, price + rating hierarchy

Details are presented in a systematic, scannable layout:

Clear image gallery with selectable thumbnails

Highlighted price + rating

Structured info rows for brand, category, MOQ

Dashed boxes for warranty, shipping, availability

Review cards aligned like e-commerce sites

### Libraries Used

#### UI Library - shadcn/ui

Used shadcn components for layout consistency.

All components are accessible, theme-friendly, and easy to extend.

#### API Validation - Zod

Every API response is parsed using Zod before being used in UI.

Prevents runtime crashes due to malformed API data.

Ensures typed, trusted data flows through components.

#### Lucide icons

## API Validation Details
Where Schema Lives

```bash
/lib/schemas/product.ts
```

How It Works
```bash
const parsed = productSchema.safeParse(data);

if (!parsed.success) {
  console.error("Invalid API response:", parsed.error);
  setError("The product data returned from server is invalid.");
  return;
}

setProduct(parsed.data);
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
