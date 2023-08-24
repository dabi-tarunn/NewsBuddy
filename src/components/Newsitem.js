import React, { Component } from 'react'

export class newsitem extends Component {
  render() {

    let {title , description , imageUrl , url , author , publishedAt , source} = this.props ;

    return (
      <div className="card mx-5 my-3" style={{width: "18rem"}}>
        <img src= {imageUrl ? imageUrl : "https://source.unsplash.com/1600x700/?newspapers"} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <span class="position-absolute top-0 translate-middle badge rounded-pill bg-primary" style = {{right : "10%"}}>
    {source}
    <span class="visually-hidden">unread messages</span>
  </span>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className = "card-text">By {author ? author : "Unknown"} on {new Date(publishedAt).toGMTString()} </small></p>
            <a href= {url} target = "_blank" className="btn btn-success">Read More</a>
        </div>
        </div>
    )
  }
}

export default newsitem