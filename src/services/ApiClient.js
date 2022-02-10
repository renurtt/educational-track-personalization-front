var SERVER_HOST_PORT = process.env.REACT_APP_BACKEND_HOST || 'localhost:8080';

class ApiClient {


    static GET_CHALLENGE = '/test';
    // static POST_RESULT = '/attempts';

    static test(): Promise<Response> {
        console.log('SERVER_HOST_PORT ' + SERVER_HOST_PORT);
        console.log('process.env.COMPONENT_BACKEND_HOST ' + process.env.REACT_APP_BACKEND_HOST);

        return fetch('http://' + SERVER_HOST_PORT + ApiClient.GET_CHALLENGE);
    }

    // static sendGuess(user: string,
    //                  a: number,
    //                  b: number,
    //                  guess: number): Promise<Response> {
    //     return fetch(ApiClient.SERVER_URL + ApiClient.POST_RESULT,
    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(
    //                 {
    //                     userAlias: user,
    //                     factorA: a,
    //                     factorB: b,
    //                     guess: guess
    //                 }
    //             )
    //         });
    // }
}

export default ApiClient;
export default SERVER_HOST_PORT;