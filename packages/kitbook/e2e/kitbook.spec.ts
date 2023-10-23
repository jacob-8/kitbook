import { expect, test } from '@playwright/test'
import { clearSnapshots, getVariants, runComponentTests } from '../src/lib/test'
import kitbookConfig from '../kitbook.config'

const skipFiles = [
  '/docs/1-variants/DefaultSlot.variants.ts',
  '/lib/routes/sandbox/[...file]/_page.variants.ts',
]

clearSnapshots()
const variantModules = await getVariants({ skipFiles })
runComponentTests({ test, expect, kitbookConfig, variantModules })
