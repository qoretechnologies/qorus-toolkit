import DocGenerator from '../src/utils/DocGenerator';
describe('Generate Docs class tests', () => {
  jest.setTimeout(50000);
  it.only('Check if documentation object exist', async () => {
    // await TypeDocGenerator();
    // await convertProject();
    console.log(JSON.stringify(DocGenerator.getAllMethodsDocs('QorusValidator')));

    // expect(DocGenerator.getAllClasses()).not.toEqual(undefined);
  });
  it('Generate docs for Classes', async () => {
    const classDocs = DocGenerator.getClassDocs('QorusOptions');
    expect(classDocs?.hasOwnProperty('name')).toEqual(true);
    expect(classDocs?.hasOwnProperty('comment')).toEqual(true);
    expect(classDocs?.hasOwnProperty('properties')).toEqual(true);
  });
  it('Generate docs for Methods', () => {
    const classObj = DocGenerator.getClass('QorusAuthenticator');
    const methodDocs = DocGenerator.getMethodDocs('addEndpoint', classObj);

    expect(methodDocs?.hasOwnProperty('async')).toEqual(true);
    expect(methodDocs?.hasOwnProperty('comments')).toEqual(true);
    expect(methodDocs?.hasOwnProperty('returnTypes')).toEqual(true);
  });
  it('Generate interface docs', () => {
    const project = DocGenerator.getProject();
    console.log(project.namespaces[0].interfaces);
  });
});