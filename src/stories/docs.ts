export default { classesDocs: [{"name":"QorusAuthenticator","comments":{"summary":"QorusAuthenticator class provides methods to authenticate a user for a Qorus server endpoint\n- Add Multiple endpoint for different versions of Qorus apis\n- Supports no-auth for the Qorus server api\n- Uses locally stored token or user and password for authentication","returnSummary":"QorusAuthenticator class object"},"properties":[{"name":"allApiPaths","comments":{"summary":"Object of Api paths for the selected endpoint"},"type":"IApiPaths"},{"name":"apiPathsAuthenticator","comments":{"summary":"Api paths for the QorusAuthenticator"},"type":"IApiPathsAuthenticator"},{"name":"endpoints","comments":{"summary":"Array of user defined endpoints"},"type":"IEndpoint[ ]"},{"name":"noauth","comments":{"summary":"No auth identifier to identify if the no-auth is enabled for the user"},"type":"boolean"},{"name":"selectedEndpoint","comments":{"summary":"Selected endpoint from the endpoints array"},"type":"IEndpoint | undefined"}]},{"name":"QorusDataProvider","comments":{"summary":"QorusDataProvider class provides methods to interact with Qorus DataProvider api\n- Fetch DataProvider from a Qorus server endpoint\n- Access DataProvider constructor_options with supported operations: get, set, fetch\n- Provides validation for the values of DataProvider constructor_options properties","returnSummary":"QorusDataProvider class object"},"properties":[{"name":"context","comments":{"summary":"Current context for the data provider"},"type":"TContext"},{"name":"path","comments":{"summary":"Array of path strings, linking to the current provider path extension"},"type":"string[ ]"},{"name":"responseData","comments":{"summary":"Get Request response data for a data provider"},"type":"IDataProviderResponseData"},{"name":"responseError","comments":{"summary":"Get Request error data if error received"},"type":"IResponseError"}]},{"name":"QorusRequest","comments":{"summary":"QorusRequest class is wrapper for https request to Qorus server apis\n- Adds default headers to the https request\n- Allows creation of request parameters from a js object\n- Allows custom headers and data object","returnSummary":"QorusRequest class object"},"properties":[{"name":"defaultHeaders","comments":{"summary":"Default headers for the QorusRequest"},"type":"IDefaultHeaders"}]},{"name":"QorusOptions","comments":{"summary":"QorusOptions is a helper class which makes working Qorus DataProvider constructor_options easier\n- Validate constructor_options property value\n- set and get constructor_options property values","returnSummary":"QorusOptions class object"},"properties":[{"name":"dataProviderConstructorOptions","comments":{"summary":null},"type":"TDataProviderChildrenConstructorOptions"},{"name":"name","comments":{"summary":"Name of the provider option"},"type":"string"}]},{"name":"QorusValidator","comments":{"summary":"QorusValidator is a helper class to verify the validity for Qorus types and their values\n- Verify if a value can be used for Qorus type","returnSummary":"QorusValidator class object"},"properties":[]}], methodDocs: [{"className":"QorusAuthenticator","data":{"async":false,"name":"addEndpoint","label":"addEndpoint( endpointConfig: IAddEndpoint ): IEndpoint","params":[{"label":"endpointConfig","type":"IAddEndpoint","description":"Endpoint configuration required to add a new endpoint"}],"comments":{"summary":"Add a new Qorus Endpoint to interact with the qorus api","returnSummary":"Newly added endpoint"},"returnTypes":[{"label":"IEndpoint"}],"accessibility":"public"}},{"className":"QorusAuthenticator","data":{"async":true,"name":"checkNoAuth","label":"checkNoAuth( endpoint: IEndpoint ): Promise< boolean >","params":[{"label":"endpoint","type":"IEndpoint","description":"Endpoint config to add the data"}],"comments":{"summary":"Checks if the Qorus endpoint supports no-auth","returnSummary":"True if the no-auth is enabled for the user, False otherwise"},"returnTypes":[{"label":"boolean"}],"accessibility":"public"}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getAllEndpoints","label":"getAllEndpoints( ): IEndpoint[ ]","params":[],"comments":{"summary":"A getter to get all the available Endpoints","returnSummary":"Endpoints array with all the available endpoints"},"returnTypes":[{"label":"IEndpoint[ ]"}],"accessibility":"public"}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getApiPaths","label":"getApiPaths( ): IApiPaths","params":[],"comments":{"summary":"A getter to return the api paths for the selected Endpoint","returnSummary":"ApiPaths for the selected endpoint if exists, otherwise returns default api paths"},"returnTypes":[{"label":"IApiPaths"}],"accessibility":"public"}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getAuthToken","label":"getAuthToken( ): string | undefined","params":[],"comments":{"summary":"A getter to return the auth token of the selected Endpoint","returnSummary":"token if the the selected endpoint exists and the user is authenticated, otherwise returns undefined"},"returnTypes":[{"label":"string"},{"label":"undefined"}],"accessibility":"public"}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getEndpointById","label":"getEndpointById( endpointId: string ): IEndpoint | undefined","params":[{"label":"endpointId","type":"string","description":null}],"comments":{"summary":"A getter to get the endpoint if it exist in the Endpoints array","returnSummary":"Endpoint object if the endpoint with the provided id exist in the endpoints array, undefined otherwise."},"returnTypes":[{"label":"IEndpoint"},{"label":"undefined"}],"accessibility":"public"}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getEndpointVersion","label":"getEndpointVersion( endpointId: string ): TVersion | undefined","params":[{"label":"endpointId","type":"string","description":"Optional id parameter to get the version of a particular endpoint"}],"comments":{"summary":"A getter to get the api Version of a Endpoint","returnSummary":"Version of the selected endpoint or version of the the endpoint found by id,\nif the endpoint doesn't exists it returns undefined"},"returnTypes":[{"label":"TVersion"},{"label":"undefined"}],"accessibility":"public"}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getSelectedEndpoint","label":"getSelectedEndpoint( ): IEndpoint | undefined","params":[],"comments":{"summary":"A getter to get selected Endpoint","returnSummary":"Selected Endpoint if the endpoint exists, undefined otherwise"},"returnTypes":[{"label":"IEndpoint"},{"label":"undefined"}],"accessibility":"public"}},{"className":"QorusAuthenticator","data":{"async":true,"name":"login","label":"login( loginParams: ILoginParams ): Promise< string | undefined >","params":[{"label":"loginParams","type":"ILoginParams","description":"LoginParams, user and pass is required to authenticate the user."}],"comments":{"summary":"Authenticates the user to interact with the Qorus api.\nIf the username and password is not provided it tries to authenticate the user using the locally stored token from the selected Endpoint","returnSummary":"Authentication token if the authentication is successful, undefined otherwise."},"returnTypes":[{"label":"string"},{"label":"undefined"}],"accessibility":"public"}},{"className":"QorusAuthenticator","data":{"async":true,"name":"logout","label":"logout( ): Promise< boolean >","params":[],"comments":{"summary":"Logs out the current user from the selected endpoint","returnSummary":"True if the operation is successful, False otherwise"},"returnTypes":[{"label":"boolean"}],"accessibility":"public"}},{"className":"QorusAuthenticator","data":{"async":true,"name":"renewSelectedEndpointToken","label":"renewSelectedEndpointToken( loginParams: ILoginParams ): Promise< string | undefined >","params":[{"label":"loginParams","type":"ILoginParams","description":"LoginParams optional username and password can be provided"}],"comments":{"summary":"Allows the user to renew the selected endpoint authentication token","returnSummary":"Token if the authentication is successful, undefined otherwise"},"returnTypes":[{"label":"string"},{"label":"undefined"}],"accessibility":"public"}},{"className":"QorusAuthenticator","data":{"async":true,"name":"selectEndpoint","label":"selectEndpoint( id: string ): Promise< IEndpoint | undefined >","params":[{"label":"id","type":"string","description":"Id of the endpoint"}],"comments":{"summary":"Select an endpoint from the available Endpoints array","returnSummary":"Endpoint if the operation is successful, undefined otherwise."},"returnTypes":[{"label":"IEndpoint"},{"label":"undefined"}],"accessibility":"public"}},{"className":"QorusAuthenticator","data":{"async":true,"name":"setEndpointUrl","label":"setEndpointUrl( url: string, endpointId: string ): Promise< string | undefined >","params":[{"label":"url","type":"string","description":"Base url for the endpoint"},{"label":"endpointId","type":"string","description":null}],"comments":{"summary":"A setter to set the url of the selected Endpoint","returnSummary":"Url of the endpoint if the operation is successful, undefined otherwise"},"returnTypes":[{"label":"string"},{"label":"undefined"}],"accessibility":"public"}},{"className":"QorusAuthenticator","data":{"async":true,"name":"setEndpointVersion","label":"setEndpointVersion( version: TVersion, endpointId: string ): Promise< TVersion | undefined >","params":[{"label":"version","type":"TVersion","description":"Version of the qorus api"},{"label":"endpointId","type":"string","description":"Optional parameter to change the url of a particular endpoint from the endpoints array"}],"comments":{"summary":"A setter to set the Version of a Endpoint","returnSummary":"Version of the endpoint if the operation is successful, undefined otherwise"},"returnTypes":[{"label":"TVersion"},{"label":"undefined"}],"accessibility":"public"}},{"className":"QorusAuthenticator","data":{"async":false,"name":"validateEndpointData","label":"validateEndpointData( data: ILoginParams & IAddEndpoint, withCredentials: boolean ): boolean","params":[{"label":"data","type":"IAddEndpoint & ILoginParams","description":"Endpoint data to be checked"},{"label":"withCredentials","type":"boolean","description":"boolean to check if the endpoint has credentials"}],"comments":{"summary":"Checks the validity of the selected endpoint","returnSummary":"True if the Endpoint data is valid, False otherwise"},"returnTypes":[{"label":"boolean"}],"accessibility":"public"}},{"className":"QorusAuthenticator","data":{"async":true,"name":"validateLocalUserToken","label":"validateLocalUserToken( endpointId: string ): Promise< string | null >","params":[{"label":"endpointId","type":"string","description":"Id of the endpoint"}],"comments":{"summary":"Validates the local stored authentication token for the Endpoint","returnSummary":"Authentication token, if the authentication is successful, null otherwise"},"returnTypes":[{"label":"string"},{"label":"null"}],"accessibility":"public"}},{"className":"QorusDataProvider","data":{"async":true,"name":"get","label":"get( select: string, providerOptions: any ): Promise< QorusDataProvider >","params":[{"label":"select","type":"string","description":"next children to be selected"},{"label":"providerOptions","type":"any","description":null}],"comments":{"summary":"Method to select the next children from the current provider for further operations","returnSummary":"{@link QorusDataProvider} new object"},"returnTypes":[{"label":"QorusDataProvider"}],"accessibility":"public"}},{"className":"QorusDataProvider","data":{"async":false,"name":"getAllOptions","label":"getAllOptions( ): QorusOptions[ ]","params":[],"comments":{"summary":"A getter to get options by name for a children provider","returnSummary":"QorusOptions object array"},"returnTypes":[{"label":"QorusOptions[ ]"}],"accessibility":"public"}},{"className":"QorusDataProvider","data":{"async":true,"name":"getApi","label":"getApi( ): Promise< QorusDataProvider >","params":[],"comments":{"summary":"Get record of Data Providers with context 'api'  from /dataprovider/browse endpoint","returnSummary":"A new DataProvider object with response from browse api as context api"},"returnTypes":[{"label":"QorusDataProvider"}],"accessibility":"public"}},{"className":"QorusDataProvider","data":{"async":false,"name":"getChildren","label":"getChildren( ): IDataProviderChildren[ ] | undefined","params":[],"comments":{"summary":"A getter to get available children for the current provider","returnSummary":"A list of DataProvider children"},"returnTypes":[{"label":"IDataProviderChildren[ ]"},{"label":"undefined"}],"accessibility":"public"}},{"className":"QorusDataProvider","data":{"async":false,"name":"getChildrenNames","label":"getChildrenNames( ): Record<string, string>","params":[],"comments":{"summary":"A getter to get children names for the current provider","returnSummary":"list of children names"},"returnTypes":[{"label":"string"},{"label":"string"}],"accessibility":"public"}},{"className":"QorusDataProvider","data":{"async":false,"name":"getContext","label":"getContext( ): TContext","params":[],"comments":{"summary":"A getter to get the context for the current provider","returnSummary":"Context for the api ex: \"record\";"},"returnTypes":[{"label":"TContext"}],"accessibility":"public"}},{"className":"QorusDataProvider","data":{"async":false,"name":"getData","label":"getData( ): IQorusDataProviderData","params":[],"comments":{"summary":"A getter to get available data for the current provider","returnSummary":"responseData and errorData for the current provider"},"returnTypes":[{"label":"IQorusDataProviderData"}],"accessibility":"public"}},{"className":"QorusDataProvider","data":{"async":true,"name":"getEvent","label":"getEvent( ): Promise< QorusDataProvider >","params":[],"comments":{"summary":"Get record of Data Providers with context 'Event'  from /dataprovider/browse endpoint","returnSummary":"A new DataProvider object with response from browse api as context event"},"returnTypes":[{"label":"QorusDataProvider"}],"accessibility":"public"}},{"className":"QorusDataProvider","data":{"async":false,"name":"getFinalPath","label":"getFinalPath( path: string[ ] ): string","params":[{"label":"path","type":"string[ ]","description":"Optional path array to generate request path"}],"comments":{"summary":"A getter to get request path for the current provider","returnSummary":"Request path string"},"returnTypes":[{"label":"string"}],"accessibility":"public"}},{"className":"QorusDataProvider","data":{"async":true,"name":"getMessage","label":"getMessage( ): Promise< QorusDataProvider >","params":[],"comments":{"summary":"Get record of Data Providers with context 'message'  from /dataprovider/browse endpoint","returnSummary":"A new DataProvider object with response from browse api as context message"},"returnTypes":[{"label":"QorusDataProvider"}],"accessibility":"public"}},{"className":"QorusDataProvider","data":{"async":false,"name":"getOptions","label":"getOptions( childrenName: string ): QorusOptions | undefined","params":[{"label":"childrenName","type":"string","description":"name of the children provider"}],"comments":{"summary":"A getter to get options by name for a children provider","returnSummary":"QorusOptions object for the data provider children"},"returnTypes":[{"label":"QorusOptions"},{"label":"undefined"}],"accessibility":"public"}},{"className":"QorusDataProvider","data":{"async":false,"name":"getPath","label":"getPath( ): string[ ] | undefined","params":[],"comments":{"summary":"A getter to the the stored path array for the current provider","returnSummary":"Array of path strings"},"returnTypes":[{"label":"string[ ]"},{"label":"undefined"}],"accessibility":"public"}},{"className":"QorusDataProvider","data":{"async":true,"name":"getRecord","label":"getRecord( ): Promise< QorusDataProvider >","params":[],"comments":{"summary":"Get record of Data Providers with context 'record' from /dataprovider/browse endpoint","returnSummary":"A new DataProvider object with response from browse api as context record"},"returnTypes":[{"label":"QorusDataProvider"}],"accessibility":"public"}},{"className":"QorusDataProvider","data":{"async":true,"name":"getType","label":"getType( ): Promise< QorusDataProvider >","params":[],"comments":{"summary":"Get record of Data Providers with context 'type'  from /dataprovider/browse endpoint","returnSummary":"A new DataProvider object with response from browse api as context type"},"returnTypes":[{"label":"QorusDataProvider"}],"accessibility":"public"}},{"className":"QorusDataProvider","data":{"async":false,"name":"has","label":"has( name: string ): boolean","params":[{"label":"name","type":"string","description":"Name of the children you want to find"}],"comments":{"summary":"Checks if the children exist on the provider","returnSummary":"True if the children exist, False otherwise"},"returnTypes":[{"label":"boolean"}],"accessibility":"public"}},{"className":"QorusDataProvider","data":{"async":false,"name":"hasData","label":"hasData( ): boolean","params":[],"comments":{"summary":"Method to verify if the current provider has children","returnSummary":"true if the children exist, false otherwise"},"returnTypes":[{"label":"boolean"}],"accessibility":"public"}},{"className":"QorusDataProvider","data":{"async":false,"name":"setPath","label":"setPath( path: string[ ] ): void","params":[{"label":"path","type":"string[ ]","description":"Array of path strings to replace for path of the current provider"}],"comments":{"summary":"Setter to set path for the current provider"},"returnTypes":[{"label":"void"}],"accessibility":"public"}},{"className":"QorusRequest","data":{"async":true,"name":"deleteReq","label":"deleteReq( props: IQorusRequestParams, endpoint: IEndpoint ): Promise< T | undefined >","params":[{"label":"props","type":"IQorusRequestParams","description":"QorusRequestParams endpoint url is mandatory to make a delete request"},{"label":"endpoint","type":"IEndpoint","description":null}],"comments":{"summary":"Delete request creator for the QorusToolkit","returnSummary":"Result of the delete request"},"returnTypes":[{"label":"T"},{"label":"undefined"}],"accessibility":"public"}},{"className":"QorusRequest","data":{"async":true,"name":"get","label":"get( props: IQorusRequestParams, endpoint: IEndpoint ): Promise< T | undefined >","params":[{"label":"props","type":"IQorusRequestParams","description":"QorusRequestParams endpoint url is mandatory to make a get request"},{"label":"endpoint","type":"IEndpoint","description":null}],"comments":{"summary":"Get request creator for the QorusToolkit","returnSummary":"Result of the get request"},"returnTypes":[{"label":"T"},{"label":"undefined"}],"accessibility":"public"}},{"className":"QorusRequest","data":{"async":true,"name":"post","label":"post( props: IQorusRequestParams, endpoint: IEndpoint ): Promise< T | undefined >","params":[{"label":"props","type":"IQorusRequestParams","description":"QorusRequestParams endpoint url is mandatory to make a post request"},{"label":"endpoint","type":"IEndpoint","description":null}],"comments":{"summary":"Post request creator for the QorusToolkit","returnSummary":"Result of the post request"},"returnTypes":[{"label":"T"},{"label":"undefined"}],"accessibility":"public"}},{"className":"QorusRequest","data":{"async":true,"name":"put","label":"put( props: IQorusRequestParams, endpoint: IEndpoint ): Promise< T | undefined >","params":[{"label":"props","type":"IQorusRequestParams","description":"QorusRequestParams endpoint url is mandatory to make a put request"},{"label":"endpoint","type":"IEndpoint","description":null}],"comments":{"summary":"Put request creator for the QorusToolkit","returnSummary":"Result of the put request"},"returnTypes":[{"label":"T"},{"label":"undefined"}],"accessibility":"public"}},{"className":"QorusOptions","data":{"async":false,"name":"get","label":"get( optionName: string ): IDataProviderChildrenConstructorPropertyOptions | undefined","params":[{"label":"optionName","type":"string","description":null}],"comments":{"summary":"A getter to get constructor options property object","returnSummary":"Property object with name and value"},"returnTypes":[{"label":"IDataProviderChildrenConstructorPropertyOptions"},{"label":"undefined"}],"accessibility":"public"}},{"className":"QorusOptions","data":{"async":false,"name":"getAll","label":"getAll( ): TObjectWithStringKey | undefined","params":[],"comments":{"summary":"Get all values required for the provider","returnSummary":"Array of values for the constructor options if required values exist, undefined otherwise"},"returnTypes":[{"label":"TObjectWithStringKey"},{"label":"undefined"}],"accessibility":"public"}},{"className":"QorusOptions","data":{"async":false,"name":"getJsType","label":"getJsType( propertyName: string ): string[ ] | undefined","params":[{"label":"propertyName","type":"string","description":"name of the property"}],"comments":{"summary":"A getter to get js types for a property","returnSummary":"js types accepted by the property"},"returnTypes":[{"label":"string[ ]"},{"label":"undefined"}],"accessibility":"public"}},{"className":"QorusOptions","data":{"async":false,"name":"getType","label":"getType( propertyName: string ): string[ ] | undefined","params":[{"label":"propertyName","type":"string","description":"Name of the property"}],"comments":{"summary":"A getter to get property type","returnSummary":"Types accepted by the property"},"returnTypes":[{"label":"string[ ]"},{"label":"undefined"}],"accessibility":"public"}},{"className":"QorusOptions","data":{"async":false,"name":"set","label":"set( propertyName: string, value: any ): IDataProviderChildrenConstructorPropertyOptions | undefined","params":[{"label":"propertyName","type":"string","description":"Name of the property"},{"label":"value","type":"any","description":null}],"comments":{"summary":"A setter to set constructor options property value","returnSummary":"Property object"},"returnTypes":[{"label":"IDataProviderChildrenConstructorPropertyOptions"},{"label":"undefined"}],"accessibility":"public"}},{"className":"QorusOptions","data":{"async":false,"name":"validate","label":"validate( propertyName: string, value: any ): boolean","params":[{"label":"propertyName","type":"string","description":"Name of the property"},{"label":"value","type":"any","description":null}],"comments":{"summary":"A method to validate if the provided value can be used by the property","returnSummary":"True if value can be used, False otherwise"},"returnTypes":[{"label":"boolean"}],"accessibility":"public"}},{"className":"QorusOptions","data":{"async":false,"name":"validateRequired","label":"validateRequired( ): boolean","params":[],"comments":{"summary":"A validator method to check if all the required properties for a data provider contains a value","returnSummary":"True if values for all the required properties exist, false otherwise"},"returnTypes":[{"label":"boolean"}],"accessibility":"public"}},{"className":"QorusValidator","data":{"async":false,"name":"getTypeFromValue","label":"getTypeFromValue( value: any ): none | null | date | hash | float | bool | list | int | string","params":[{"label":"value","type":"any","description":"Any accepted type value"}],"comments":{"summary":"Get QorusType from the value","returnSummary":"QorusType string"},"returnTypes":[{"label":"none"},{"label":"null"},{"label":"date"},{"label":"hash"},{"label":"float"},{"label":"bool"},{"label":"list"},{"label":"int"},{"label":"string"}],"accessibility":"public"}},{"className":"QorusValidator","data":{"async":false,"name":"validate","label":"validate( type: string, value: any, canBeNull: boolean ): boolean","params":[{"label":"type","type":"string","description":"type of value for the property"},{"label":"value","type":"any","description":"value for the property"},{"label":"canBeNull","type":"boolean","description":"if the value can be null"}],"comments":{"summary":"Validate property for the provider-options for data-provider","returnSummary":"True if the value can be accepted for the type, False otherwise"},"returnTypes":[{"label":"boolean"}],"accessibility":"public"}}],interfaceDocs: [{"name":"IAddEndpoint","comments":{"summary":null},"params":[{"label":"endpointId","description":"Id for a endpoint provided by the user, unique for every endpoint","type":"string"},{"label":"url","description":"URL to Qorus server for the provided endpoint","type":"string"},{"label":"version","description":"Version for the server api","type":"TVersion"}]},{"name":"IEndpoint","comments":{"summary":null},"params":[{"label":"authToken","description":"Authentication token for the user provided endpoint","type":"string"},{"label":"endpointId","description":"Id for a endpoint provided by the user, unique for every endpoint","type":"string"},{"label":"url","description":"URL to Qorus server for the provided endpoint","type":"string"},{"label":"version","description":"Version for the server api","type":"TVersion"}]},{"name":"ILoginParams","comments":{"summary":null},"params":[{"label":"pass","description":"Password for the authentication to Qorus server","type":"string"},{"label":"user","description":"Username for the authentication to Qorus server","type":"string"}]},{"name":"IWithQorusAuthToken","comments":{"summary":null},"params":[{"label":"authToken","description":"Authentication token for the user provided endpoint","type":"string"}]},{"name":"IWithQorusEndpointId","comments":{"summary":null},"params":[{"label":"endpointId","description":"Id for a endpoint provided by the user, unique for every endpoint","type":"string"}]},{"name":"IWithQorusURL","comments":{"summary":null},"params":[{"label":"url","description":"URL to Qorus server for the provided endpoint","type":"string"}]},{"name":"IDataProviderChildren","comments":{"summary":null},"params":[{"label":"constructor_options","description":"Constructor options for the DataProvider children","type":"TDataProviderChildrenConstructorOptions"},{"label":"desc","description":"Description for the DataProvider children","type":"string"},{"label":"name","description":"Name of the DataProvider children","type":"string"},{"label":"type","description":"Type of data provider children ex: \"nav\"","type":"string"}]},{"name":"IDataProviderChildrenConstructorPropertyOptions","comments":{"summary":null},"params":[{"label":"desc","description":"Description of DataProvider constructor_options property","type":"string"},{"label":"jsType","description":"Converted Qorus types to jsTypes","type":"string[ ]"},{"label":"name","description":"Name of the property from construction_options of DataProvider","type":"string"},{"label":"required","description":"Verifies if the DataProvider constructor_options property is required","type":"boolean"},{"label":"sensitive","description":"Verifies if the DataProvider constructor_options property is sensitive","type":"boolean"},{"label":"type","description":"Accepted types for the DataProvider constructor_options property","type":"string[ ]"},{"label":"value","description":"Property value for a DataProvider constructor_options property","type":"any"}]},{"name":"IDataProviderData","comments":{"summary":null},"params":[{"label":"errorData","description":"QorusDataProvider fetch error","type":"IResponseError"},{"label":"responseData","description":"QorusDataProvider fetch response","type":"IDataProviderResponseData"}]},{"name":"IDataProviderResponseData","comments":{"summary":null},"params":[{"label":"children","description":"Array of children from a DataProvider","type":"IDataProviderChildren[ ]"},{"label":"matches_context","description":"Verifies if DataProvider have further context/children","type":"boolean"},{"label":"type","description":"Type of DataProvider","type":"string"}]},{"name":"IQorusDataProviderConstructorOptions","comments":{"summary":null},"params":[{"label":"context","description":"Context for the Qorus DataProvider api ex: 'record'","type":"TContext"},{"label":"path","description":"Path to a DataProvider","type":"string[ ]"},{"label":"responseData","description":"Qorus DataProvider api response data","type":"IDataProviderResponseData"},{"label":"responseError","description":"Error received if any from the Qorus DataProvider api","type":"IResponseError"}]},{"name":"IQorusDataProviderData","comments":{"summary":null},"params":[{"label":"errorData","description":"Error data received from the QorusDataProvider api","type":"IResponseError"},{"label":"responseData","description":"Response data received from the QorusDataProvider api","type":"IDataProviderResponseData"}]},{"name":"IResponseError","comments":{"summary":"Get request error data from DataProvider api"},"params":[{"label":"desc","description":"Description for the fetch error","type":"string"},{"label":"err","description":"Error info for the fetch error","type":"string"},{"label":"status","description":"Error status code for fetch error","type":"number"}]},{"name":"IDefaultHeaders","comments":{"summary":null},"params":[{"label":"Accept","description":"Accepted data format type by Qorus server","type":"string"},{"label":"Content-Type","description":"Content type for the Qorus request","type":"string"}]},{"name":"IQorusRequestParams","comments":{"summary":null},"params":[{"label":"data","description":"Data to include in an https request to Qorus server api","type":"any"},{"label":"headers","description":"Headers to include in an https request to Qorus server api","type":"TQorusRequestHeader"},{"label":"params","description":"URL Parameters to include in an https request to Qorus server api","type":"Record<string, string>"},{"label":"path","description":"Path for a https request to Qorus server","type":"string"}]},{"name":"QorusRequestResponse","comments":{"summary":null},"params":[{"label":"config","description":"","type":"Record<string, any>"},{"label":"data","description":"","type":"T"},{"label":"headers","description":"","type":"TQorusRequestHeader"},{"label":"request","description":"","type":"any"},{"label":"status","description":"","type":"number"},{"label":"statusText","description":"","type":"string"}]},{"name":"IApiPaths","comments":{"summary":null},"params":[{"label":"authenticator","description":"Api paths for the QorusAuthenticator","type":"IApiPathsAuthenticator"},{"label":"dataProviders","description":"Api paths for the QorusDataProvider","type":"IApiPathsDataProvider"},{"label":"jobs","description":"Api paths for the QorusJobs","type":"IApiPathsJobs"}]},{"name":"IApiPathsAuthenticator","comments":{"summary":null},"params":[{"label":"login","description":"Path to authenticate the user for a Qorus server endpoint","type":"string"},{"label":"logout","description":"Path to logout the user for a Qorus server endpoint","type":"string"},{"label":"validateNoAuth","description":"Path to identify if no-auth is enabled for the user for a Qorus server endpoint","type":"string"},{"label":"validateToken","description":"Path to validate a authentication token for a user for the Qorus server endpoint","type":"string"}]},{"name":"IApiPathsDataProvider","comments":{"summary":null},"params":[{"label":"browse","description":"Path to DataProvider browse for a QorusServer endpoint","type":"string"}]},{"name":"IApiPathsJobs","comments":{"summary":null},"params":[{"label":"browse","description":"Path to browse Jobs for a QorusServer endpoint","type":"string"}]}], typeAliasDocs: [{"name":"TObjectWithAnyValue","comments":{"summary":"A record of objects with string key and any kind of value"},"type":"Record<string, any>"},{"name":"TObjectWithStringKey","comments":{"summary":"A record of objects with string key and string value"},"type":"Record<string, string>"},{"name":"TVersion","comments":{"summary":"Allowed types of version for the Qorus server api"},"type":"latest | 6 | 5 | 4 | 3 | 2 | 1"},{"name":"TQorusAuthToken","comments":{"summary":"Authentication token for a Qorus server endpoint"},"type":"string"},{"name":"TQorusEndpointId","comments":{"summary":"Endpoint id for a Qorus server endpoint"},"type":"string"},{"name":"TQorusEndpointURL","comments":{"summary":"Url for a Qorus server endpoint"},"type":"string"},{"name":"TToken","comments":{"summary":"Authentication token for a Qorus Endpoint"},"type":"string"},{"name":"TContext","comments":{"summary":"Context for the Qorus api ex: 'record'"},"type":"type | message | event | api | record"},{"name":"TDataProviderChildrenConstructorOptions","comments":{"summary":"DataProvider children constructor_options property object"},"type":"Record<string, IDataProviderChildrenConstructorPropertyOptions>"},{"name":"TQorusRequestHeader","comments":{"summary":""},"type":"Record<string, boolean | number | string>"}] }