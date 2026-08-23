# Self-Instruction: Rebuild and Independently Deploy the iAAi Website

> Received from Nigel Dearden, 2026-08-23 19:50 GMT+8.
> This instruction is written to rebuild the iAAi / Infrastructure Academy website from recovered materials, not to pretend that missing Manus-only data has been recovered.

---

## Self-instruction: Rebuild and independently deploy the iAAi / Infrastructure Academy website

You are responsible for reconstructing the iAAi / Infrastructure Academy website from the attached recovered-materials archive and any additional files, screenshots, URLs, or configuration records supplied by the owner. Treat the archive as authoritative for the files it contains, but do not claim it is a complete Manus Task Data Backup. Do not invent missing pages, databases, credentials, user records, payment history, or deployment results.

### First
Inventory every file and produce a manifest containing filename, type, source, timestamp, SHA-256 hash, and any visible project/version information. Preserve the original files unchanged and work only on copies. Extract and organize the iAAi papers, vehicle catalogue, compensation framework, GAC technology deck, investor pitch, images, diagrams, and other project assets into a clear source directory.

### Second
Reconstruct the website as an independent application outside Manus. Recreate the visual identity, navigation, content hierarchy, framework explanations, document library, investor-facing material, and any public pages supported by the supplied evidence. Where the original website behavior is unknown, mark the item as "not evidenced—requires owner confirmation" rather than guessing. Do not reproduce private Manus chat content unless it is supplied by the owner.

### Third
Separate public content from protected operational data. Do not place API keys, Stripe secrets, OAuth tokens, database passwords, private customer information, or unpublished credentials in source code, browser JavaScript, Git history, screenshots, or public storage. Use environment variables and a documented secret-management procedure. Stripe must be connected only after the owner confirms the intended account, products, prices, webhook endpoints, and test/live mode.

### Fourth
Create a transfer-ready repository with a README, architecture description, deployment instructions, environment-variable template, content/source manifest, database schema or migration files if a database is required, backup instructions, and a CHANGELOG. Commit the reconstructed source to the owner's authorized GitHub repository. Record the repository URL, commit hash, build command, deployment date, and responsible account.

### Fifth
Deploy the independent website and payment Worker only to an account explicitly authorized by the owner. Use a named Worker—not a placeholder such as iaai-payment.YOURNAME.workers.dev. Verify the live URL with HTTP checks, test public pages, test the payment flow in Stripe test mode first, verify webhook signatures, and document every endpoint. Do not state "deployed," "working," or "verified" until the live URL has been tested successfully.

### Sixth
Create at least three independent preservation copies: the GitHub repository, a dated local/source archive, and an external cloud archive such as Cloudflare R2 or Google Drive. Include the manifest and SHA-256 checksums in every archive. Keep the website source, database backup, uploaded assets, configuration documentation, and deployment record together. Test extraction of the archive before declaring the backup complete.

### Finally
Deliver a factual completion report containing: reconstructed pages; files used; items that could not be recovered; repository URL and commit; live website URL; Worker URL; payment and webhook status; backup locations; SHA-256 hash; test results; and the exact date/time of verification. Clearly distinguish reconstructed, verified, not supplied, and not recoverable items. Never fabricate a Manus export, legal certification, police evidence, shareholder evidence, payment result, or working URL.

---

## Notes

- This instruction should be used together with the recovered archive already provided.
- It does not establish that the original Manus-hosted website, database, chats, secrets, or official Task Data Backup were recovered; those items require a separate authorized export or reconstruction from evidence.
- As of 2026-08-23, the production website is served via GitHub Pages from `Infrastructure-Academy/infra-acad003` at `https://infrastructure-academy.com`.
- The Cloudflare Worker has not been deployed yet (placeholder URL remains in source).
- Stripe payments are working via Stripe's hosted checkout (not a custom backend).
