import DocGenerator from '../DocGenerator';
describe('Generate Docs class tests', () => {
  jest.setTimeout(50000);
  it.only('Check if documentation object exist', async () => {
    const classObj = DocGenerator.getClass('QorusDataProvider');
    console.log(JSON.stringify(DocGenerator.getMethod('setPath', classObj)));
    // expect(DocGenerator.createMethodDocs('getAllEndpoints', classObj)).not.toEqual(undefined);
  });
  it('Generate docs for Classes', async () => {
    const classDocs = DocGenerator.createClassDocs('QorusOptions');
    expect(classDocs?.hasOwnProperty('name')).toEqual(true);
    expect(classDocs?.hasOwnProperty('comments')).toEqual(true);
    expect(classDocs?.hasOwnProperty('properties')).toEqual(true);
  });
  it('Generate docs for Methods', () => {
    const classObj = DocGenerator.getClass('QorusAuthenticator');
    const methodDocs = DocGenerator.createMethodDocs('addEndpoint', classObj);

    expect(methodDocs?.hasOwnProperty('async')).toEqual(true);
    expect(methodDocs?.hasOwnProperty('comments')).toEqual(true);
    expect(methodDocs?.hasOwnProperty('returnTypes')).toEqual(true);
  });
});
