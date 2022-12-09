import fs from 'fs';
import { Application, TSConfigReader, TypeDocReader } from 'typedoc';
import { ProjectParser } from 'typedoc-json-parser';

const typedocDocs = './src/docs/documentation.json';
const parsedProjectDocs = './src/docs/parsedProjectDocumentation.json';

export default async function TypeDocGenerate() {
  const app = new Application();

  app.options.addReader(new TSConfigReader());
  app.options.addReader(new TypeDocReader());

  app.bootstrap({
    entryPoints: ['src/index.ts'],
  });

  const project = app.convert();

  if (project) {
    await app.generateJson(project, typedocDocs);
  }
}

export const convertProject = async () => {
  const raw = fs.readFileSync(typedocDocs, { encoding: 'utf-8' });
  const parsedData = JSON.parse(raw);
  let projectData: ProjectParser | undefined = new ProjectParser({ data: parsedData });
  fs.writeFileSync(parsedProjectDocs, JSON.stringify(projectData.toJSON()));
  return projectData;
};
