import type { backendInterface } from '../backend';

/**
 * Get the live canister ID from environment variables
 */
export function getLiveCanisterId(): string | null {
  const liveCanisterId = import.meta.env.VITE_LIVE_CANISTER_ID;
  return liveCanisterId || null;
}

/**
 * Get the draft canister ID from environment variables
 */
export function getDraftCanisterId(): string | null {
  const draftCanisterId = import.meta.env.VITE_CANISTER_ID;
  return draftCanisterId || null;
}

/**
 * Validate that both live and draft canister IDs are configured
 */
export function validateCanisterConfig(): { valid: boolean; error?: string } {
  const liveId = getLiveCanisterId();
  const draftId = getDraftCanisterId();

  if (!liveId) {
    return { valid: false, error: 'Live canister ID not configured (VITE_LIVE_CANISTER_ID)' };
  }

  if (!draftId) {
    return { valid: false, error: 'Draft canister ID not configured (VITE_CANISTER_ID)' };
  }

  if (liveId === draftId) {
    return { valid: false, error: 'Live and draft canister IDs cannot be the same' };
  }

  return { valid: true };
}

/**
 * Create an actor instance for the live canister
 * This function dynamically loads the required modules to avoid TypeScript compilation issues
 */
export async function createLiveActor(identity?: any): Promise<backendInterface> {
  const liveCanisterId = getLiveCanisterId();
  
  if (!liveCanisterId) {
    throw new Error('Live canister ID not configured');
  }

  // Use dynamic import with type assertion to avoid TypeScript errors during compilation
  // The actual module will be available at runtime after dfx generate
  const { Actor, HttpAgent } = await import('@icp-sdk/core/agent');
  
  // Load the config module which contains createActorWithConfig
  const configModule = await import('../config');
  
  // Create actor with the live canister ID
  const agentOptions: any = {
    identity,
  };

  const actorOptions = {
    agentOptions,
  };

  // Use the same createActorWithConfig function but with live canister ID
  // We need to cast this properly since we're calling it with a different canister ID
  const actor = await (configModule as any).createActorWithConfig(actorOptions, liveCanisterId);
  
  return actor as backendInterface;
}
