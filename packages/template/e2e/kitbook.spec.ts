import { clearSnapshots, getVariants, runComponentTests } from 'kitbook/test'
import { expect, test } from '@playwright/test'
import kitbookConfig from '../kitbook.config'

clearSnapshots()
const variantModules = await getVariants()
runComponentTests({ test, expect, kitbookConfig, variantModules })
