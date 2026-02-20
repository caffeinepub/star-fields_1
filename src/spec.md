# Specification

## Summary
**Goal:** Fix backend initialization bug to automatically seed Nakshatra data on first deployment.

**Planned changes:**
- Modify backend/main.mo to detect empty Nakshatra storage on initialization
- Automatically trigger migration seeding when no data exists
- Add initialization logging to track seeding events and report success/failure
- Ensure all 27 Nakshatras are populated with complete data from migration.mo

**User-visible outcome:** Admin dashboard displays all Nakshatra entries without "No Data Available" error on first deployment.
