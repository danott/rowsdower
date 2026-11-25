/**
 * Mount the silhouette of the Satellite of Love crew at the bottom of the page.
 *
 * @param target Where the crew should be mounted. Defaults to `document.body`.
 * @returns A function that removes the crew again. Safe to call more than once.
 */
export default function rowsdower(target?: Element | ShadowRoot): () => void
