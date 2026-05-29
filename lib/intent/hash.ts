import { createHash } from 'crypto'

/** A minimal off-ramp intent that can be deterministically hashed. */
export interface Intent {
  type: string
  sourceAsset: string
  destinationAsset: string
  amount: string
  sender: string
  recipient: string
  [key: string]: unknown
}

/**
 * Serialize an intent to canonical JSON: keys sorted alphabetically,
 * no whitespace, all string values lowercased where they are hex-like.
 * Non-string values are preserved as-is.
 */
export function canonicalJson(intent: Intent): string {
  return JSON.stringify(sortKeys(intent))
}

/** SHA-256 hash of the canonical JSON, returned as lowercase hex. */
export function hashIntent(intent: Intent): string {
  const canonical = canonicalJson(intent)
  return createHash('sha256').update(canonical, 'utf8').digest('hex')
}

function sortKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortKeys)
  }
  if (value !== null && typeof value === 'object') {
    const obj = value as Record<string, unknown>
    return Object.keys(obj)
      .sort()
      .reduce<Record<string, unknown>>((acc, k) => {
        acc[k] = sortKeys(obj[k])
        return acc
      }, {})
  }
  return value
}
