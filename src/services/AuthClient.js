import ClientConfig from "./ClientConfig";


class AuthClient {

    static LOGIN_ENDPOINT = '/auth/login';
    static REGISTER_ENDPOINT = '/auth/register/user';
    static ACCESS_TOKEN = null;

    static login(username: string, password: string): Promise<Response> {
        let fetchResult : Promise<Response> = fetch(ClientConfig.SERVER_LINK + AuthClient.LOGIN_ENDPOINT, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({username: username, password: password})
        });


        return fetchResult
    }

    static register(username: string, password: string): Promise<Response> {
        return fetch(ClientConfig.SERVER_LINK + AuthClient.REGISTER_ENDPOINT, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({username: username, password: password})
        })
    }

}

export default AuthClient;