# Teeroy Tyobee portfolio — recovery TODO

## Recreated core portfolio structure

- [x] Provide Home, Catalog, release detail, Press, Media, and Artist Profile / EPK routes.
- [x] Use a responsive, semantic React interface with keyboard-visible focus states and reduced-motion behavior.
- [x] Represent release provenance, platform-specific metadata, unresolved editorial records, and image-rights limitations in the content model and interface.
- [x] Serve a route manifest covering `/`, `/catalog`, `/catalog/:slug`, `/press`, `/media`, and `/epk`.
- [x] Add static prerender output with route-specific title, description, and body fallback text.
- [x] Add a lazy-loaded PDF export for the current EPK content.

## Editorial and asset verification still open

- [ ] Replace placeholder artwork with management-approved assets and confirm republication rights for any artist portrait.
- [ ] Verify unresolved release candidates and add exact official platform URLs only after checking the source.
- [ ] Reconcile platform-specific release dates without flattening conflicting metadata into a single asserted date.
- [ ] Confirm press citation URLs, contact details, and the final approved biography.
- [ ] Configure a real HTTPS origin before adding canonical and `og:url` metadata.

## Delivery boundary

- [ ] Run `pnpm check`, `pnpm test`, and `pnpm build:static` after editorial verification changes.
- [ ] Create and push the authorized GitHub feature branch only after source review and successful checks.
- [ ] Do not publish to production, change DNS, alter credentials, or change infrastructure as part of this recovery build.
