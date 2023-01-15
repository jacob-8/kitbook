import { UserConfig } from 'vite';
import { modifyViteConfigForKitbook } from './modifyViteConfigForKitbook';

const userSpecifiedViteConfigAdjustments: UserConfig = {
  server: {
    port: 4444,
  },
  define: {
    'import.meta.vitest': false,
  },
};

test('modifyViteConfigForKitbook first takes options from user, then from kitbook defaults', () => {
  expect(modifyViteConfigForKitbook(userSpecifiedViteConfigAdjustments)).toMatchInlineSnapshot(`
    {
      "cacheDir": "node_modules/.vite-kitbook",
      "define": {
        "import.meta.vitest": false,
      },
      "server": {
        "fs": {
          "allow": [
            "..",
          ],
        },
        "port": 4444,
      },
    }
  `);
});

