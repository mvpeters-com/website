---
name: MVPeters
description: A direct, spacious portfolio for a pragmatic digital builder.
colors:
  background: "#fff"
  foreground: "#0a0a0a"
  background-dark: "hsl(4 100% 6%)"
  primary: "#b42800"
  primary-dark: "#ff754c"
  flamingo-400: "#ff4f1a"
  flamingo-700: "#811c00"
  flamingo-200: "#ff9c7e"
  flamingo-50: "#ffe8de"
  flamingo-900: "#210200"
  accent: "#f5f5f5"
  accent-dark: "#262626"
typography:
  display:
    fontFamily: '"Rajdhani", system-ui, sans-serif'
    fontSize: "clamp(3.25rem, 7vw, 6rem)"
    fontWeight: 700
    lineHeight: 1
  headline:
    fontFamily: '"Rajdhani", system-ui, sans-serif'
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.1
  body:
    fontFamily: '"articulat-cf", system-ui, sans-serif'
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.625
  caption:
    fontFamily: '"articulat-cf", system-ui, sans-serif'
    fontSize: "0.875rem"
    lineHeight: 1.625
rounded:
  control: "6px"
spacing:
  page-inline: "1.25rem"
  page-inline-md: "3rem"
  content-gap: "1.5rem"
  separator: "3rem"
  separator-md: "5rem"
components:
  action-link:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    padding: "12px 24px"
  action-link-hover:
    backgroundColor: "{colors.flamingo-700}"
  action-link-dark:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.flamingo-900}"
  action-link-dark-hover:
    backgroundColor: "{colors.flamingo-200}"
  theme-toggle:
    rounded: "{rounded.control}"
    height: "48px"
    width: "48px"
---

# Design System: MVPeters

## Overview

**Creative North Star: "Why build a spacecraft, when a nice kite will do?"**

Keep the established MVPeters identity: a personal, pragmatic voice expressed through large type, generous space, a simple logo-led header, and direct links. The typography carries the interface; portfolio media carries the work. This record describes the completed concept's reusable visual system, rather than proposing a new identity.

**Key Characteristics:**

- Rajdhani headings paired with Articulat body text.
- White or deep red canvases, high-contrast text, and flamingo orange punctuation.
- Open sections, fine rules, underlined links, and square primary actions.
- Simple navigation and substantial, clearly captioned project media.

Page strategy belongs in `.impeccable/surfaces/src-routes-index-tsx.md`. Source authority is `src/styles/app.css`, `src/styles/fonts.css`, the app components and routes, plus the shared UI stylesheet imported by the app. App overrides take precedence over shared defaults.

## Colors

### Primary

The light theme's deep orange-red primary makes links and solid actions readable on white. The dark theme uses the lighter primary with deep flamingo text on solid actions. Keep those foreground/background pairings together.

The fixed flamingo orange is the logo and section-dot color in both themes. The darker and lighter flamingo steps supply action hover states. The pale/deep flamingo pair also frames the walkthrough placeholder.

### Neutral

The light canvas is white with near-black text. The dark canvas is the existing deep red with white text. Dividers use the active foreground at twenty percent opacity. The theme control's hover fill uses the theme's neutral accent surface.

**The Theme Pairing Rule.** Theme changes update the canvas, text, primary action fill, and primary action text together; the logo and section dots retain their fixed orange.

Illustrative client interfaces have their own local palettes. Their pink, peach, green, and product-window colors are concept-asset styling, not MVPeters brand tokens.

## Typography

Rajdhani is the display and heading family; Articulat CF is the body and interface family. Both fall back to the system sans serif. Headings are predominantly bold (700); ordinary prose remains regular (400).

- **Display:** the fluid frontmatter role serves page titles, with balanced wrapping and a maximum measure of twenty characters.
- **Headline:** section headings grow from the frontmatter size to (3.75rem) at the medium breakpoint. Project preview titles use (2.25rem), growing to (3rem).
- **Body:** substantial reading text grows from the frontmatter size to (1.5rem) at medium widths. Page introductions use (1.5rem), growing to (1.875rem). Body line height stays relaxed.
- **Caption:** small, relaxed text identifies media and its provenance. Navigation and action labels use ordinary body type rather than a separate decorative face.

