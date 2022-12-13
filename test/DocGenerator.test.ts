import DocGenerator from '../DocGenerator';
describe('Generate Docs class tests', () => {
  jest.setTimeout(50000);
  it.only('Check if documentation object exist', async () => {
    // const interfaceObj = DocGenerator.getInterface('AddEndpoint');
    const docs = DocGenerator.getInterface('Properties');
    console.log(JSON.stringify(docs));
    // expect(DocGenerator.getMethodDocs('getRecord', 'Qorus')).not.toEqual(undefined);
  });
  it('Check if documentation object exist', async () => {
    const classObj = DocGenerator.getClass('QorusAuthenticator');
    expect(DocGenerator.getMethodDocs('getRecord', classObj)).not.toEqual(undefined);
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
});
