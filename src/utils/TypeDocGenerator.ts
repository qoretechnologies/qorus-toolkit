// const TypeDoc = require('typedoc');
import { Application, TSConfigReader, TypeDocReader } from 'typedoc';

export default async function TypeDocGenerate() {
  const app = new Application();

  // If you want TypeDoc to load tsconfig.json / typedoc.json files
  app.options.addReader(new TSConfigReader());
  app.options.addReader(new TypeDocReader());

  app.bootstrap({
    // typedoc options here
    entryPoints: ['src/index.ts'],
  });

  const project = app.convert();

  if (project) {
    // Project may not have converted correctly
    const outputDir = './src/docs';
    await app.generateJson(project, outputDir + '/documentation.json');
  }
}
