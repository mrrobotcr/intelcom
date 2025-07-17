# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based static website for Intelecom, a Costa Rican technology consulting company specializing in Microsoft Azure, Office 365, and Dynamics CRM solutions. The site is built with Astro v5.11.1 and Tailwind CSS, targeting the Spanish-speaking Costa Rican B2B market.

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server (localhost:4321)
pnpm dev

# Build for production (outputs to ./dist/)
pnpm build

# Preview production build locally
pnpm preview

# Access Astro CLI
pnpm astro [command]
```

## Architecture

### Technology Stack
- **Framework**: Astro v5.11.1 (Static Site Generator)
- **Styling**: Tailwind CSS v3.4.17 with custom utilities
- **Language**: TypeScript with strict configuration
- **Package Manager**: pnpm
- **Content**: Spanish language for Costa Rican market

### Component Architecture
The site follows a single-page application pattern with modular Astro components:

- **Main Layout**: `src/layouts/Layout.astro` - Base HTML structure with Spanish meta tags and Google Fonts (Inter + Montserrat)
- **Page Composition**: `src/pages/index.astro` - Imports and renders all section components in sequence
- **Component Structure**: 10 section components for Hero, Products, Services, Why Choose Us, Case Studies, Testimonials, About Us, Contact Form, and Footer

### Design System
Custom Tailwind configuration with business-specific color palette:
- **Primary Colors**: Deep black (#0A0A0A), brand red (#DC2626), gold (#F59E0B)
- **Typography**: Montserrat for headings, Inter for body text
- **Custom Utilities**: Glass morphism cards, gradient text, custom animations in `src/styles/global.css`

### Content Strategy
- **B2B Focus**: Technology consulting services for enterprise clients
- **Conversion Optimization**: Multiple CTAs, contact forms, and trust signals
- **Spanish Content**: All text content is in Spanish for the Costa Rican market
- **Service Focus**: Microsoft Azure, Office 365, and Dynamics CRM solutions

## Development Patterns

### Component Structure
```astro
---
// TypeScript/JavaScript frontmatter for component logic
---
<!-- HTML template with Tailwind classes and custom utilities -->
```

### Styling Approach
- Utility-first with Tailwind CSS
- Custom utilities defined in `src/styles/global.css`
- Responsive design using Tailwind's breakpoint system
- Custom color palette and typography scale

### Business Context
- Target market: Costa Rican B2B technology sector
- Primary services: Azure migration, cloud-native development, managed services
- Content language: Spanish
- Conversion focus: Lead generation through contact forms and consultation CTAs

## File Structure Notes
- All components are self-contained `.astro` files
- Global styles and custom utilities in `src/styles/global.css`
- Static assets should go in `public/` directory
- The site builds to static HTML/CSS/JS for optimal performance and SEO