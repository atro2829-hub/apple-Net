---
name: Apple.NET stack
description: Key architectural facts about the Apple.NET PWA in artifacts/apple-net
---

## Stack
- Next.js 15.5, Tailwind v4, shadcn/ui, framer-motion
- Firebase: hardcoded config in `src/lib/firebase.ts` (auth + realtime DB)
- Prisma + SQLite at `db/custom.db`, DATABASE_URL in `.env.local`
- Port 23304 assigned in artifact.toml

## i18n
- `src/lib/i18n.ts` — AR/EN translations object + `t(lang, path)` helper
- `src/context/LanguageContext.tsx` — LanguageProvider + useLanguage hook
- `useLanguage()` exposes: `lang`, `setLang`, `toggleLang`, `t(path)`, `dir`, `isRTL`
- Lang stored in `localStorage("applenet_lang")`

## Dark Mode
- next-themes ThemeProvider with `attribute="class"`, `storageKey="applenet_theme"`
- `src/context/ThemeProvider.tsx` wraps next-themes
- Dark CSS in `globals.css` uses `.dark` class overrides (components have hardcoded hex colors)
- `src/components/ThemeToggle.tsx` — Sun/Moon animated button
- `src/components/LanguageToggle.tsx` — Globe button

## Permissions
- `src/components/PermissionModal.tsx` — bottom-sheet asking push/camera/location permissions
- Shows 3.5s after load if `Notification.permission === "default"` and not session-dismissed
- Uses `requestNotificationPermission()` from `src/lib/notifications.ts`

## Layout
- `layout.tsx`: wraps body in ThemeProvider → LanguageProvider
- `page.tsx`: ThemeToggle + LanguageToggle in header, PermissionModal at end of JSX
- NAV_TABS defined inside component to pick up i18n translations dynamically

**Why:** NAV_TABS must be inside the component (not top-level) because they use the `t()` hook which requires LanguageProvider context.
