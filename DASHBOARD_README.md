# Air Quality Prediction Dashboard

A modern, professional web dashboard for real-time air quality monitoring and AI-powered NO₂ and O₃ prediction. Built with React 19, Tailwind CSS 4, and Recharts for interactive data visualization.

## Features

### 1. Dashboard Overview
- **Real-time Metrics**: Display current NO₂ and O₃ levels with visual progress indicators
- **Air Quality Index (AQI)**: Color-coded AQI status (Good, Moderate, Unhealthy for Sensitive Groups, Unhealthy)
- **Environmental Conditions**: Live temperature, humidity, and wind speed data
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 2. Data Visualization
- **24-Hour Trend Charts**: Interactive line charts showing NO₂ and O₃ pollution trends
- **Predicted vs Actual Comparison**: Bar charts comparing AI predictions with actual measured values
- **Model Accuracy Display**: Shows average prediction accuracy (95%+ typical)
- **Smooth Animations**: 800ms chart animations for engaging data presentation

### 3. AI Prediction Engine
- **Environmental Parameter Input**: Sliders and selectors for temperature, humidity, wind speed, pressure
- **Real-time Predictions**: AI-powered forecasts for NO₂ and O₃ levels
- **Health Recommendations**: Context-aware insights based on predicted pollution levels
- **Status Indicators**: Color-coded pollution status with health recommendations

### 4. Geographic Heatmap
- **Interactive Map**: Click-to-select regions with detailed air quality information
- **Color-coded Regions**: Green (good) → Yellow (moderate) → Orange (unhealthy) → Red (very unhealthy)
- **Region Details**: Displays NO₂, O₃, and AQI for selected locations
- **Region List**: Quick access to all monitored regions

### 5. Alerts & Insights
- **Smart Alerts**: Warnings for high pollution levels with health recommendations
- **AI-Generated Insights**: Contextual messages like "High O₃ levels expected in afternoon"
- **Health Guidelines**: Recommendations for outdoor activities and protective measures
- **Real-time Updates**: Automatic refresh every 5 minutes

### 6. Dark Mode
- **Theme Toggle**: Easy switching between light and dark modes
- **Persistent Preference**: Theme choice saved in browser localStorage
- **Full Coverage**: All components styled for both light and dark themes
- **Environmental Colors**: Sage green, sky blue, and warm cream palette adapted for both modes

## Design System

### Color Palette
- **Sage Green** (#6B9E7F): Primary accent, environmental theme
- **Sky Blue** (#4A90E2): NO₂ data, secondary accent
- **Warm Cream** (#F8F6F1): Light mode background
- **Amber Warning** (#E8A547): Moderate pollution indicator
- **Coral Alert** (#E85D4E): High pollution indicator
- **Success Green** (#52B788): Good air quality indicator

### Typography
- **Headers**: Plus Jakarta Sans (600-700 weight) for distinctive, modern appearance
- **Body**: Inter (400-500 weight) for excellent readability
- **Hierarchy**: 32px (h1) → 24px (h2) → 20px (h3) → 16px (h4) → 14px (body) → 12px (labels)

### Spacing & Layout
- **Base Unit**: 4px grid system
- **Card Padding**: 16px internal, 24px external
- **Border Radius**: 12px for cards, 8px for inputs, 24px for badges
- **Shadows**: Soft shadows (0 2px 8px rgba(0,0,0,0.08)) for depth without harshness

### Interactions
- **Smooth Transitions**: 300ms ease-in-out for all state changes
- **Hover Effects**: 2-4px elevation on card hover
- **Micro-animations**: 150ms scale (1.02x) on button clicks
- **Chart Animations**: 800ms smooth line drawing on initialization

## Component Structure

```
client/src/
├── pages/
│   ├── Dashboard.tsx          # Main dashboard layout with tab navigation
│   ├── Home.tsx               # Home page (redirects to Dashboard)
│   └── NotFound.tsx           # 404 page
├── components/
│   ├── TrendChart.tsx         # 24-hour pollution trend visualization
│   ├── PredictionComparison.tsx # Predicted vs actual comparison chart
│   ├── PredictionInput.tsx    # AI prediction input form
│   ├── AlertsPanel.tsx        # Alerts and health recommendations
│   ├── MapHeatmap.tsx         # Geographic heatmap visualization
│   ├── StatCard.tsx           # Reusable metric card component
│   ├── ResponsiveGrid.tsx     # Responsive grid layout utility
│   └── ui/                    # shadcn/ui components
├── contexts/
│   └── ThemeContext.tsx       # Theme management (light/dark mode)
├── hooks/
│   └── useLocalStorage.ts     # localStorage persistence hook
├── lib/
│   └── utils.ts               # Utility functions and helpers
├── App.tsx                    # Main app component with routing
├── main.tsx                   # React entry point
└── index.css                  # Global styles and design tokens
```

## Key Features Explained

### Real-time Data Updates
The dashboard displays current pollution levels with automatic refresh. Mock data is used for demonstration; integrate with your API by replacing the data sources in each component.

### AI Prediction Engine
Users input environmental parameters (temperature, humidity, wind speed, pressure) and the system returns predicted NO₂ and O₃ levels. The prediction logic can be replaced with actual ML model calls.

### Responsive Design
- **Mobile** (< 640px): Single column layout, collapsed sidebar
- **Tablet** (640px - 1024px): Two-column grid for metrics
- **Desktop** (> 1024px): Full three-column layout with persistent sidebar

### Dark Mode Implementation
The theme system uses CSS variables that automatically update when the theme changes. All colors are defined in `index.css` with both light and dark variants.

## Customization

### Changing Colors
Edit the CSS variables in `client/src/index.css`:
```css
:root {
  --sage-green: #6B9E7F;
  --sky-blue: #4A90E2;
  /* ... other colors ... */
}
```

### Adding New Metrics
Create a new component in `components/` and import it into `Dashboard.tsx`. Use the `StatCard` component for consistent styling.

### Integrating Real Data
Replace mock data in each component with API calls:
```typescript
const [data, setData] = useState(null);

useEffect(() => {
  fetch('/api/pollution-data')
    .then(res => res.json())
    .then(data => setData(data));
}, []);
```

### Modifying Chart Data
Edit the `data` arrays in `TrendChart.tsx`, `PredictionComparison.tsx`, and `MapHeatmap.tsx` to reflect your actual data sources.

## Performance Considerations

- **Lazy Loading**: Components load on demand when tabs are selected
- **Memoization**: Use React.memo for components that don't need frequent updates
- **Chart Optimization**: Recharts handles large datasets efficiently
- **Image Optimization**: Background images use compressed WebP format

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android 80+

## Accessibility

- **Semantic HTML**: Proper heading hierarchy and ARIA labels
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Focus Indicators**: Visible focus rings on all interactive elements

## Future Enhancements

- Real-time WebSocket integration for live data updates
- User accounts and saved preferences
- Export data as CSV/PDF reports
- Mobile app version with push notifications
- Advanced filtering and date range selection
- Historical data analysis and trend prediction
- Integration with weather APIs
- Multi-location monitoring

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Type checking
pnpm check

# Format code
pnpm format
```

## License

MIT
