import DocGenerator from '../DocGenerator';
import { IReturnType } from '../src/stories/types';

describe('Generate Docs class tests', () => {
  jest.setTimeout(50000);
  it('Check if documentation object exist', async () => {
    const classObj = DocGenerator.getClass('QorusAuthenticator');
    expect(DocGenerator.createMethodDocs('addEndpoint', classObj)).not.toEqual(undefined);
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
  it('Should create type alias docs with type object', () => {
    const tVersionDocs = DocGenerator.createTypeAliasDocs('TVersion');
    const tVersionDocsAsIReturnType = tVersionDocs?.type as IReturnType;
    expect(tVersionDocsAsIReturnType.separatorSymbol === '|');
    expect(tVersionDocsAsIReturnType.type).toEqual(['1', '2', '3', '4', '5', '6', 'latest']);

    const tObjectWithAnyKeyDocs = DocGenerator.createTypeAliasDocs('TObjectWithStringKey');
    const tObjectWithAnyKeyDocsAsIReturnType = tObjectWithAnyKeyDocs?.type as IReturnType;
    expect(tObjectWithAnyKeyDocsAsIReturnType.masterType).toEqual('Record');
    expect(tObjectWithAnyKeyDocsAsIReturnType.separatorSymbol).toEqual(',');
    expect(tObjectWithAnyKeyDocsAsIReturnType.type).toEqual(['string', 'string']);

    const tQorusOptionsDocs = DocGenerator.createTypeAliasDocs('TQorusOptions');
    const tQorusOptionsDocsAsIReturnType = tQorusOptionsDocs?.type as IReturnType;
    expect(tQorusOptionsDocsAsIReturnType.masterType).toEqual('Record');
    expect(tQorusOptionsDocsAsIReturnType.separatorSymbol).toEqual(',');
    expect(tQorusOptionsDocsAsIReturnType.type).toEqual(['string', 'IQorusPropertyOptions']);

    // If type alias represents a static type(ex: string) the type object will not have masterType or separatorSymbol properties.
    const tTokenDocs = DocGenerator.createTypeAliasDocs('TToken');
    const tTokenDocsAsIReturnType = tTokenDocs?.type as IReturnType;
    expect(tTokenDocsAsIReturnType.type).toEqual('string');
    expect(tTokenDocsAsIReturnType.type.hasOwnProperty('masterType')).toEqual(false);
    expect(tTokenDocsAsIReturnType.type.hasOwnProperty('separatorSymbol')).toEqual(false);
  });

  it('Should create interface docs with type object', () => {
    const iQorusRequestParamsDocs = DocGenerator.createInterfaceDocs('IQorusRequestParams');
    const propertyParams = iQorusRequestParamsDocs?.params?.find((param) => param.label === 'params');
    const propertyParamsAsIReturnType = propertyParams?.type as IReturnType;
    expect(propertyParamsAsIReturnType.masterType).toEqual('Record');
    expect(propertyParamsAsIReturnType.separatorSymbol).toEqual(',');
    expect(propertyParamsAsIReturnType.type).toEqual(['string', 'string']);
    expect(propertyParamsAsIReturnType.fullType).toEqual('Record<string, string>');
  });
});
