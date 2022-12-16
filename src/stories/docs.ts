export default { classesDocs: [{"name":"QorusAuthenticator","comments":{"summary":"Authentication manager for QorusToolkit, allows to create and manage multiple\nQorusEndpoints","returnSummary":"QorusAuthenticator class object"},"properties":[{"name":"allApiPaths","comments":{"summary":"Object of Api paths for the selected endpoint"},"type":"ApiPaths"},{"name":"apiPathsAuthenticator","comments":{"summary":"Api paths for the QorusAuthenticator"},"type":"ApiPathsAuthenticator"},{"name":"endpoints","comments":{"summary":null},"type":"Endpoint[ ]"},{"name":"noauth","comments":{"summary":"No auth identifier to identify if the no-auth is enabled for the user"},"type":"boolean"},{"name":"selectedEndpoint","comments":{"summary":"Selected endpoint from the endpoints array"},"type":"Endpoint"}]},{"name":"QorusDataProvider","comments":{"summary":null},"properties":[{"name":"context","comments":{"summary":"Current context for the data provider"},"type":"Context"},{"name":"path","comments":{"summary":"Array of path strings, linking to the current provider path extension"},"type":"string[ ]"},{"name":"providerData","comments":{"summary":"Data provider data with children object"},"type":"any"},{"name":"responseData","comments":{"summary":"Get Request response data for a data provider"},"type":"any"},{"name":"responseError","comments":{"summary":"Get Request error data if error received"},"type":"any"}]},{"name":"QorusRequest","comments":{"summary":null},"properties":[{"name":"defaultHeaders","comments":{"summary":"Default headers for the QorusRequest"},"type":"reflection"}]},{"name":"QorusOptions","comments":{"summary":null},"properties":[{"name":"name","comments":{"summary":"Name of the provider option"},"type":"string"},{"name":"providerOptions","comments":{"summary":null},"type":"Properties[ ]"}]},{"name":"QorusValidator","comments":{"summary":"Utility class to validate provider_options properties"},"properties":[{"name":"validate","comments":{"summary":null},"type":"reflection"}]}], methodDocs: [[{"className":"QorusAuthenticator","data":{"async":false,"name":"#fixEndpointData","label":"#fixEndpointData( data: AddEndpoint )","params":[{"label":"data","type":"AddEndpoint","description":"AddEndpoint, data to be fixed"}],"comments":{"summary":"Fixes the endpoint data","returnSummary":"Fixed Endpoint config"},"returnTypes":[{}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"addEndpoint","label":"addEndpoint( endpointConfig: AddEndpoint ): Endpoint","params":[{"label":"endpointConfig","type":"AddEndpoint","description":"Endpoint configuration required to add a new endpoint"}],"comments":{"summary":"Add a new Qorus Endpoint to interact with the qorus api.","returnSummary":"Newly added endpoint"},"returnTypes":[{}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"checkNoAuth","label":"checkNoAuth( endpoint: Endpoint ): Promise< boolean >","params":[{"label":"endpoint","type":"Endpoint","description":"Endpoint config to add the data"}],"comments":{"summary":"Checks if the Qorus endpoint supports no-auth","returnSummary":"True if the no-auth is enabled for the user, False otherwise"},"returnTypes":[{}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getAllEndpoints","label":"getAllEndpoints( )","params":[],"comments":{"summary":"A getter to get all the available Endpoints","returnSummary":"Endpoints array with all the available endpoints"},"returnTypes":[{}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getApiPaths","label":"getApiPaths( ): ApiPaths","params":[],"comments":{"summary":"A getter to return the api paths for the selected Endpoint","returnSummary":"ApiPaths for the selected endpoint if exists, otherwise returns default api paths"},"returnTypes":[{}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getAuthToken","label":"getAuthToken( ): string | undefined","params":[],"comments":{"summary":"A getter to return the auth token of the selected Endpoint","returnSummary":"token if the the selected endpoint exists and the user is authenticated, otherwise returns undefined"},"returnTypes":[{"label":"string"},{"label":"undefined"}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getEndpointById","label":"getEndpointById( endpointId: string ): Endpoint | undefined","params":[{"label":"endpointId","type":"string","description":null}],"comments":{"summary":"A getter to get the endpoint if it exist in the Endpoints array","returnSummary":"Endpoint object if the endpoint with the provided id exist in the endpoints array, undefined otherwise."},"returnTypes":[{"label":"Endpoint"},{"label":"undefined"}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getEndpointVersion","label":"getEndpointVersion( endpointId: string ): Version | undefined","params":[{"label":"endpointId","type":"string","description":"Optional id parameter to get the version of a particular endpoint"}],"comments":{"summary":"A getter to get the api Version of a Endpoint","returnSummary":"Version of the selected endpoint or version of the the endpoint found by id,\nif the endpoint doesn't exists it returns undefined"},"returnTypes":[{"label":"Version"},{"label":"undefined"}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getSelectedEndpoint","label":"getSelectedEndpoint( ): Endpoint | undefined","params":[],"comments":{"summary":"A getter to get selected Endpoint","returnSummary":"Selected Endpoint if the endpoint exists, undefined otherwise"},"returnTypes":[{"label":"Endpoint"},{"label":"undefined"}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"login","label":"login( loginParams: LoginParams ): Promise< string | undefined >","params":[{"label":"loginParams","type":"LoginParams","description":"LoginParams, user and pass is required to authenticate the user."}],"comments":{"summary":"Authenticates the user to interact with the Qorus api.\nIf the username and password is not provided it tries to authenticate the user using the locally stored token from the selected Endpoint","returnSummary":"Authentication token if the authentication is successful, undefined otherwise."},"returnTypes":[{"label":"string"},{"label":"undefined"}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"logout","label":"logout( ): Promise< boolean >","params":[],"comments":{"summary":"Logs out the current user from the selected endpoint","returnSummary":"True if the operation is successful, False otherwise"},"returnTypes":[{}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"renewSelectedEndpointToken","label":"renewSelectedEndpointToken( loginParams: LoginParams ): Promise< string | undefined >","params":[{"label":"loginParams","type":"LoginParams","description":"LoginParams optional username and password can be provided"}],"comments":{"summary":"Allows the user to renew the selected endpoint authentication token","returnSummary":"Token if the authentication is successful, undefined otherwise"},"returnTypes":[{"label":"string"},{"label":"undefined"}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"selectEndpoint","label":"selectEndpoint( id: string ): Promise< Endpoint | undefined >","params":[{"label":"id","type":"string","description":"Id of the endpoint"}],"comments":{"summary":"Select an endpoint from the available Endpoints array","returnSummary":"Endpoint if the operation is successful, undefined otherwise."},"returnTypes":[{"label":"Endpoint"},{"label":"undefined"}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"setEndpointUrl","label":"setEndpointUrl( url: string, endpointId: string ): Promise< string | undefined >","params":[{"label":"endpointId","type":"string","description":null},{"label":"url","type":"string","description":"Base url for the endpoint"}],"comments":{"summary":"A setter to set the url of the selected Endpoint","returnSummary":"Url of the endpoint if the operation is successful, undefined otherwise"},"returnTypes":[{"label":"string"},{"label":"undefined"}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"setEndpointVersion","label":"setEndpointVersion( version: Version, endpointId: string ): Promise< Version | undefined >","params":[{"label":"endpointId","type":"string","description":"Optional parameter to change the url of a particular endpoint from the endpoints array"},{"label":"version","type":"Version","description":"Version of the qorus api"}],"comments":{"summary":"A setter to set the Version of the Endpoint","returnSummary":"Version of the endpoint if the operation is successful, undefined otherwise"},"returnTypes":[{"label":"Version"},{"label":"undefined"}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"validateEndpointData","label":"validateEndpointData( data: intersection, withCredentials: boolean )","params":[{"label":"withCredentials","type":"boolean","description":"boolean to check if the endpoint has credentials"},{"label":"data","type":"LoginParams & AddEndpoint","description":"Endpoint data to be checked"}],"comments":{"summary":"Checks the validity of the selected endpoint","returnSummary":"True if the Endpoint data is valid, False otherwise"},"returnTypes":[{}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"validateLocalUserToken","label":"validateLocalUserToken( endpointId: string ): Promise< string | undefined >","params":[{"label":"endpointId","type":"string","description":"Id of the endpoint"}],"comments":{"summary":"Validates the local stored authentication token for the Endpoint","returnSummary":"Authentication token, if the authentication is successful, null otherwise"},"returnTypes":[{"label":"string"},{"label":"null"}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"validateVersion","label":"validateVersion( version: union )","params":[{"label":"version","type":"number | string","description":null}],"comments":{"summary":null},"returnTypes":[{}]}}],[{"className":"QorusDataProvider","data":{"async":true,"name":"fetchWithContext","label":"fetchWithContext( context: Context ): Promise< undefined >","params":[{"label":"context","type":"Context","description":null}],"comments":{"summary":null},"returnTypes":[{}]}},{"className":"QorusDataProvider","data":{"async":true,"name":"get","label":"get( select: string, providerOptions: any ): Promise< undefined >","params":[{"label":"providerOptions","type":"any","description":null},{"label":"select","type":"string","description":"next children to be selected"}],"comments":{"summary":"Method to select the next children from the current provider for further operations","returnSummary":"{@link QorusDataProvider} new object"},"returnTypes":[{}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getAllOptions","label":"getAllOptions( )","params":[],"comments":{"summary":"A getter to get options by name for a children provider","returnSummary":"QorusOptions object array"},"returnTypes":[{}]}},{"className":"QorusDataProvider","data":{"async":true,"name":"getApi","label":"getApi( ): Promise< undefined >","params":[],"comments":{"summary":"Get record of Data Providers with context 'api'  from /dataprovider/browse endpoint","returnSummary":"array of DataProviders records"},"returnTypes":[{}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getChildren","label":"getChildren( )","params":[],"comments":{"summary":"A getter to get available children for the current provider","returnSummary":"A list of DataProvider children"},"returnTypes":[{}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getChildrenNames","label":"getChildrenNames( )","params":[],"comments":{"summary":"A getter to get children names for the current provider","returnSummary":"list of children names"},"returnTypes":[{}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getContext","label":"getContext( ): Context","params":[],"comments":{"summary":"A getter to get the context for the current provider","returnSummary":"context string"},"returnTypes":[{}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getData","label":"getData( )","params":[],"comments":{"summary":"A getter to get available data for the current provider","returnSummary":"responseData, providerData and errorData for the current provider"},"returnTypes":[{}]}},{"className":"QorusDataProvider","data":{"async":true,"name":"getEvent","label":"getEvent( ): Promise< undefined >","params":[],"comments":{"summary":"Get record of Data Providers with context 'Event'  from /dataprovider/browse endpoint","returnSummary":"Array of DataProviders records"},"returnTypes":[{}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getFinalPath","label":"getFinalPath( path: string )","params":[{"label":"path","type":"string[ ]","description":"Optional path array to generate request path"}],"comments":{"summary":"A getter to get request path for the current provider","returnSummary":"Request path string"},"returnTypes":[{}]}},{"className":"QorusDataProvider","data":{"async":true,"name":"getMessage","label":"getMessage( ): Promise< undefined >","params":[],"comments":{"summary":"Get record of Data Providers with context 'message'  from /dataprovider/browse endpoint","returnSummary":"Array of DataProviders records"},"returnTypes":[{}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getOptions","label":"getOptions( childrenName: string ): QorusOptions | undefined","params":[{"label":"childrenName","type":"string","description":"name of the children provider"}],"comments":{"summary":"A getter to get options by name for a children provider","returnSummary":"QorusOptions object for the data provider children"},"returnTypes":[{"label":"QorusOptions"},{"label":"undefined"}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getPath","label":"getPath( ): string | undefined","params":[],"comments":{"summary":"A getter to the the stored path array for the current provider","returnSummary":"Array of path strings"},"returnTypes":[{"label":"string[ ]"},{"label":"undefined"}]}},{"className":"QorusDataProvider","data":{"async":true,"name":"getRecord","label":"getRecord( ): Promise< undefined >","params":[],"comments":{"summary":"Get record of Data Providers with context 'record' from /dataprovider/browse endpoint","returnSummary":"Array of DataProviders records"},"returnTypes":[{}]}},{"className":"QorusDataProvider","data":{"async":true,"name":"getType","label":"getType( ): Promise< undefined >","params":[],"comments":{"summary":"Get record of Data Providers with context 'type'  from /dataprovider/browse endpoint","returnSummary":"Array of DataProviders records"},"returnTypes":[{}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"has","label":"has( name: string )","params":[{"label":"name","type":"string","description":"Name of the children you want to find"}],"comments":{"summary":"Checks if the children exist on the provider","returnSummary":"True if the children exist, False otherwise"},"returnTypes":[{}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"hasData","label":"hasData( )","params":[],"comments":{"summary":"Method to verify if the current provider has children","returnSummary":"true if the children exist, false otherwise"},"returnTypes":[{}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"setData","label":"setData( responseData: any, providerData: any )","params":[{"label":"providerData","type":"any","description":null},{"label":"responseData","type":"any","description":null}],"comments":{"summary":null},"returnTypes":[{}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"setPath","label":"setPath( path: string )","params":[{"label":"path","type":"string[ ]","description":"Array of path strings to replace for path of the current provider"}],"comments":{"summary":"Setter to set path for the current provider"},"returnTypes":[{}]}}],[{"className":"QorusRequest","data":{"async":true,"name":"deleteReq","label":"deleteReq( props: QorusRequestParams, endpoint: Endpoint ): Promise< T | undefined >","params":[{"label":"endpoint","type":"Endpoint","description":null},{"label":"props","type":"QorusRequestParams","description":"QorusRequestParams endpoint url is mandatory to make a delete request"}],"comments":{"summary":"Delete request creator for the QorusToolkit","returnSummary":"Result of the delete request"},"returnTypes":[{"label":"T"},{"label":"undefined"}]}},{"className":"QorusRequest","data":{"async":true,"name":"get","label":"get( props: QorusRequestParams, endpoint: Endpoint ): Promise< T | undefined >","params":[{"label":"endpoint","type":"Endpoint","description":null},{"label":"props","type":"QorusRequestParams","description":"QorusRequestParams endpoint url is mandatory to make a get request"}],"comments":{"summary":"Get request creator for the QorusToolkit","returnSummary":"Result of the get request"},"returnTypes":[{"label":"T"},{"label":"undefined"}]}},{"className":"QorusRequest","data":{"async":true,"name":"makeRequest","label":"makeRequest( type: union, props: QorusRequestParams, endpoint: Endpoint ): Promise< any >","params":[{"label":"endpoint","type":"Endpoint","description":null},{"label":"props","type":"QorusRequestParams","description":null},{"label":"type","type":"DELETE | POST | PUT | GET","description":null}],"comments":{"summary":null},"returnTypes":[{}]}},{"className":"QorusRequest","data":{"async":true,"name":"post","label":"post( props: QorusRequestParams, endpoint: Endpoint ): Promise< T | undefined >","params":[{"label":"endpoint","type":"Endpoint","description":null},{"label":"props","type":"QorusRequestParams","description":"QorusRequestParams endpoint url is mandatory to make a post request"}],"comments":{"summary":"Post request creator for the QorusToolkit","returnSummary":"Result of the post request"},"returnTypes":[{"label":"T"},{"label":"undefined"}]}},{"className":"QorusRequest","data":{"async":true,"name":"put","label":"put( props: QorusRequestParams, endpoint: Endpoint ): Promise< T | undefined >","params":[{"label":"endpoint","type":"Endpoint","description":null},{"label":"props","type":"QorusRequestParams","description":"QorusRequestParams endpoint url is mandatory to make a put request"}],"comments":{"summary":"Put request creator for the QorusToolkit","returnSummary":"Result of the put request"},"returnTypes":[{"label":"T"},{"label":"undefined"}]}}],[{"className":"QorusOptions","data":{"async":false,"name":"convertToJsType","label":"convertToJsType( type: string )","params":[{"label":"type","type":"string","description":"Type to be converted"}],"comments":{"summary":"A private function to convert types to js types","returnSummary":"Converted type"},"returnTypes":[{}]}},{"className":"QorusOptions","data":{"async":false,"name":"createJsTypes","label":"createJsTypes( types: string )","params":[{"label":"types","type":"string[ ]","description":null}],"comments":{"summary":"A parser function to modify options object","returnSummary":"Object with constructor options"},"returnTypes":[{}]}},{"className":"QorusOptions","data":{"async":false,"name":"get","label":"get( propertyName: string ): Properties | undefined","params":[{"label":"propertyName","type":"string","description":"Name of the property"}],"comments":{"summary":"A getter to get constructor options property object","returnSummary":"Property object with name and value"},"returnTypes":[{"label":"Properties"},{"label":"undefined"}]}},{"className":"QorusOptions","data":{"async":false,"name":"getAll","label":"getAll( ): undefined | undefined","params":[],"comments":{"summary":"Get all values required for the provider","returnSummary":"Array of values for the constructor options if required values exist, undefined otherwise"},"returnTypes":[{"label":"reflection"},{"label":"undefined"}]}},{"className":"QorusOptions","data":{"async":false,"name":"getJsType","label":"getJsType( propertyName: string ): string | undefined","params":[{"label":"propertyName","type":"string","description":"name of the property"}],"comments":{"summary":"A getter to get js types for a property","returnSummary":"js types accepted by the property"},"returnTypes":[{"label":"string[ ]"},{"label":"undefined"}]}},{"className":"QorusOptions","data":{"async":false,"name":"getType","label":"getType( propertyName: string ): string | undefined","params":[{"label":"propertyName","type":"string","description":"Name of the property"}],"comments":{"summary":"A getter to get property type","returnSummary":"Types accepted by the property"},"returnTypes":[{"label":"string[ ]"},{"label":"undefined"}]}},{"className":"QorusOptions","data":{"async":false,"name":"parseChildren","label":"parseChildren( children: any ): ProviderOption | undefined","params":[{"label":"children","type":"any","description":"children for which options will be created"}],"comments":{"summary":"A parser function to modify options object","returnSummary":"Object with provider options"},"returnTypes":[{"label":"ProviderOption"},{"label":"undefined"}]}},{"className":"QorusOptions","data":{"async":false,"name":"set","label":"set( propertyName: string, value: any ): Properties | undefined","params":[{"label":"value","type":"any","description":null},{"label":"propertyName","type":"string","description":"Name of the property"}],"comments":{"summary":"A setter to set constructor options property value","returnSummary":"Property object"},"returnTypes":[{"label":"Properties"},{"label":"undefined"}]}},{"className":"QorusOptions","data":{"async":false,"name":"validate","label":"validate( )","params":[],"comments":{"summary":"A validator to verify if all the required values are provided","returnSummary":"True if all the value exist, False otherwise"},"returnTypes":[{}]}},{"className":"QorusOptions","data":{"async":false,"name":"validateProperty","label":"validateProperty( propertyName: string, value: any )","params":[{"label":"value","type":"any","description":null},{"label":"propertyName","type":"string","description":"Name of the property"}],"comments":{"summary":"A method to validate if the provided value can be used by the property","returnSummary":"True if value can be used, False otherwise"},"returnTypes":[{}]}}],[{"className":"QorusValidator","data":{"async":false,"name":"getTypeFromValue","label":"getTypeFromValue( value: any ): undefined | undefined | undefined | undefined | undefined | undefined | undefined | undefined | undefined","params":[{"label":"value","type":"any","description":"Any accepted type value"}],"comments":{"summary":"Get QorusType from the value","returnSummary":"QorusType string"},"returnTypes":[{"label":"none"},{"label":"null"},{"label":"date"},{"label":"hash"},{"label":"float"},{"label":"bool"},{"label":"list"},{"label":"int"},{"label":"string"}]}},{"className":"QorusValidator","data":{"async":false,"name":"nullType","label":"nullType( type: string )","params":[{"label":"type","type":"string","description":null}],"comments":{"summary":null},"returnTypes":[{}]}}]],interfaceDocs: [{"name":"AddEndpoint","comments":{"summary":null},"params":[{"label":"endpointId","description":"Id for the endpoint provided by the user, unique for every endpoint","type":"string"},{"label":"url","description":"URL to your server for the provided endpoint","type":"string"},{"label":"version","description":"Version for the server api","type":"Version"}]},{"name":"Endpoint","comments":{"summary":null},"params":[{"label":"authToken","description":"Auth token for the user provided endpoint","type":"string"},{"label":"endpointId","description":"Id for the endpoint provided by the user, unique for every endpoint","type":"string"},{"label":"url","description":"URL to your server for the provided endpoint","type":"string"},{"label":"version","description":"Version for the server api","type":"Version"}]},{"name":"LoginParams","comments":{"summary":null},"params":[{"label":"pass","description":"Password for the authentication to your server","type":"string"},{"label":"user","description":"Username for the authentication to your server","type":"string"}]},{"name":"WithQorusAuthToken","comments":{"summary":null},"params":[{"label":"authToken","description":"Auth token for the user provided endpoint","type":"string"}]},{"name":"WithQorusEndpointId","comments":{"summary":null},"params":[{"label":"endpointId","description":"Id for the endpoint provided by the user, unique for every endpoint","type":"string"}]},{"name":"WithQorusURL","comments":{"summary":null},"params":[{"label":"url","description":"URL to your server for the provided endpoint","type":"string"}]},{"name":"QorusRequestParams","comments":{"summary":null},"params":[{"label":"data","description":"Data for the request","type":"any"},{"label":"headers","description":"Headers for the request","type":"AxiosRequestHeaders"},{"label":"params","description":"URL Parameters for the request","type":"Record"},{"label":"path","description":"Complete endpoint url for the request","type":"string"}]},{"name":"Properties","comments":{"summary":null},"params":[{"label":"jsTypes","description":"","type":"string[ ]"},{"label":"name","description":"","type":"string"},{"label":"required","description":"","type":"boolean"},{"label":"types","description":"","type":"string[ ]"},{"label":"value","description":"","type":"null"}]},{"name":"ProviderOption","comments":{"summary":null},"params":[{"label":"name","description":"","type":"string"},{"label":"providerOptions","description":"","type":"Properties[ ]"}]}], typeAliasDocs: [{"name":"Version","comments":{"summary":""},"type":["1","2","3","4","5","6","latest"]}] }