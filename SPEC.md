# Matcha Log — Specification

## 1. Project Overview

- **Type**: Single-page React application
- **Core functionality**: A personal matcha tin tracker where users log matcha varieties with name and rating, displayed in a sortable list
- **Target users**: Matcha enthusiasts who want to catalog their collection

## 2. Visual & Rendering Specification

### Scene Setup
- Single page layout with header, form section, and list section
- No 3D rendering — standard DOM with GSAP animations

### Visual Style
- **Theme**: Japanese-inspired minimalism with matcha green accents
- **Color palette**:
  - Background: `#FAFAF5` (warm off-white, like matcha paper)
  - Primary: `#7C9A5E` (matcha green)
  - Secondary: `#4A5D3E` (deep matcha)
  - Accent: `#D4A574` (ceramic/warm accent)
  - Text: `#2D2D2D` (soft black)
  - Muted: `#9B9B8B` (stone gray)
- **Typography**: "Noto Serif JP" for headings, system sans-serif for body

### Animations (GSAP)
- List items: stagger fade-in + slide-up on add
- Sort transitions: smooth reorder with GSAP
- Form submit: subtle scale pulse feedback
- Hover effects: gentle lift on list items

## 3. Interaction Specification

### User Controls
- **Add form**: Text input for name, number input (1-5, step 0.5) for rating, submit button
- **Sort**: Click column headers to sort by name (A-Z/Z-A) or rating (low-high/high-low)
- **Delete**: Each item has a delete button (trash icon)
- **Persistence**: LocalStorage for data persistence

### Data Model
```typescript
interface MatchaTin {
  id: string;
  name: string;
  rating: number; // 1-5, allows 0.5 increments
  createdAt: number;
}
```

### Sort States
- By name: ascending → descending (toggle)
- By rating: ascending → descending (toggle)

## 4. Acceptance Criteria

- [x] User can add a matcha tin with name and rating
- [x] Rating input validates 1-5 range with 0.5 steps
- [x] List displays all added tins
- [x] Clicking "Name" header sorts alphabetically
- [x] Clicking "Rating" header sorts numerically
- [x] Sort direction toggles on repeated clicks
- [x] GSAP animates items on add
- [x] GSAP animates items on sort reorder
- [x] Data persists across page refresh (localStorage)
- [x] Delete button removes item with animation
- [x] Empty state message when no items exist
