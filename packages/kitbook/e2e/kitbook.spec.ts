import { expect, test } from '@playwright/test'
import { getVariants, runComponentTests } from '../src/lib/test'
import kitbookConfig from '../kitbook.config'

const skipFiles = [
  '/docs/1-variants/DefaultSlot',
  '/lib/routes/sandbox/[...file]/+page',
]

const variantModules = await getVariants({ skipFiles })
runComponentTests({ test, expect, kitbookConfig, variantModules })
