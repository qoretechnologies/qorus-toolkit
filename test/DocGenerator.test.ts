import DocGenerator from '../src/managers/DocGenerator';
import TypeDocGenerator from '../src/utils/TypeDocGenerator';
describe('Generate Docs class tests', () => {
  it.only('Generate docs for methods', async () => {
    await TypeDocGenerator();
    const classObj = DocGenerator.getClass('QorusAuthenticator');
    const addEndpointDocs = DocGenerator.getMethodDocs('setEndpointUrl', classObj);
    console.log(JSON.stringify(addEndpointDocs));
  });
});
