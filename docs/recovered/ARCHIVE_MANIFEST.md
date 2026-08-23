# iAAi Recovered Archive Manifest
# Generated: 2026-08-23
# Source: Manus recovered materials archive (iaai-recovered-materials-2026-08-23.tar.gz)
# Total archive size: ~519 MB

| filename | size_bytes | type | notes |
|---|---|---|---|
| IAAI_GAC_Tech_deck.pptx | 3,061,554 | Microsoft PowerPoint 2007+ | Technology deck |
| IAAI_Investor_Pitch.pptx | 3,933,591 | Microsoft PowerPoint 2007+ | Investor pitch |
| MANIFEST.txt | 280 | ASCII text | Manifest (this is the Manus copy) |
| README_BACKUP_STATUS.md | 1,276 | ASCII text | Backup status documentation |
| SHA256SUMS.txt | 756 | ASCII text | SHA-256 checksums |
| SOURCE_MANIFEST.csv | 1,379 | CSV ASCII text | Source-level manifest |
| iAAI-Vehicle-Catalogue-Card-Deck.pdf | 447,508,011 | PDF v1.3, 82 pages | **DOMINATES archive (447MB)** |
| iAAi_COUNTER_Paper_v10.38.pdf | 5,025,900 | PDF v1.7, 77 pages | Main paper in PDF |
| iAAi_COUNTER_Paper_v10.38_copy.docx | 63,534,344 | Microsoft Word 2007+ | Main paper in Word |
| iAAi_Compensation_Framework.pdf | 317,890 | PDF v1.4, 5 pages | Framework document |

## Key Insight

The ~519MB archive is dominated by a single 447MB PDF (vehicle catalogue). All other files total approximately **72MB**, well within GitHub's 100MB per-file push limit.

## Recommended Transfer Strategy

1. **Push all NON-vehicle files to `infra-acad003/docs/recovered/`** via normal git push (~72MB, 9 files — all under 100MB individual limit)
2. **Vehicle catalogue PDF (447MB)** — too large for normal GitHub push. Options:
   - GitHub LFS (requires LFS setup)
   - Store in Google Drive (already uploading)
   - Skip for now (it's a large presentation PDF, not source code)

## Files Critical for Reconstruction

- iAAi_COUNTER_Paper_v10.38.pdf / .docx — core research paper
- IAAI_GAC_Tech_deck.pptx — technology deck
- IAAI_Investor_Pitch.pptx — investor materials
- iAAi_Compensation_Framework.pdf — framework document

The vehicle catalogue is important for completeness but isn't needed for website reconstruction.
