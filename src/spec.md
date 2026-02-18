# Specification

## Summary
**Goal:** Fix the admin dashboard to properly display and enable editing of all 27 Nakshatras.

**Planned changes:**
- Fix AdminPage component to fetch and display all 27 Nakshatras using useNakshatrasQuery hook
- Ensure AdminEditPage loads individual Nakshatra data and all form fields work correctly
- Verify backend getAllNakshatras and getNakshatra query methods return complete data
- Debug React Query hooks to ensure proper actor integration and data fetching

**User-visible outcome:** The admin dashboard displays all 27 Nakshatras in a grid with functional edit buttons, and the edit page allows updating all Nakshatra features including image upload, ruling deity, symbol, description, and characteristics.
