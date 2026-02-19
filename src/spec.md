# Specification

## Summary
**Goal:** Fix the backend canister initialization issue causing "Unable to Load Nakshatras" errors and improve frontend error handling during startup.

**Planned changes:**
- Investigate and resolve backend canister initialization problems in main.mo to ensure proper startup and query responses
- Add retry logic and improved loading states in useQueries.ts to handle canister initialization delays gracefully
- Verify default Nakshatras (Ashwini and Bharani) initialize correctly and are immediately retrievable after deployment

**User-visible outcome:** Users will see a loading state during canister initialization instead of error messages, and the Nakshatra grid will load successfully without "service temporarily unavailable" errors.
