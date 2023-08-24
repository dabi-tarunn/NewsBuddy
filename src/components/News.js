import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './spinner'
import PropTypes from 'prop-types'

export class news extends Component {
    
  static defaultProps = {
      country : 'in',
      pageSize : 8 ,
      category : 'general'
    }

    static propTypes = {
      country : PropTypes.string,
      pageSize : PropTypes.number,
      category : PropTypes.string
    }

    capitalize = (string)=>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    constructor(props){
        super(props);
        this.state = {
            articles : [],
            loading : false ,
            page : 1
        }
        document.title = `${this.capitalize(this.props.category)}-T800-Express` ;
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=01e7b02a32604665898978619a72f165&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        let data = await fetch(url) ;
        let parsedData = await data.json() ;
        this.setState({articles : parsedData.articles , totalResults : parsedData.articles.totalResults , loading : false}) ;
    }

    backClick =  async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=01e7b02a32604665898978619a72f165&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        let data = await fetch(url) ;
        let parsedData = await data.json() ;
        this.setState({articles : parsedData.articles , page : this.state.page - 1 , loading : false}) ;
    }

    nextClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=01e7b02a32604665898978619a72f165&page=${this.state.page + 1 }&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        let data = await fetch(url) ;
        let parsedData = await data.json() ;
        this.setState({articles : parsedData.articles , page : this.state.page + 1 , loading : false}) ;
    }

  render() {
    return (
    <div className="main my-3">
        <h2 className="mx-5 text-center" style = {{margin : '35px 0px'}}>TOP NEWS-HEADLINES ON {this.props.category.toUpperCase()}</h2>
        {this.state.loading && <Spinner/>}
      <div className="row">
      {!this.state.loading && this.state.articles.map((element)=>{
        return    <div className="col-md-4" key = {element.url}>
        <Newsitem title = {element.title ? element.title.slice(0 , 50) : ""}  description = {element.description ? element.description.slice(0,80) : ""} imageUrl = {element.urlToImage}  url = {element.url}  author = {element.author} publishedAt = {element.publishedAt} source = {element.source.name}/>
        </div>
      })}
      </div>
      <div className="row">
      {!this.state.loading && <button disabled = {this.state.page <= 1} type="button" className="btn btn-success col-md-3 col-md-offset-3 mx-5" onClick ={this.backClick} > &larr; Previous </button>}
      {!this.state.loading && <button disabled = {this.state.page  + 1 >  Math.ceil(this.totalResults/this.props.pageSize)} type="button" className="btn btn-success col-md-3 col-md-offset-3 mx-5" onClick={this.nextClick}> Next &rarr;</button>}
      </div>
    </div>
    )
  }
}

export default news