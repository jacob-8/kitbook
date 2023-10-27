import { expect, test } from '@playwright/test'
import { getVariants, runComponentTests } from '../src/lib/test'
import kitbookConfig from '../kitbook.config'

const skipFiles = [
  '/docs/1-variants/DefaultSlot',
  '/lib/routes/sandbox/[...file]/+page',
  '/lib/routes/sandbox/[...file]/mockComponents/NeedsPropsToNotError', // this page intentionally errors
]

const variantModules = await getVariants({ skipFiles })
runComponentTests({ test, expect, kitbookConfig, variantModules })
