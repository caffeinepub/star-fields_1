# Specification

## Summary
**Goal:** Fix admin dashboard permissions to allow authenticated admins to save Nakshatra edits and replace images without authorization errors.

**Planned changes:**
- Update backend authorization logic to recognize authenticated admin users for write operations
- Ensure passcode authentication properly grants permissions for Nakshatra data updates and image replacements
- Fix the AdminEditPage form submission to complete successfully without permission errors

**User-visible outcome:** Authenticated admin users can save Nakshatra edits and upload/replace images in the admin dashboard without encountering "only administrators can replace Nakshatra images" errors.
