# Apple Music-inspired profile direction

## Direction

The redesign borrows the information hierarchy of a contemporary artist profile rather than copying Apple Music branding or UI. The home page now behaves like an artist profile first: a large identity masthead, artist facts and approved-image slot, a primary listening action, spotlight content, latest releases, albums and EPs, a top-video feature, appearances/collaborations, an About section, and official destinations.

The visual blend remains Teeroy Tyobee-owned: dark graphite backgrounds, restrained gold, warm editorial type, Tiv/Middle Belt identity notes, abstract release art, and visible verification boundaries. No Apple Music screenshot or third-party artist image is embedded in the project.

## Source-backed patterns

Apple Music for Artists documents artist-image and logo customization, button-color customization, spotlighted content, artist details, and a Music and Videos content view. Those ideas are reflected as an approved-image slot, cohesive gold action color, a pinned `JOY (IEMBER)` spotlight, profile facts, and distinct music/video rails. [1]

Apple’s artist-page provider guidance describes a page structure that can include Motion Art, Latest Release, Essential Albums, Albums, Top Videos, Artist Playlists, Singles & EPs, Appears On, and About Me. The redesign uses the subset supported by the recovered content model: spotlight/latest release, albums and EPs, latest releases, top video, appears-on collaborations, and About the artist. [2]

The Apple Music for Artists product page also emphasizes personalizing an artist page, pinning a release or playlist, and using a coherent button color. The profile masthead and spotlight action are designed around those same priorities without implying an Apple partnership. [3]

## Spotify-inspired interaction blend

The current hero now follows familiar dark listening-product conventions: a full-bleed visual surface, strong artist name, one rounded primary listening action, and compact outbound store controls. The controls link to Spotify search, Apple Music, Audiomack, and YouTube. Spotify is intentionally marked in the content model as a search fallback because an exact release URL has not been verified.

The hero does not use an image card, profile badge, location tag, or EPK shortcut. When a management-approved portrait is added to `artist.portrait.src`, it becomes the background image of the hero. Until then, the site uses its existing abstract art fallback instead of embedding an uncleared artist image.

## Asset and rights boundary

The user has now supplied `client/public/artist-hero.jpeg`, and the masthead uses it as the full-bleed hero background. The asset is treated as user-provided; final management approval and publication clearance should still be recorded before commercial launch.

## References

[1]: https://artists.apple.com/support/3391-artist-content-profile "Manage your artist content and profile — Apple Music for Artists"
[2]: https://itunespartner.apple.com/music/support/5229-artist-pages "Artist pages — Apple Music Provider Support"
[3]: https://artists.apple.com/ "Apple Music for Artists"
