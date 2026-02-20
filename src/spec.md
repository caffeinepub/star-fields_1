# Specification

## Summary
**Goal:** Implement automatic data synchronization from the live canister to draft canister, allowing admins to sync all Nakshatra text content and uploaded images with a single button click.

**Planned changes:**
- Add backend export functions to retrieve all Nakshatra data and images from the live canister
- Add backend import functions to replace all Nakshatra data and images in the draft canister
- Create frontend sync utility that fetches data from live and imports it into draft
- Add "Sync from Live" button in the admin panel with progress feedback
- Display sync status information showing last sync timestamp and whether draft is in sync with live

**User-visible outcome:** Admins can click a "Sync from Live" button in the admin panel to automatically copy all Nakshatra content and images from the live app into their draft, seeing progress updates and sync status information.
