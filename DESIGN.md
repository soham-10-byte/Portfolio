# Design System: Soham Sen Portfolio

## 1. Visual Theme & Atmosphere

A dark, editorial portfolio for a builder who works across product engineering and growth. Keep the canvas calm and tactile, with clear typographic hierarchy, generous breathing room, and a restrained sage accent. Density is 4/10, layout variance 7/10, and motion 3/10: each page should feel considered and lively without making the interface compete with the work.

## 2. Color Palette & Roles

- **Forest Canvas** (`#111715`) — page background and deepest surface.
- **Pine Surface** (`#1B2420`) — navigation, cards, and raised content.
- **Moss Layer** (`#29342E`) — secondary panels, tags, hover fills, and decorative depth.
- **Stone Border** (`#3D4B42`) — quiet dividers and control outlines.
- **Sage Accent** (`#B5C4B4`) — secondary copy, selected states, and restrained emphasis.
- **Soft Chalk** (`#F2F1E9`) — primary copy, headlines, and high contrast actions.
- **Pale Sage** (`#D0D8CE`) — supporting body copy and metadata that needs stronger contrast.

Use one accent family throughout. Keep body copy at readable contrast against Forest Canvas; reserve lower opacity for decorative labels only. Avoid luminous text, neon gradients, and pure black.

## 3. Typography Rules

- **Display:** Space Grotesk, 600–700. Use tight tracking and a controlled fluid scale; emphasize through weight and Soft Chalk rather than all caps or oversized type.
- **Body:** DM Sans, 400–600. Use relaxed 1.65–1.75 leading and keep long-form copy near 65 characters per line.
- **Mono:** System monospace for code, figures, and compact metadata only.
- Keep paragraphs sentence case. Uppercase is for short labels and navigation only.
- Prefer clear sizes and color hierarchy over repeated bolding. Avoid decorative type where it harms legibility.

## 4. Component Stylings

- **Buttons:** Soft Chalk fill with Forest Canvas text for the primary action. Secondary actions use a quiet border and Sage Accent text. Provide a clear focus outline, a minimum 44px touch target, and a brief transform-based press response. No outer glow.
- **Cards:** Pine Surface with a subtle Stone Border. Use rounded corners sparingly and elevation only where it explains hierarchy. Prefer dividers and open space in dense project lists.
- **Navigation:** Keep labels compact and readable, with a distinct active state and an uncluttered mobile drawer.
- **Inputs:** Persistent label above the field, visible focus treatment, and clear error text below.
- **Loading:** Use a brief, single-layer progress rail and clear status text. Keep progress updates infrequent, release scroll locks on every exit path, and honor reduced-motion preferences. Avoid spinner loops and multiple competing loaders.
- **Empty and error states:** Explain the state plainly and offer a useful next step.

## 5. Layout Principles

Use a centered content container around 1320px with an editorial, left-led hierarchy and intentional asymmetry. Preserve generous section spacing and a readable text measure. Collapse multi-column layouts to a single column below 768px; keep all content inside the viewport and controls comfortable to tap. Avoid equal three-column feature grids and overlapping text or imagery.

## 6. Motion & Interaction

Motion should clarify state and add quiet polish. Favor short ease-out transitions on opacity and transform; keep ambient motion slow and sparse. Respect reduced-motion preferences in CSS and JavaScript. Keep the Three.js hero optional with a lightweight static fallback, and avoid per-frame React state updates, layout animation, and multiple effects moving the same element.

## 7. Anti-Patterns (Banned)

- No Inter, pure black, neon, purple/blue glow treatments, or large gradient headlines.
- No all-caps body copy or generic decorative serif fonts.
- No excessive shadows, glass blur on every surface, or low-contrast secondary text.
- No overlapping content, horizontal overflow, or equal three-column card rows.
- No spinner stacks, unbounded loading states, or animation that ignores reduced-motion settings.
- No filler prompts, fake metrics, placeholder brand names, or broken image links.

## Steelam Furniture Case Study

Use the supplied Steelam homepage capture as the case-study lead visual. Preserve its clean white masthead, red brand accents, and furniture photography inside the screenshot; frame it with the portfolio's dark forest surfaces and a fine stone border. Keep the preview in its own wide media region above the case-study details, with a clear external-site action. The image should scale with top alignment, remain legible on mobile, and use only a small hover transform.

## Maxli Perfumes Case Study

Use official Maxli by Laxmi product photography from `maxlionline.com` for the Maxli preview and case-study gallery. Let the warm bottle image provide the visual contrast against the forest canvas; preserve the original image color and crop without adding filters or artificial glow. Keep the image in a dedicated wide media region, maintain a clear link to the official Maxli site, and lazy-load gallery images so the portfolio remains responsive.
