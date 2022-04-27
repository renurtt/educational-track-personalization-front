import AuthClient from "./AuthClient";
import ClientConfig from "./ClientConfig";
import User from "../dto/User";

const SERVER_HOST_PORT = process.env.REACT_APP_BACKEND_HOST || 'localhost:8080';

class ApiClient {
    static GET_CHALLENGE = '/test';
    static POST_QUESTIONNAIRE = '/questionnaire';
    static GET_CURRENT_USER = '/user/current';
    static POST_ADD_ARTICLE_READ = '/user/current/addArticle';
    static GET_ARTICLE_LIST = '/article/list';
    static GET_ARTICLE_BY_ID = '/article/';

    // static POST_RESULT = '/attempts';

    static test(): Promise<Response> {
        console.log('SERVER_HOST_PORT ' + SERVER_HOST_PORT);
        console.log('process.env.COMPONENT_BACKEND_HOST ' + process.env.REACT_APP_BACKEND_HOST);

        return fetch('http://' + SERVER_HOST_PORT + ApiClient.GET_CHALLENGE);
    }

    static sendQuestionnaire(name: string): Promise<Response> {
        return fetch('http://' + SERVER_HOST_PORT + ApiClient.POST_QUESTIONNAIRE, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthClient.ACCESS_TOKEN
            }, body: JSON.stringify({name: name})
        });
    }


    static getCurrentUser() {
        return fetch(ClientConfig.SERVER_LINK + ApiClient.GET_CURRENT_USER, {
            method: 'GET', headers: {
                'Authorization': AuthClient.ACCESS_TOKEN
            }
        });
    }

    static putCurrentUser(user: User): Promise<Response> {
        return fetch(ClientConfig.SERVER_LINK + ApiClient.GET_CURRENT_USER, {
            method: 'PUT', headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthClient.ACCESS_TOKEN
            }, body: JSON.stringify(
                {
                    college: user.college,
                    fullName: user.fullName,
                    city: user.city,
                    birthdayYear: user.birthdayYear,
                    desiredPosition: user.desiredPosition
                }
            )
        });
    }

    static getArticles(): Promise<Response> {
        return fetch(ClientConfig.SERVER_LINK + ApiClient.GET_ARTICLE_LIST, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthClient.ACCESS_TOKEN
            }
        });
    }

    static getArticle(id: number): Promise<Response> {
        return fetch(ClientConfig.SERVER_LINK + ApiClient.GET_ARTICLE_BY_ID + id, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthClient.ACCESS_TOKEN
            }
        });
    }

    static articleRead(id): Promise<Response> {
        return fetch(ClientConfig.SERVER_LINK + ApiClient.POST_ADD_ARTICLE_READ, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthClient.ACCESS_TOKEN
            }, body: JSON.stringify({id: parseInt(id)})
        });
    }
}

export default ApiClient;