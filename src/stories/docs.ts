export default { classesDocs: [{"name":"QorusAuthenticator","comment":{"description":"Enables the user to authenticate with multiple user defined endpoints","blockTags":[{"name":"returns","text":"QorusAuthenticator object with all the supporting operations"},{"name":"Category","text":"QorusAuthenticator"}]},"properties":[{"name":"allApiPaths","comment":{"description":"All Api paths for the selected endpoint","blockTags":[]},"type":{"kind":"reference","name":"ApiPaths"}},{"name":"apiPathsAuthenticator","comment":{"description":null,"blockTags":[]},"type":{"kind":"reflection"}},{"name":"endpoints","comment":{"description":null,"blockTags":[]},"type":{"kind":"array","name":{"kind":"reference","id":19,"name":"Endpoint","packageName":null,"typeArguments":[]}}},{"name":"noauth","comment":{"description":null,"blockTags":[]},"type":{"kind":"intrinsic","name":"boolean"}},{"name":"selectedEndpoint","comment":{"description":"Selected endpoint from the endpoints array","blockTags":[]},"type":{"kind":"union"}}]},{"name":"QorusDataProvider","comment":{"description":null,"blockTags":[]},"properties":[{"name":"context","comment":{"description":null,"blockTags":[]},"type":{"kind":"reference","name":"Context"}},{"name":"path","comment":{"description":null,"blockTags":[]},"type":{"kind":"array","name":{"kind":"intrinsic","type":"string"}}},{"name":"providerData","comment":{"description":null,"blockTags":[]},"type":{"kind":"intrinsic","name":"any"}},{"name":"responseData","comment":{"description":null,"blockTags":[]},"type":{"kind":"intrinsic","name":"any"}},{"name":"responseError","comment":{"description":null,"blockTags":[]},"type":{"kind":"intrinsic","name":"any"}}]},{"name":"QorusRequest","comment":{"description":null,"blockTags":[]},"properties":[{"name":"defaultHeaders","comment":{"description":"Default headers for the QorusRequest","blockTags":[]},"type":{"kind":"reflection"}}]},{"name":"QorusOptions","comment":{"description":null,"blockTags":[]},"properties":[{"name":"constructorOptions","comment":{"description":null,"blockTags":[]},"type":{"kind":"array","name":{"kind":"reference","id":201,"name":"Properties","packageName":null,"typeArguments":[]}}},{"name":"name","comment":{"description":null,"blockTags":[]},"type":{"kind":"intrinsic","name":"string"}}]},{"name":"QorusValidator","comment":{"description":"Utility class to validate provider_options properties","blockTags":[]},"properties":[{"name":"validate","comment":{"description":null,"blockTags":[]},"type":{"kind":"reflection"}}]}], methodDocs: [[{"className":"QorusAuthenticator","data":{"async":false,"name":"#fixEndpointData","label":"#fixEndpointData(' 'data: AddEndpoint )","params":[{"label":"data","type":"AddEndpoint","description":"AddEndpoint, data to be fixed"}],"comments":{"summary":"Fixed the endpoint data","returnSummary":"Fixed Endpoint config"},"returnTypes":[{"label":""}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"addEndpoint","label":"addEndpoint(' 'endpointConfig: AddEndpoint ): Endpoint","params":[{"label":"endpointConfig","type":"AddEndpoint","description":"AddEndpoint requires url and accepts optional user and pass parameters to initialize the endpoint and then authenticate the user"}],"comments":{"summary":"Add a new Qorus Endpoint to interact with the qorus api.","returnSummary":"Endpoint"},"returnTypes":[{"label":""}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"checkNoAuth","label":"checkNoAuth(' 'endpoint: Endpoint ): Promise< boolean >","params":[{"label":"endpoint","type":"Endpoint","description":"Endpoint config to add the data"}],"comments":{"summary":"Checks if the Qorus endpoint supports no-auth","returnSummary":"True if the no-auth is enabled for the user, False otherwise"},"returnTypes":[{"label":"boolean"}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getAllEndpoints","label":"getAllEndpoints( )","params":[],"comments":{"summary":"A getter to get all the available Endpoints","returnSummary":"Endpoints array with all the available endpoints"},"returnTypes":[{"label":""}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getApiPaths","label":"getApiPaths( ): ApiPaths","params":[],"comments":{"summary":"A getter to return the api paths for the selected Endpoint","returnSummary":"ApiPaths for the selected endpoint if exists, otherwise returns default api paths"},"returnTypes":[{"label":""}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getAuthToken","label":"getAuthToken( ): string | undefined","params":[],"comments":{"summary":"A getter to return the auth token of the selected Endpoint","returnSummary":"token if the the selected endpoint exists and the user is authenticated, otherwise returns undefined"},"returnTypes":[{"label":"string"},{"label":"undefined"}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getEndpointById","label":"getEndpointById(' 'id: string ): Endpoint | undefined","params":[{"label":"id","type":"string","description":"ID of the endpoint ex: \"rippy\""}],"comments":{"summary":"A getter to get the endpoint if it exist in the Endpoints array","returnSummary":"Endpoint if the endpoint with the provided id exist in the endpoints array, undefined otherwise."},"returnTypes":[{"label":"Endpoint"},{"label":"undefined"}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getEndpointVersion","label":"getEndpointVersion(' 'endpointId: string ): Version | undefined","params":[{"label":"endpointId","type":"string","description":"Optional id parameter to get the version of a particular endpoint"}],"comments":{"summary":"A getter to get the api {@link Version} of a {@link Endpoint}","returnSummary":"Version of the selected endpoint or version of the the endpoint found by id,\nif the endpoint doesn't exists it returns undefined"},"returnTypes":[{"label":"Version"},{"label":"undefined"}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getSelectedEndpoint","label":"getSelectedEndpoint( ): Endpoint | undefined","params":[],"comments":{"summary":"A getter to get selected Endpoint","returnSummary":"Selected Endpoint if the endpoint exists, undefined otherwise"},"returnTypes":[{"label":"Endpoint"},{"label":"undefined"}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"login","label":"login(' 'loginParams: LoginParams ): Promise< string | undefined >","params":[{"label":"loginParams","type":"LoginParams","description":"LoginParams, user and pass is required to authenticate the user."}],"comments":{"summary":"Authenticate user to interact with the Qorus api.\nIf the username and password is not provided it tries to authenticate using the locally stored token from the selected Endpoint","returnSummary":"Authentication token if the authentication is successful, undefined otherwise."},"returnTypes":[{"label":"undefined"},{"label":"string"}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"logout","label":"logout( ): Promise< boolean >","params":[],"comments":{"summary":"Logs out the current user from the selected endpoint","returnSummary":"True if the operation is successful, False otherwise"},"returnTypes":[{"label":"boolean"}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"renewSelectedEndpointToken","label":"renewSelectedEndpointToken(' 'loginParams: LoginParams ): Promise< string | undefined >","params":[{"label":"loginParams","type":"LoginParams","description":"LoginParams optional username and password can be provided"}],"comments":{"summary":"Allows the user to renew the selected endpoint authentication token","returnSummary":"Token if the authentication is successful, undefined otherwise"},"returnTypes":[{"label":"undefined"},{"label":"string"}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"selectEndpoint","label":"selectEndpoint(' 'id: string ): Promise< Endpoint | undefined >","params":[{"label":"id","type":"string","description":"Id of the endpoint"}],"comments":{"summary":"Select an endpoint from the available Endpoints array\nselected endpoint","returnSummary":"Endpoint if the operation is successful, false otherwise."},"returnTypes":[{"label":"undefined"},{"label":"Endpoint"}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"setEndpointUrl","label":"setEndpointUrl(' 'url: string,' 'id: string ): Promise< string | undefined >","params":[{"label":"url","type":"string","description":"Base url for the endpoint"},{"label":"id","type":"string","description":"Optional id parameter to change the url of a particular endpoint"}],"comments":{"summary":"A setter to set the url of the selected Endpoint","returnSummary":"Url of the endpoint if the operation is successful, undefined otherwise"},"returnTypes":[{"label":"undefined"},{"label":"string"}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"setEndpointVersion","label":"setEndpointVersion(' 'version: Version,' 'endpointId: string ): Promise< Version | undefined >","params":[{"label":"version","type":"Version","description":"Version of the qorus api"},{"label":"endpointId","type":"string","description":"Optional id parameter to change the url of a particular endpoint from the endpoints array"}],"comments":{"summary":"A setter to set the Version of the Endpoint","returnSummary":"Version of the endpoint if the operation is successful, undefined otherwise"},"returnTypes":[{"label":"undefined"},{"label":"Version"}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"validateEndpointData","label":"validateEndpointData(' 'data: intersection,' 'withCredentials: boolean )","params":[{"label":"data","type":"intersection","description":"{@link AddEndpoint} to be checked"},{"label":"withCredentials","type":"boolean","description":"boolean to check if the endpoint has credentials"}],"comments":{"summary":"Checks the validity of the selected endpoint","returnSummary":"True if the the Endpoint data is valid, False otherwise"},"returnTypes":[{"label":""}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"validateLocalUserToken","label":"validateLocalUserToken(' 'endpointId: string ): Promise< string | undefined >","params":[{"label":"endpointId","type":"string","description":"Id of the endpoint"}],"comments":{"summary":"Validates the local stored authentication token for the Endpoint","returnSummary":"Authentication token, if the authentication is successful, null otherwise"},"returnTypes":[{"label":"literal"},{"label":"string"}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"validateVersion","label":"validateVersion(' 'version: union )","params":[{"label":"version","type":"union","description":null}],"comments":{"summary":null},"returnTypes":[{"label":""}]}}],[{"className":"QorusDataProvider","data":{"async":true,"name":"fetchWithContext","label":"fetchWithContext(' 'context: Context ): Promise< undefined >","params":[{"label":"context","type":"Context","description":null}],"comments":{"summary":null},"returnTypes":[{"label":"reference"}]}},{"className":"QorusDataProvider","data":{"async":true,"name":"get","label":"get(' 'select: string,' 'providerOptions: any ): Promise< undefined >","params":[{"label":"select","type":"string","description":"next children to be selected"},{"label":"providerOptions","type":"any","description":null}],"comments":{"summary":"Method to select the next children from the current provider for further operations"},"returnTypes":[{"label":"reference"}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getAllOptions","label":"getAllOptions( )","params":[],"comments":{"summary":"A getter to get options by name for a children provider\nReturns QorusOptions object array"},"returnTypes":[{"label":""}]}},{"className":"QorusDataProvider","data":{"async":true,"name":"getApi","label":"getApi( ): Promise< undefined >","params":[],"comments":{"summary":"Get record of Data Providers with context 'api'  from /dataprovider/browse endpoint\n\nReturns array of records"},"returnTypes":[{"label":"reference"}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getChildren","label":"getChildren( )","params":[],"comments":{"summary":"A getter to get available children for the current provider\n\nReturns a list of children"},"returnTypes":[{"label":""}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getChildrenNames","label":"getChildrenNames( )","params":[],"comments":{"summary":"A getter to get children names for the current provider\n\nReturns list of children names"},"returnTypes":[{"label":""}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getContext","label":"getContext( ): Context","params":[],"comments":{"summary":"A getter to get the context for the current provider\n\nReturns context string"},"returnTypes":[{"label":""}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getData","label":"getData( )","params":[],"comments":{"summary":"A getter to get available data for the current provider\n\nReturns responseData, providerData and errorData for the current provider"},"returnTypes":[{"label":""}]}},{"className":"QorusDataProvider","data":{"async":true,"name":"getEvent","label":"getEvent( ): Promise< undefined >","params":[],"comments":{"summary":"Get record of Data Providers with context 'Event'  from /dataprovider/browse endpoint\n\nReturns array of records"},"returnTypes":[{"label":"reference"}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getFinalPath","label":"getFinalPath(' 'path: string )","params":[{"label":"path","type":{"kind":"intrinsic","type":"string"},"description":"Optional path array to generate request path\n\nReturns request path string"}],"comments":{"summary":"A getter to get request path for the current provider"},"returnTypes":[{"label":""}]}},{"className":"QorusDataProvider","data":{"async":true,"name":"getMessage","label":"getMessage( ): Promise< undefined >","params":[],"comments":{"summary":"Get record of Data Providers with context 'message'  from /dataprovider/browse endpoint\n\nReturns array of records"},"returnTypes":[{"label":"reference"}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getOptions","label":"getOptions(' 'childrenName: string ): QorusOptions | undefined","params":[{"label":"childrenName","type":"string","description":"name of the children provider\nReturns QorusOptions object"}],"comments":{"summary":"A getter to get options by name for a children provider"},"returnTypes":[{"label":"QorusOptions"},{"label":"undefined"}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getPath","label":"getPath( ): string | undefined","params":[],"comments":{"summary":"A getter to the the stored path array for the current provider\n\nReturns path array"},"returnTypes":[{"label":{"kind":"intrinsic","type":"string"}},{"label":"undefined"}]}},{"className":"QorusDataProvider","data":{"async":true,"name":"getRecord","label":"getRecord( ): Promise< undefined >","params":[],"comments":{"summary":"Get record of Data Providers with context 'record' from /dataprovider/browse endpoint\n\nReturns array of records"},"returnTypes":[{"label":"reference"}]}},{"className":"QorusDataProvider","data":{"async":true,"name":"getType","label":"getType( ): Promise< undefined >","params":[],"comments":{"summary":"Get record of Data Providers with context 'type'  from /dataprovider/browse endpoint\n\nReturns array of records"},"returnTypes":[{"label":"reference"}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"has","label":"has(' 'name: string )","params":[{"label":"name","type":"string","description":"Name of the children you want to find"}],"comments":{"summary":"Checks if the children exist on the provider","returnSummary":"true if the children exist, false otherwise"},"returnTypes":[{"label":""}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"hasData","label":"hasData( )","params":[],"comments":{"summary":"Method to verify if the current provider has children\n\nReturns true if the children exist, false otherwise"},"returnTypes":[{"label":""}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"setData","label":"setData(' 'responseData: any,' 'providerData: any )","params":[{"label":"responseData","type":"any","description":null},{"label":"providerData","type":"any","description":null}],"comments":{"summary":null},"returnTypes":[{"label":""}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"setPath","label":"setPath(' 'path: string )","params":[{"label":"path","type":{"kind":"intrinsic","type":"string"},"description":"array of path strings to replace for path of the current provider"}],"comments":{"summary":"Setter to set path for the current provider"},"returnTypes":[{"label":""}]}}],[{"className":"QorusRequest","data":{"async":true,"name":"deleteReq","label":"deleteReq(' 'props: QorusRequestParams,' 'endpoint: Endpoint ): Promise< T | undefined >","params":[{"label":"props","type":"QorusRequestParams","description":"QorusRequestParams endpoint url is mandatory to make a delete request"},{"label":"endpoint","type":"Endpoint","description":null}],"comments":{"summary":"Delete request creator for the QorusToolkit","returnSummary":"Promise with the result of the delete request"},"returnTypes":[{"label":"undefined"},{"label":"T"}]}},{"className":"QorusRequest","data":{"async":true,"name":"get","label":"get(' 'props: QorusRequestParams,' 'endpoint: Endpoint ): Promise< T | undefined >","params":[{"label":"props","type":"QorusRequestParams","description":"QorusRequestParams endpoint url is mandatory to make a get request"},{"label":"endpoint","type":"Endpoint","description":null}],"comments":{"summary":"Get request creator for the QorusToolkit","returnSummary":"Result of the get request"},"returnTypes":[{"label":"undefined"},{"label":"T"}]}},{"className":"QorusRequest","data":{"async":true,"name":"makeRequest","label":"makeRequest(' 'type: union,' 'props: QorusRequestParams,' 'endpoint: Endpoint ): Promise< any >","params":[{"label":"type","type":"union","description":null},{"label":"props","type":"QorusRequestParams","description":null},{"label":"endpoint","type":"Endpoint","description":null}],"comments":{"summary":null},"returnTypes":[{"label":"any"}]}},{"className":"QorusRequest","data":{"async":true,"name":"post","label":"post(' 'props: QorusRequestParams,' 'endpoint: Endpoint ): Promise< T | undefined >","params":[{"label":"props","type":"QorusRequestParams","description":"QorusRequestParams endpoint url is mandatory to make a post request"},{"label":"endpoint","type":"Endpoint","description":null}],"comments":{"summary":"Post request creator for the QorusToolkit","returnSummary":"Promise with the result of the post request"},"returnTypes":[{"label":"undefined"},{"label":"T"}]}},{"className":"QorusRequest","data":{"async":true,"name":"put","label":"put(' 'props: QorusRequestParams,' 'endpoint: Endpoint ): Promise< T | undefined >","params":[{"label":"props","type":"QorusRequestParams","description":"QorusRequestParams endpoint url is mandatory to make a put request"},{"label":"endpoint","type":"Endpoint","description":null}],"comments":{"summary":"Put request creator for the QorusToolkit","returnSummary":"the promise with the result of the put request"},"returnTypes":[{"label":"undefined"},{"label":"T"}]}}],[{"className":"QorusOptions","data":{"async":false,"name":"convertToJsType","label":"convertToJsType(' 'type: string )","params":[{"label":"type","type":"string","description":"type to be converted"}],"comments":{"summary":"A private function to convert types to js types","returnSummary":"converted type"},"returnTypes":[{"label":""}]}},{"className":"QorusOptions","data":{"async":false,"name":"createJsTypes","label":"createJsTypes(' 'types: string )","params":[{"label":"types","type":{"kind":"intrinsic","type":"string"},"description":null}],"comments":{"summary":"A parser function to modify options object","returnSummary":"object with constructor options {@link ConstructorOption}"},"returnTypes":[{"label":""}]}},{"className":"QorusOptions","data":{"async":false,"name":"get","label":"get(' 'propertyName: string ): Properties | undefined","params":[{"label":"propertyName","type":"string","description":"name of the property"}],"comments":{"summary":"-getProperty-function A getter to get property object","returnSummary":"property object"},"returnTypes":[{"label":"Properties"},{"label":"undefined"}]}},{"className":"QorusOptions","data":{"async":false,"name":"getAll","label":"getAll( ): undefined | undefined","params":[],"comments":{"summary":"-getAll-function Get all values required for the provider","returnSummary":"all values if required values exist, undefined otherwise"},"returnTypes":[{"label":"reflection"},{"label":"undefined"}]}},{"className":"QorusOptions","data":{"async":false,"name":"getJsType","label":"getJsType(' 'propertyName: string ): string | undefined","params":[{"label":"propertyName","type":"string","description":"name of the property"}],"comments":{"summary":"-getJsType-function A getter to get js types for a property","returnSummary":"js types accepted by the property"},"returnTypes":[{"label":{"kind":"intrinsic","type":"string"}},{"label":"undefined"}]}},{"className":"QorusOptions","data":{"async":false,"name":"getType","label":"getType(' 'propertyName: string ): string | undefined","params":[{"label":"propertyName","type":"string","description":"name of the property"}],"comments":{"summary":"-getTypeOptions-function A getter to get property type","returnSummary":"types accepted by the property"},"returnTypes":[{"label":{"kind":"intrinsic","type":"string"}},{"label":"undefined"}]}},{"className":"QorusOptions","data":{"async":false,"name":"parseChildren","label":"parseChildren(' 'children: any ): ConstructorOption | undefined","params":[{"label":"children","type":"any","description":"children for which options will be created"}],"comments":{"summary":"A parser function to modify options object","returnSummary":"object with constructor options {@link ConstructorOption}"},"returnTypes":[{"label":"ConstructorOption"},{"label":"undefined"}]}},{"className":"QorusOptions","data":{"async":false,"name":"set","label":"set(' 'propertyName: string,' 'value: any ): Properties | undefined","params":[{"label":"propertyName","type":"string","description":"name of the property"},{"label":"value","type":"any","description":null}],"comments":{"summary":"-setOptions-function A setter to set property value","returnSummary":"property object"},"returnTypes":[{"label":"Properties"},{"label":"undefined"}]}},{"className":"QorusOptions","data":{"async":false,"name":"validate","label":"validate( )","params":[],"comments":{"summary":"-validate-function A validator to verify if all the required values are provided","returnSummary":"true if all the value exist, false otherwise"},"returnTypes":[{"label":""}]}},{"className":"QorusOptions","data":{"async":false,"name":"validateProperty","label":"validateProperty(' 'propertyName: string,' 'value: any )","params":[{"label":"propertyName","type":"string","description":"name of the property"},{"label":"value","type":"any","description":null}],"comments":{"summary":"-validateProperty-function A method to validate if the provided value can be used by the property","returnSummary":"true if value can be used false otherwise"},"returnTypes":[{"label":""}]}}],[{"className":"QorusValidator","data":{"async":false,"name":"getTypeFromValue","label":"getTypeFromValue(' 'value: any ): undefined | undefined | undefined | undefined | undefined | undefined | undefined | undefined | undefined","params":[{"label":"value","type":"any","description":"any accepted type value"}],"comments":{"summary":"Get QorusType from the value","returnSummary":"QorusType string"},"returnTypes":[{"label":"literal"},{"label":"literal"},{"label":"literal"},{"label":"literal"},{"label":"literal"},{"label":"literal"},{"label":"literal"},{"label":"literal"},{"label":"literal"}]}},{"className":"QorusValidator","data":{"async":false,"name":"nullType","label":"nullType(' 'type: string )","params":[{"label":"type","type":"string","description":null}],"comments":{"summary":null},"returnTypes":[{"label":""}]}}]] }