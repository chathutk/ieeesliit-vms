---
name: Executive Slate
colors:
  surface: '#faf9fe'
  surface-dim: '#dad9df'
  surface-bright: '#faf9fe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f8'
  surface-container: '#eeedf3'
  surface-container-high: '#e9e7ed'
  surface-container-highest: '#e3e2e7'
  on-surface: '#1a1b1f'
  on-surface-variant: '#414755'
  inverse-surface: '#2f3034'
  inverse-on-surface: '#f1f0f5'
  outline: '#717786'
  outline-variant: '#c1c6d7'
  surface-tint: '#005bc1'
  primary: '#0058bc'
  on-primary: '#ffffff'
  primary-container: '#0070eb'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#4c4aca'
  on-secondary: '#ffffff'
  secondary-container: '#6664e4'
  on-secondary-container: '#fffbff'
  tertiary: '#006b27'
  on-tertiary: '#ffffff'
  tertiary-container: '#008733'
  on-tertiary-container: '#f7fff2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#e2dfff'
  secondary-fixed-dim: '#c2c1ff'
  on-secondary-fixed: '#0c006a'
  on-secondary-fixed-variant: '#3631b4'
  tertiary-fixed: '#72fe88'
  tertiary-fixed-dim: '#53e16f'
  on-tertiary-fixed: '#002107'
  on-tertiary-fixed-variant: '#00531c'
  background: '#faf9fe'
  on-background: '#1a1b1f'
  surface-variant: '#e3e2e7'
typography:
  display:
    fontFamily: Inter
    fontSize: 34px
    fontWeight: '700'
    lineHeight: 41px
    letterSpacing: -0.022em
  display-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.019em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.017em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 25px
    letterSpacing: -0.015em
  subheadline:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 22px
    letterSpacing: -0.011em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 21px
    letterSpacing: -0.009em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: -0.004em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.03em
  metric-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.025em
  metric-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.018em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-lg: 1.5rem
  margin: 1.5rem
  margin-sm: 1rem
  margin-lg: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes an executive-grade platform tailored for IEEE Student Branch leadership, committee chairs, and regional counselors. The visual language blends the rigor of engineering governance with the restraint, clarity, and precision of Apple Human Interface Guidelines.

### Philosophy & Visual Tone
- **Precision & Intent:** Every layout structure, metric block, and line of type communicates purpose. Avoid decorative clutter, excessive gamification badges, or frivolous animations.
- **Sophisticated Utility:** The workspace operates like a calibrated instrument. Complex engagement telemetry (membership lifecycles, event participation, paper submissions, officer transitions) is surfaced through balanced modular cards, high-legibility typographic hierarchies, and restrained visual alerts.
- **Atmospheric Neutrality:** Pure white containers hover quietly over tinted slate canvases, allowing data visualizations and key performance indicators to command attention naturally.

## Colors

The palette is anchored by the signature system blue, counterbalanced by a tiered neutral hierarchy designed to eliminate eye strain during prolonged administrative sessions.

### Functional Roles & Application Rules
- **Canvas Base (`#F2F2F7`):** The foundational neutral surface across the entire application canvas.
- **Card Tier 1 (`#FFFFFF`):** High-priority operational cards, active data containers, and modal sheets.
- **Card Tier 2 / Sub-surface (`#F9F9FB`):** Nested metrics, subtle grouping wells, data-table header bands, and segmented controls.
- **Primary Interaction (`#007AFF`):** Reserved strictly for focal interactive elements: primary actions, selected navigation pills, active switch toggles, and key data trendlines.
- **Secondary Accent (`#5856D6`):** Applied for specialized IEEE society tracks (e.g., Computer Society, PES, RAS) and secondary cohort comparisons.
- **System Feedback Accents:**
  - **Success (`#34C759`):** Branch retention milestones, verified attendees, healthy growth rate indicators.
  - **Warning (`#FF9500`):** Pending approvals, RSVP drop-offs, budget threshold alerts.
  - **Critical (`#FF3B30`):** Inactive rosters, lapsed memberships, compliance deficits.
- **Border Enclosure (`rgba(0, 0, 0, 0.05)` to `rgba(0, 0, 0, 0.08)`):** Crisp hairline outlines that maintain perimeter definition between adjacent white surfaces and light grey canvases.

## Typography

The typography uses Inter across all levels to reflect the neutral, utilitarian, and clean rhythm of Apple system typefaces (SF Pro). Tracking tightens progressively as scale increases, preserving typographic tension at display scales while preserving open counters for data-dense tables.

### Typesetting Rules
- **Numerics & Telemetry:** KPI numbers, event headcounts, and metric readouts employ tabular figures (`font-variant-numeric: tabular-nums`) to prevent horizontal jitter during real-time dashboard data refreshes.
- **Hierarchy Mapping:** Section labels must stay succinct and use uppercase styling when applied with `label-sm` to establish anchor points above metric figures.
- **Body & Editorial Content:** Keep executive summaries and status updates capped at 65 characters per line to safeguard reading cadence.

## Layout & Spacing

The layout is built upon a 12-column fluid structural grid with responsive margins and controlled modular containment. The system prevents dashboard information density from becoming claustrophobic by preserving generous negative margins between distinct widget clusters.

### Breakpoints & Responsive Behavior
- **Desktop (≥ 1280px):** 12-column grid. Margins set to `margin-lg` (2.5rem), gutters at `gutter-lg` (1.5rem). High-level metrics assemble across a 4-column span, while complex time-series charts take 8 columns.
- **Tablet / Medium (768px – 1279px):** 8-column layout. Margins set to `margin` (1.5rem), gutters at `gutter` (1.25rem). Secondary widgets fold cleanly underneath high-priority rosters and event matrices.
- **Mobile (< 768px):** 4-column layout. Outer margins collapse to `margin-sm` (1rem). Multi-column metric groups reflow into single-column card stacks or horizontally swipeable carousels with edge snap.

