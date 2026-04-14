# Air Quality Dashboard Design Brainstorm

## Design Approach Selected: **Environmental Minimalism with Data Hierarchy**

### Design Movement
**Scandinavian Functionalism meets Environmental Design** – Clean, purposeful aesthetics inspired by Nordic design principles combined with environmental consciousness. The interface prioritizes data clarity while maintaining a warm, approachable feel that reflects environmental stewardship.

### Core Principles
1. **Data-First Clarity** – Every visual element serves information hierarchy; no decorative elements without purpose
2. **Environmental Warmth** – Soft, natural color palette that evokes nature and sustainability rather than cold tech
3. **Progressive Disclosure** – Complex data revealed through interactive layers, never overwhelming the user
4. **Accessible Sophistication** – Professional appearance achievable through careful spacing, typography, and subtle depth

### Color Philosophy
- **Primary Palette**: Sage green (`#6B9E7F`), sky blue (`#4A90E2`), warm cream (`#F8F6F1`)
- **Accent Colors**: Amber warning (`#E8A547`), coral alert (`#E85D4E`), success green (`#52B788`)
- **Reasoning**: The palette evokes environmental consciousness (sage, sky) while maintaining professional credibility. Warm cream background reduces eye strain during extended monitoring sessions. Accent colors follow environmental convention (green=good, red=alert).
- **Emotional Intent**: Trust, sustainability, clarity, and gentle urgency

### Layout Paradigm
- **Asymmetric Grid System** – Left sidebar for navigation/filters, main content area with staggered card layouts
- **Breathing Room** – 24px base spacing unit; cards use 16px internal padding
- **Vertical Rhythm** – Content flows naturally downward with strategic whitespace breaks
- **Avoid**: Centered layouts, uniform grid, equal-sized cards

### Signature Elements
1. **Soft Rounded Cards** (12px border-radius) – Approachable, modern, reduces visual harshness
2. **Subtle Gradient Accents** – Soft gradients on chart backgrounds and alert cards (never harsh)
3. **Environmental Icons** – Leaf, wind, droplet motifs integrated into data visualization

### Interaction Philosophy
- **Smooth Transitions** – 300ms ease-in-out for all interactive states
- **Hover Elevation** – Cards lift slightly (2-4px shadow increase) on hover
- **Micro-interactions** – Subtle scale/opacity changes on button clicks, smooth number animations
- **Feedback** – Toast notifications for predictions, visual state changes for alerts

### Animation Guidelines
- **Entrance**: Fade-in + subtle slide-up (200ms) for cards on page load
- **Data Updates**: Smooth number transitions (1s) for real-time value changes
- **Chart Animations**: Smooth line drawing on chart initialization (800ms)
- **Hover States**: 150ms scale (1.02x) on interactive elements
- **Avoid**: Bouncy easing, rapid flashing, attention-seeking animations

### Typography System
- **Display Font**: "Plus Jakarta Sans" (bold, 700) for dashboard title and section headers – modern, distinctive
- **Heading Font**: "Plus Jakarta Sans" (600) for card titles and metric labels – maintains consistency
- **Body Font**: "Inter" (400-500) for descriptions, values, and body text – highly readable
- **Hierarchy**:
  - Dashboard Title: 32px, 700, Plus Jakarta Sans
  - Section Headers: 20px, 600, Plus Jakarta Sans
  - Card Titles: 16px, 600, Plus Jakarta Sans
  - Metric Values: 28px, 700, Inter (for large numbers)
  - Body Text: 14px, 400, Inter
  - Labels: 12px, 500, Inter (uppercase, +0.5px letter-spacing)

---

## Implementation Notes
- Use CSS variables for color consistency
- Implement dark mode by inverting luminosity (cream → dark slate, sage → lighter sage)
- All shadows use `rgba(0,0,0,0.08)` for consistency
- Spacing follows 4px grid (4, 8, 12, 16, 24, 32, 48px)
- Border radius: 12px for cards, 8px for inputs, 24px for badges
