import * as React from "react";

import './Article.css';
import ApiClient from "../services/ApiClient";
import ArticleDTO from "../dto/ArticleDTO";
import ApplicationHeader from "./ApplicationHeader";

class Article extends React.Component {

    article: ArticleDTO = new ArticleDTO();

    constructor(props) {
        super(props);
        this.state = {
            articleLoaded: false,
            articleRead: false
        };
        console.log("hey")

        let {id} = this.props.match.params;

        ApiClient.getArticle(id).then(res => {
            if (res.ok) {
                res.json().then(json => {
                    this.article.id = json.id;
                    this.article.title = json.title;
                    this.article.description = json.description;
                    this.article.date = json.date;
                    this.article.content = json.content;
                    this.article.category = json.category;
                    this.article.tags = json.tags;
                    this.article.read = json.read;
                    this.article.liked = json.liked;
                    console.log(this.article)
                    this.setState({
                        articleLoaded: true,
                        articleRead: this.article.read,
                        articleLiked: this.article.liked
                    })
                })
            } else {
                console.log("Error")
            }
        });

        this.handleMarkAsReadButton = this.handleMarkAsReadButton.bind(this);
        this.handleLikeButton = this.handleLikeButton.bind(this);
        this.handleUnlikeButton = this.handleUnlikeButton.bind(this);
    }


    handleMarkAsReadButton(event) {
        ApiClient.articleRead(this.article.id).then(res => {
            if (res.ok) {
                this.setState({
                    articleRead: true
                })
            } else {
                console.log("Error")
            }
        });
    }

    handleLikeButton(event) {
        ApiClient.learningMaterialLike(this.article.id, "article").then(res => {
            if (res.ok) {
                this.setState({
                    articleLiked: true
                })
            } else {
                console.log("Error")
            }
        });
    }

    handleUnlikeButton(event) {
        ApiClient.learningMaterialUnlike(this.article.id, "article").then(res => {
            if (res.ok) {
                this.setState({
                    articleLiked: false
                })
            } else {
                console.log("Error")
            }
        });
    }


    render() {
        if (!this.state.articleLoaded) {
            return <div className="Article"/>
        }
        return (
            <div>
                <ApplicationHeader/>
                <div className="Article">
                    <div type="article_articleType">
                        <h3 type="article_title">{this.article.title}</h3>

                        <label type="date">{new Date(Date.parse(this.article.date)).toLocaleDateString("ru-ru")}</label>
                        <label type="category_word">Category: </label>
                        <label type="category">{this.article.category}</label>
                        <br/>
                        <br/>
                        <label type="content">{String(this.article.content)
                            .replaceAll('----------------------', '\n\n')}</label>
                        <br/>
                        <label type="tags">{this.article.tags}</label>
                        <br/>
                        {this.state.articleRead ?
                            (<button type="article_mark_as_read" disabled={true}>Read! 🎉</button>) :
                            (<button type="article_mark_as_read" onClick={this.handleMarkAsReadButton}>Mark as
                                read</button>)}
                        <div className="likeButton">
                            {this.state.articleLiked ?
                                (<button type="article_liked" onClick={this.handleUnlikeButton}>You liked that
                                    👍</button>) :
                                (<button type="article_unliked" onClick={this.handleLikeButton}>👍</button>)}
                        </div>
                        <br/>
                    </div>
                </div>
            </div>)
    }

}

export default Article;
