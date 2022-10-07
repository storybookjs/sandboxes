/**
 * A "Render" represents the rendering of a single entry to a single location
 *
 * The implemenations of render are used for two key purposes:
 *  - Tracking the state of the rendering as it moves between preparing, rendering and tearing down.
 *  - Tracking what is rendered to know if a change requires re-rendering or teardown + recreation.
 */
export const PREPARE_ABORTED = new Error('prepareAborted');