/*

npm run compile
node --experimental-json-modules esbuild.js

cd .\publish-package && npm publish --access=public

cd ./build/package && npm pack && mv -f typeorm-*.tgz ..

*/

import { build } from 'esbuild';
import packageDef from './package.json' assert { type: 'json' };

main();
async function main() {
    try {
        await build({
            entryPoints: ['build/compiled/src/index.js', 'build/compiled/src/cli.js'],
            outdir: 'publish-package',
            platform: 'node',
            bundle: true,
            format: 'esm',
            minify: true,
            external: [
                ...Object.keys(packageDef.dependencies),
                ...Object.keys(packageDef.peerDependencies),
            ],
            target: 'node17.2.0',
            keepNames: true,
            legalComments: 'none',

        });
    } catch(err) {
        process.exit(1);
    }
}
