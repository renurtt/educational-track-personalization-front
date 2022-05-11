import AuthClient from "./AuthClient";
import ClientConfig from "./ClientConfig";
import User from "../dto/User";
import UserSkillDTO from "../dto/UserSkillDTO";

const SERVER_HOST_PORT = process.env.REACT_APP_BACKEND_HOST || 'localhost:8080';

class ApiClient {
    static GET_CHALLENGE = '/test';
    static POST_QUESTIONNAIRE = '/questionnaire';
    static GET_CURRENT_USER = '/user/current';
    static POST_ADD_ARTICLE_READ = '/user/current/addCompletedMaterial';
    static POST_ADD_LIKE = '/material/addLike';
    static POST_REMOVE_LIKE = '/material/removeLike';
    static GET_ARTICLE_LIST = '/article/list';
    static GET_ARTICLE_BY_ID = '/article/';
    static GET_COURSE_BY_ID = '/course/';
    static GET_JOB_BY_ID = '/job/';
    static GET_USER_SKILLS = '/skill/userSkillsList/';
    static GET_ALL_SKILL_NAMES = '/skill/getSkillNames/';
    static POST_UPDATE_SKILLS = '/skill/';
    static DELETE_SKILL = '/skill/remove';
    static GET_TRACK_LATEST = '/track/latest';
    static POST_TRACK_GENERATE = '/track/generate';

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
                'Authorization': (AuthClient.ACCESS_TOKEN != null) ? AuthClient.ACCESS_TOKEN : ''
            }
        });
    }

    static getArticle(id: number): Promise<Response> {
        return fetch(ClientConfig.SERVER_LINK + ApiClient.GET_ARTICLE_BY_ID + id, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'Authorization': (AuthClient.ACCESS_TOKEN != null) ? AuthClient.ACCESS_TOKEN : ''
            }
        });
    }

    static getCourse(id: number): Promise<Response> {
        return fetch(ClientConfig.SERVER_LINK + ApiClient.GET_COURSE_BY_ID + id, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'Authorization': (AuthClient.ACCESS_TOKEN != null) ? AuthClient.ACCESS_TOKEN : ''
            }
        });
    }

    static getJob(id: number): Promise<Response> {
        return fetch(ClientConfig.SERVER_LINK + ApiClient.GET_JOB_BY_ID + id, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'Authorization': (AuthClient.ACCESS_TOKEN != null) ? AuthClient.ACCESS_TOKEN : ''
            }
        });
    }

    static materialCompleted(id): Promise<Response> {
        return fetch(ClientConfig.SERVER_LINK + ApiClient.POST_ADD_ARTICLE_READ, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthClient.ACCESS_TOKEN

            }, body: JSON.stringify({
                id: parseInt(id),
                // learningMaterialType: "article"
            })
        });
    }


    static learningMaterialLike(id, learningMaterialType): Promise<Response> {
        return fetch(ClientConfig.SERVER_LINK + ApiClient.POST_ADD_LIKE, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthClient.ACCESS_TOKEN

            }, body: JSON.stringify({
                id: parseInt(id),
                learningMaterialType: learningMaterialType
            })
        });
    }
    static learningMaterialUnlike(id, learningMaterialType): Promise<Response> {
        return fetch(ClientConfig.SERVER_LINK + ApiClient.POST_REMOVE_LIKE, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthClient.ACCESS_TOKEN

            }, body: JSON.stringify({
                id: parseInt(id),
                learningMaterialType: learningMaterialType
            })
        });
    }

    static getLatestTrack(): Promise<Response> {
        return fetch(ClientConfig.SERVER_LINK + ApiClient.GET_TRACK_LATEST, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthClient.ACCESS_TOKEN
            }
        });
    }

    static generateNewTrack(): Promise<Response> {
        return fetch(ClientConfig.SERVER_LINK + ApiClient.POST_TRACK_GENERATE, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthClient.ACCESS_TOKEN
            }
        });
    }

    static requestSkills(): Promise<Response> {
        return fetch(ClientConfig.SERVER_LINK + ApiClient.GET_USER_SKILLS, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'Authorization': (AuthClient.ACCESS_TOKEN != null) ? AuthClient.ACCESS_TOKEN : ''
            }
        });
    }

    static getAllSkillNames(): Promise<Response> {
        return fetch(ClientConfig.SERVER_LINK + ApiClient.GET_ALL_SKILL_NAMES, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'Authorization': (AuthClient.ACCESS_TOKEN != null) ? AuthClient.ACCESS_TOKEN : ''
            }
        });
    }


    static updateSkills(userSkillDto : UserSkillDTO[]): Promise<Response> {
        console.log(JSON.stringify(userSkillDto))
        return fetch(ClientConfig.SERVER_LINK + ApiClient.POST_UPDATE_SKILLS, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthClient.ACCESS_TOKEN
            }, body: JSON.stringify(userSkillDto)
        });
    }

    static deleteSkill(id): Promise<Response> {
        return fetch(ClientConfig.SERVER_LINK + ApiClient.DELETE_SKILL, {
            method: 'DELETE', headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthClient.ACCESS_TOKEN
            }, body: JSON.stringify({
                id: parseInt(id)
            })
        });
    }
}

export default ApiClient;