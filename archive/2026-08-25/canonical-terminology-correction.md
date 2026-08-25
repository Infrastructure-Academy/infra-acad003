# Canonical Terminology Correction

Date: 2026-08-25

The Memorial project now uses **Human Quotient** as the canonical expansion of HQ. The visible equation heading is:

> IQ ⊗ EQ ⊗ CQ = HQ — The Human Quotient

The visible legend uses `H = Human`.

The source migration replaced legacy `Holistic Quotient` and `Haptic Quotient` wording across the Memorial React source, translation files, data catalogs, and related academic pages. Existing translation key names that contain historical wording were retained where changing the key would break references; their displayed values were corrected.

A production build completed successfully after the migration. The existing Vitest run still contains unrelated database-dependent failures in the restored environment, so those failures are not represented as a successful full test run. The Manus checkpoint containing this correction is `98567ece`; live publication remains a separate user-controlled step.
