import DocGenerator from '../src/managers/DocGenerator';

describe('Generate Docs class tests', () => {
  it.only('Generate docs for methods', () => {
    const classObj = DocGenerator.getClass('QorusAuthenticator');
    const addEndpointDocs = DocGenerator.getMethodDocs('setEndpointUrl', classObj);
    console.log(JSON.stringify(addEndpointDocs));
  });
});
