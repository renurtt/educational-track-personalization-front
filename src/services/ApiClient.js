class ApiClient {

    static SERVER_URL = 'http://educational-track-personalization:8080';
    static GET_CHALLENGE = '/test';
    // static POST_RESULT = '/attempts';

    static test(): Promise<Response> {
        return fetch(ApiClient.SERVER_URL + ApiClient.GET_CHALLENGE);
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