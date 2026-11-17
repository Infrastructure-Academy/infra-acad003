# Site hygiene report — 12 and 13 November 2026

Counts only. This note does not repeat contact details, family names, account data, or secrets that were removed.

## Credential token

| Scope | Files before | Occurrences before | Files after | Occurrences after |
|---|---:|---:|---:|---:|
| `docs/` text | 139 | 194 | 0 | 0 |
| Repository text | 389 | 590 | 0 | 0 |

`MIStructE` in `docs/`: 0 before and after. The institution name IStructE was left in place. CEng, MHKIE, and RPE were kept.

The founder line on the institutions page now reads as a Chartered Engineer (CEng).

## Contact redaction

Phone numbers were replaced with `[removed — held privately]` in every copy of `hard-save-team-contacts.md` (`docs/data/`, `data/`, `client/public/data/`) and in every copy of `jonathan_green_research.md` and `Jonathan_Green_Review_Digest.md` under `docs/`, `docs/docs/`, and `client/public/docs/`.

On 13 November the Address field and remaining email values in those contact copies, and the email addresses in the research and digest copies, were set to the same placeholder.

| File group | Emails before | Emails after | International numbers after |
|---|---:|---:|---:|
| 3 contact copies | 2 each (6) | 0 | 0 |
| 3 research copies | 1 each (3) | 0 | 0 |
| 3 review-digest copies | 1 each (3) | 0 | 0 |

## Living relatives and archive

Role words replaced proper names on the Behind the Thesis, Before Writing, and Equations Register copies. Spouse gallery cards were removed from every `vault.html` and `icut-gallery.html`. A sentence was added on Behind the Thesis stating that family records are held in the password-protected vault.

| Path | Action |
|---|---|
| `archive/2026-08-25/nigel-tribute-source/DEARDEN_FAMILY_RECORD.md` | Replaced with a short stub |
| `archive/2026-08-25/nigel-tribute-source/NIGEL_BIO.md` | 1 personal email replaced with the placeholder; career bio kept |
| `archive/2026-08-25/nigel-tribute-source/HSBC_4ECL_PROOF_BLOCK392.md` | Replaced with a withdrawal stub |
| `docs/resources/files/OriginStoryC3.docx` | Deleted |
| `docs/resources/files/README-withdrawn.md` | Added |
| `docs/resources/cdn-manifest.md`, `docs/cdn-links-batch-2026-08-20.json`, `docs/IAAI_UNIVERSAL_MEDIA_REGISTER.md` | Public download pointer for that file removed |

11 Word files in the tribute archive whose names include POLICE or LEGAL_RECORD were left in place. 8 of them still contain an at-sign and should be regenerated later.

## Canon

Founder career claims of 40 years, 34 years, and 30+ years were changed to 36 or 36+ where they described that career. Third-party career quotes and non-career “30 years” phrases were not changed. The C3 caption is dated 29 November 1984. No Hong Kong arrival day was invented.

## Broken links

17 library files were downloaded into `docs/manus-storage/`. The Quick Start Guide file was not on the Memorial host; those links now point at `docs/teaching-cse/Civilisational_Systems_Engineering_in_20_Minutes.pdf`.

Two downloads on the Turing-paper page that pointed at missing `docs/manus-storage/` files now point at local copies under `docs/teaching-cse/`.

Site search: 36 relay paths remapped onto the real relay pages; 9 dead app routes removed. The dead header emblem (36 pages) now uses the working logo. Two roster-dashboard images now use the working image URLs. The short Reality Engine host now points at the working Reality Engine host. `/race` navigation was removed and the card button says COMING SOON. `/play/professor` goes to the game hub. `/play/store` goes to the BitPoint marketplace.

## Search and analytics

| Check | Result |
|---|---|
| `robots.txt` Googlebot and Bingbot allow-only groups | Removed, so those crawlers inherit the admin blocks |
| Sitemap host | `https://infrastructure-academy.com` |
| Public URLs in `sitemap.xml` | 157 |
| `docs/` HTML pages | 165 |
| Pages with the corrected GA4 tag | 163 |
| Pages with a canonical tag | 163 |
| `www` canonicals remaining | 0 |
| Mistyped GA4 id remaining | 0 |
| `docs/index.html` and `docs/site.html` byte-identical | yes |

The Stripe test page and the payment-link placeholder are `noindex` and are not in the sitemap. They were not given the analytics tag.

The homepage duplicate social-tag block was removed. Canonical and `og:url` use the non-www host. Commented slots for Search Console and Cloudflare Web Analytics were added on the homepage only.

## Not fixed in this change

- The Quick Start Guide file itself could not be downloaded.
- Copies of the withdrawn banking screenshots, and the withdrawn medical download, may still be live on CloudFront or Manus even though the repository no longer links them.
- Git history was not rewritten. Deleted lines can still appear in the pull-request diff and in older commits.
- The Stripe key already present in history was not touched.
- The POLICE and LEGAL_RECORD Word files noted above still need to be regenerated.
