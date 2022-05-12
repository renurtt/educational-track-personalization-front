import * as React from "react";

import './Articles.css';
import ApiClient from "../services/ApiClient";
import ArticleDTO from "../dto/ArticleDTO";
import {Navigate} from "react-router-dom";
import ApplicationHeader from "./ApplicationHeader";
import {FadeLoader} from "react-spinners";

class Articles extends React.Component {

    articles: ArticleDTO[] = [];
    articleChosenId = null;

    constructor() {
        super();
        this.state = {
            articlesLoaded: false,
            articleChosen: false
        };

        ApiClient.getArticles().then(res => {
            if (res.ok) {
                res.json().then(json => {
                    for (let index = 0; index < json.length; index++) {
                        let newArticle = new ArticleDTO()
                        newArticle.id = json[index].id;
                        newArticle.title = json[index].title;
                        newArticle.description = json[index].description;
                        newArticle.date = json[index].date;
                        newArticle.content = json[index].content;
                        newArticle.category = json[index].category;
                        newArticle.tags = json[index].tags;
                        newArticle.read = json[index].read;
                        this.articles.push(newArticle)
                    }
                    console.log(this.articles)
                    this.setState({
                        articlesLoaded: true
                    })
                })
            } else {
                console.log("Error")
            }
        });

        this.handleSubmitResult = this.handleSubmitResult.bind(this);
    }


    handleSubmitResult(event) {
        this.articleChosenId = event.currentTarget.getAttribute("data-value1")
        this.setState({
            articleChosen: true
        })
    }


    render() {
        let articlesRender = []
        for (let i = 0; i < this.articles.length; i++) {
            articlesRender.push((
                <div key={i} type="articleType" data-value1={this.articles[i].id}
                     onClick={this.handleSubmitResult}>

                    <label
                        type="articles_list_title">{this.articles[i].read ? "✅ " : ""}{this.articles[i].title}
                        {/*(id={this.articles[i].id})*/}
                    </label>
                    <br/>
                    <label type="articles_list_description">{this.articles[i].description}</label>
                </div>))

            articlesRender.push(<br/>)
        }
        return (this.state.articleChosen) ? (<Navigate to={'/article/' + this.articleChosenId}/>) : (
            <div>
                <ApplicationHeader/>
                <div className="Articles">
                    <h3 type="articles_page_title">Articles</h3>
                    {!this.state.articlesLoaded ? (<Loader styles={{position: "absolute", top: "50%", left: "50%",}}/>) :

                    articlesRender
                    }
                </div>
            </div>)
    }
}

function Loader({ styles = {} }) {
    return <FadeLoader color="#426a5a" css={styles} />;
}

export default Articles;