### Rhythmic Padding Rules
- Standard widget card internal padding uses `space-lg` (1.5rem) on desktop and transitions gracefully to `space-md` (1rem) on constrained mobile viewports.
- Related inline elements (e.g., status pill next to student chapter title) maintain an exact `space-sm` (0.5rem) clearance.

## Elevation & Depth

Visual depth mirrors Apple HIG material rendering: tactile separation is generated through restrained ambient occlusion, subtle translucent layering, and micro-thin perimeter borders rather than heavy directional drop shadows.

### Elevation Levels
- **Level 0 (Canvas Base):** Ground level `#F2F2F7`. Flat, non-interactive surface carrying global structural views.
- **Level 1 (Resting Modular Cards):** Background `#FFFFFF`, border `1px solid rgba(0, 0, 0, 0.06)`, shadow `0px 2px 12px rgba(0, 0, 0, 0.04)`. This forms the primary surface for metric cards, table containers, and overview widgets.
- **Level 2 (Hover & Active States):** Background `#FFFFFF`, border `1px solid rgba(0, 0, 0, 0.09)`, shadow `0px 4px 16px rgba(0, 0, 0, 0.07)`. Elements lift slightly without exaggerated vertical translation (+1px Y-axis shift maximum).
- **Level 3 (Floating Bars, Popovers, & Dropdowns):** Background `rgba(255, 255, 255, 0.88)` paired with `backdrop-filter: blur(20px)`, border `1px solid rgba(0, 0, 0, 0.08)`, shadow `0px 8px 24px rgba(0, 0, 0, 0.09)`. Used for navigation chrome, floating filter trays, and executive actions.
- **Level 4 (Modals & Command Center Sheets):** Background `#FFFFFF`, shadow `0px 16px 36px rgba(0, 0, 0, 0.12)`, supported by a `rgba(0, 0, 0, 0.28)` frosted backdrop blur over background content.

## Shapes

The design uses balanced, rounded corner geometry consistent with modern operating system containers. Continuous smooth squircle-like transitions prevent harsh optical breaks across complex data modules.

### Component Shape Conventions
- **Executive Widgets & Dashboard Cards:** `rounded-lg` (1rem / 16px) produces a comfortable, framing silhouette that organizes dense visual content.
- **Inner Sub-containers & Metric Wells:** `rounded` (0.5rem / 8px) creates clean internal boundaries for nested data.
- **Interactive Buttons & Form Fields:** 10px corner radius or full pill depending on context:
  - Standard action buttons and text inputs use an 8px–10px corner radius.
  - Global filter pills, status badges, and tab selectors apply full pill forms for quick tactile recognition.

## Components

### Buttons & Action Controls
- **Primary Action:** Solid `#007AFF` fill, white typography (`body-sm`, font-weight 600), minimum height of 36px, horizontal padding `space-md` (1rem), radius 8px. Hover shifts slightly to `#0066D6`.
- **Secondary Action:** Background `#F2F2F7` or `rgba(0, 122, 255, 0.08)`, text color `#007AFF`, no heavy border. Soft transition to `rgba(0, 122, 255, 0.14)` on hover.
- **Segmented Control:** Enclosed container (`#E5E5EA` background, 8px radius, 2px internal padding) containing equal-width tabs. Active tab renders with `#FFFFFF`, radius 6px, and a crisp subtle drop shadow `0 1px 3px rgba(0,0,0,0.1)`.

### Status Badges & Engagement Indicators
- Low-saturation pastel flood base paired with saturated text:
  - **Active / Verified:** Fill `rgba(52, 199, 89, 0.12)`, text `#248A3D`.
  - **In Review / Attention:** Fill `rgba(255, 149, 0, 0.12)`, text `#B25000`.
  - **At Risk / Inactive:** Fill `rgba(255, 59, 48, 0.12)`, text `#D70015`.
  - **Affinity / Chapter Affinity:** Fill `rgba(88, 86, 214, 0.12)`, text `#43419F`.
- Badge architecture uses pill radius, 4px vertical by 8px horizontal padding, with typography set to `label-sm`.

### Metric & Telemetry Cards
- Structured layout:
  - Top row: Subdued category title (`label-sm`, `#8E8E93`) paired with a trend indicator pill (+14.2% in green or -3.1% in red).
  - Center: High-contrast aggregate metric readout (`metric-xl`, `#1C1C1E`).
  - Bottom row: Sparkline trend visualizer or micro-description (`body-sm`, `#636366`).
- No decorative 3D icons or ornamental borders.

### Lists & Data Grids
- Clean tabular rows separated by 1px solid hairline dividers (`rgba(0, 0, 0, 0.04)`).
- Table headers use `label-sm` with a fixed height of 38px and background `#F9F9FB`.
- Row hover reveals a subtle `#F9F9FB` fill without displacement.

### Form Inputs & Select Trays
- Background `#F2F2F7` at rest; on focus, transitions to crisp `#FFFFFF` with a `1.5px solid #007AFF` ring and zero offset.
- Typography set to `body-sm`, with placeholder text in `#8E8E93`.
- Clear icon triggers and search glyphs use optical sizing matched to 16px.

### Checkboxes & Radios
- Checkboxes: 18px square with 5px radius. When selected: `#007AFF` fill containing an optically centered white checkmark.
- Radio buttons: 18px concentric circles. Selected state features `#007AFF` outer stroke and inner concentric circle.