**The Two-Font Rule.** Preserve the Rajdhani/Articulat role split; fonts inside an illustrative product interface do not establish another site-wide type role.

## Layout

The site is a centered canvas capped at (1600px), with the frontmatter's narrow-screen page padding increasing at the medium breakpoint. The observed breakpoints are small (640px), medium (768px), and large (1024px).

Stack content naturally on small screens. At large widths, story and service sections use a heading/text split (1fr / 1.5fr); project previews use a media/text split (1.5fr / 1fr). Reading blocks commonly cap at (48rem), while section headings and introductions may reach (56rem). These are responsive editorial rows, without enclosing card shells.

Section dots provide generous vertical breathing room using the separator spacing tokens. Project lists have larger gaps (4rem, increasing to 6rem at medium widths). The header can wrap; its three visible navigation links remain simple text links. Long email text and action labels must wrap within the viewport. Screenshot strips scroll horizontally instead of shrinking every image into the available width.

## Elevation & Depth

The main site is flat. Whitespace, fine rules, type scale, and image boundaries establish hierarchy. Project previews and primary actions have no decorative shadows. The existing pointer-following interim CTO video preview is a local exception with rounded corners and a shadow; its open player fills the viewport. Do not generalize that treatment into a card system.

Color transitions are brief (150ms) with the existing standard easing. Smooth scrolling and interface animation respect reduced-motion preferences; carousel movement becomes immediate, and the pointer video preview is suppressed.

## Shapes

Primary actions and project-media frames have square corners. Thin horizontal rules structure lists, metadata, and draft notes. Circles belong to the orange section dots, testimonial portraits, and carousel controls. The theme button uses the small control radius in the frontmatter. The logo remains its supplied vector artwork.

## Components

- **Primary action:** a solid, square link with an arrow, body type (18px), a minimum height (48px), and the frontmatter padding. Use its theme-specific fill/text pair and hover fill. It is the recurring project-conversation action.
- **Text links:** underlined primary-colored text. Navigation and large linked project titles are deliberate exceptions: foreground-colored text gains primary color on hover; the active main-navigation item is underlined.
- **Main navigation:** Work, About, and Contact sit beside the logo and theme control. Links have a minimum interactive height (44px); spacing grows from (16px) to (32px) at the small breakpoint.
- **Theme control:** a ghost icon button shows the sun in light mode and moon in dark mode, with a neutral hover surface. It updates the root theme and saves the preference when storage is available; the initial theme otherwise follows the system.
- **Project preview:** a substantial media figure with a caption, a heading, short description, type label, and underlined case link. It is an open grid row, not a bordered or elevated card. Media uses a frame aspect ratio (1.5). Keep actual captures and illustrative interfaces visibly identified.
- **Section dot:** one fixed-orange circle, growing from (16px) to (24px) at medium widths, separates major blocks without a decorative background.
- **Recommendations and video:** retain the existing testimonial carousel, round portraits, explicit carousel controls, and interim CTO video interaction. Project walkthrough placeholders are flat tonal blocks, visibly labeled as placeholders.

Keyboard focus uses the inherited visible outline (2px, offset 5px); the shared ghost button uses its ring treatment. Icon-only controls keep accessible names. No form-field, chip, or generic card system is established by this portfolio.

## Do's and Don'ts

- Do preserve the logo, Rajdhani/Articulat pairing, and both established themes.
- Do let type, space, fine rules, and portfolio media establish hierarchy.
- Do retain underlined content links and theme-specific primary action pairings.
- Do label illustrative interfaces and unverified project content clearly.
- Don't promote illustrative client-interface colors or components into the site-wide system.
- Don't turn open project rows into a rounded, elevated card grid.
- Don't replace the simple text navigation or orange section dots with a new visual language.
