# Specification

## Summary
**Goal:** Display detailed pada information representing the current lunar climate in the main nakshatra banner.

**Planned changes:**
- Create comprehensive pada data structure with all 108 pada descriptions (4 padas per nakshatra) including degree range, navamsa sign, title, and interpretive text
- Extend nakshatraEngine to calculate the current pada (1-4) based on Moon's precise degree position within the nakshatra
- Update CurrentNakshatraBanner component to display current pada number, navamsa sign, title, and full description
- Add visual indicator emphasizing that pada information represents the current lunar climate

**User-visible outcome:** Users will see the current pada details in the main nakshatra banner, showing real-time lunar climate information that updates automatically as the Moon moves through different padas.
