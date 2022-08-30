/**
 * An config class to setup the config for the api 
 *
 * @category Model
 */
class QorusInstance {
    #id;

    /**Qore Technologies endpoint to authenticate the user */
    protected _endpoint; 

    /**Version of the api */
    protected _version;

    constructor(endpoint: string, version?: string){
        this._endpoint = endpoint;
        this._version = version ? version: 'latest';
    }

    /**
     * A getter to get the current authentication endpoint
     */
    get endpoint(){
        return this._endpoint;
    }

    /**
     * A setter to configure the Authentication endpoint
     */
    set endpoint(endpnt: string){
        this._endpoint = endpnt;
    }

    /**
     * A setter to configure the api version
     * 
     * @param version version of the api v...
     */
    set version(version: string){
        this._version = version;
    }

    /**
     * A getter to get the current version of the api to be used
     */
    get version(){
        return this._version;
    }

    /**
     * A getter to get the id of the instance
     */
    get id(){
        return this.#id;
    }
}

export default QorusInstance;