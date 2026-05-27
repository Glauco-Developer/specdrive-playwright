# Page element inventory

Generated from browser exploration of `baseURL` pages listed in `pages.urls.json`.
Update this file when re-running Phase 2 (Playwright MCP / browser snapshot).

**Stability:** see [stability-guidelines.md](./stability-guidelines.md). Tag elements below as stable or volatile when re-exploring.

---

## home — Homepage (`/`)

| Field | Value |
|-------|--------|
| **Title** | The Wheel: Supporting & Representing Charities – The Wheel is Ireland's association of community & voluntary organisations, charities & social enterprises. |
| **H1** | We are Ireland's national association of charities and community groups |
| **Hero subtitle** | Working towards a thriving charity and community sector at the heart of a fair and inclusive Ireland |

### Overlays (volatile — dismiss only, do not assert copy)

| Element | Role | Name |
|---------|------|------|
| Promo bar | link | Book early bird tickets *(changes per campaign)* |
| Dismiss | button | Dismiss notification |

### Primary navigation

| Link |
|------|
| Become a Member |
| Get Support |
| Our Work |
| About Us |
| Member Hub |
| News and Updates |
| Contact us |
| Jobs board |
| Login |

### Hero CTAs

| Link | Href |
|------|------|
| Join us today | `/join-us/` |
| Already a member? | `/login/` |

### How we help (h2)

| h3 | CTA link |
|----|----------|
| Funding | Access help with funding |
| Training and Events | Upcoming training |
| Advice and Guidance | Get Advice and Guidance |
| Policy and Advocacy | Policy & Advocacy |

### What we're working on (h2)

- Our Campaigns, Publications and Submissions, Our Projects

### Why join us (h2)

- Bullet benefits list + **Become a member** → `/membership/become-a-member/`

### News (h2: Our latest News and Updates) — volatile

- Article titles rotate (assert count + slug links, not exact headlines)
- **View all news and updates** → `/news-and-updates/` *(stable)*

### Footer

| Section | Notable elements |
|---------|------------------|
| Our funders | h2 |
| Newsletter sign up | link **Subscribe** |
| Helpful links | Contact the Wheel, Privacy policy, … |
| Our sites | Access Europe, iCommunity Hub, … |
| Utility | button **Back to top** |
| Legal | © Copyright The Wheel *(year volatile — use regex)* |

### Playwright locator notes

- Prefer `getByRole('heading', { name: '...', level: n })`.
- Nav has duplicate items (desktop/mobile) — scope with `page.getByRole('navigation')` or use `.first()`.
- Dismiss promo before asserting hero if flaky.
