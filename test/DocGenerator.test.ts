import DocGenerator from '../src/managers/DocGenerator';
import TypeDocGenerator from '../src/utils/TypeDocGenerator';
describe('Generate Docs class tests', () => {
  beforeAll(async () => {
    await TypeDocGenerator();
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

    expect(methodDocs.hasOwnProperty('async')).toEqual(true);
    expect(methodDocs.hasOwnProperty('comments')).toEqual(true);
    expect(methodDocs.hasOwnProperty('returnTypes')).toEqual(true);
    console.log(methodDocs);
  });
});
