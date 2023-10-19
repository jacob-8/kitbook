// Source: https://github.com/rixo/svench/blob/main/packages/svench/src/knobs.js, but removed $previous store resumability to reduce complexity

import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

function parseValueType(value) {
  let type = typeof value
  if (typeof value === 'string') {
    const match = /^(-?[\d.]+)-(-?[\d.]+)(?:;([\d.]+))?$/.exec(value)
    if (match) {
      const [, min, max, x] = match
      value = x != null ? Number.parseInt(x) : (Number.parseInt(max) - Number.parseInt(min)) / 2
      // @ts-expect-error - error because we are change type from string to range
      type = 'range'
      return { default: value, type, min, max }
    }
  }
  else if (type === 'object') {
    return value
  }
  return { default: value, type }
}

function parseConfig(cfg) {
  if (typeof cfg === 'object' && !Array.isArray(cfg)) {
    return Object.entries(cfg).map(([name, value]) => {
      return {
        name,
        ...parseValueType(value),
      }
    })
  }
  else {
    return cfg
  }
}

export interface Knobs<T> extends Writable<T> {
  fields?: {
    name: string
    type: string
    label?: string
    [k: string]: any
  }[]
}

export default <T>(cfg) => {
  if (!cfg)
    return null

  cfg = parseConfig(cfg)

  const knobs: Knobs<T> = writable<T>(
    // @ts-expect-error TODO: describe
    Object.fromEntries(
      cfg.map(({ name, default: defaultValue = undefined }) => [name, defaultValue]),
    ),
  )

  knobs.fields = cfg.map(({ name, type = 'text', ...props }) => ({
    name,
    type,
    ...props,
  }))

  return knobs
}
