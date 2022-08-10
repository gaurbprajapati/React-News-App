import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country : 'in',
    pageSize : 8,
    category:'general'
    
  }
  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }

  capitalizeFirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  

  constructor(props){
    super(props);
    this.state = {
      articles : [],
      loading:false,
      page:1
    }

    document.title = `${this.capitalizeFirstletter(this.props.category) + "- NewsHunt" }`
  }

  async updateNews(pageNo){
    const url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2630340537b44a2bbdce2fcb55d74bed&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
    })
}

  
  async componentDidMount (){
    this.updateNews();
    // let ur = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2630340537b44a2bbdce2fcb55d74bed&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await  fetch (ur);
    // let parsedData = await data.json()
    // this.setState({articles :parsedData.articles , totalResults:parsedData.totalResults , loading:false})
  }
  
  
  handlePrevClick=  async  ()=>{
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
        //  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2630340537b44a2bbdce2fcb55d74bed&page=${this.state.page-1}&pageSize${this.props.pageSize}`;
        //  let data = await  fetch (url);
        //  this.setState({loading : true})
        //  let parsedData = await data.json()
        //  this.setState({
        //    page : this.state.page -1,
        //    articles :parsedData.articles,
        //    loading:false
        //   })
  }
  
  handleNextClick=  async  ()=>{
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
    // if (this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

    // }else{
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2630340537b44a2bbdce2fcb55d74bed&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading : true})
    // let data = await  fetch (url);
    // let parsedData = await data.json()

    // this.setState({
    //   page : this.state.page + 1,
    //   articles :parsedData.articles,
    //   loading:false
    // })
  // }
  }


  
  render() {
    return (
      <div className="container my-3">
      {this.state.loading && <Spinner/>}
      {/* <h1 className="text-center">NewHunt Headlines</h1> */}
      <h1 className="text-center" style={{ marginTop: '90px' }}>NewsHunt - top {this.capitalizeFirstletter(this.props.category)} Headlines</h1>
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
          return(

           <div className="col-md-4" key={element.url} >
            <NewsItem  title={element.title ? element.title.slice(0,44) : ""} description={ element.description ? element.description.slice(0,200): ""} imageUrl={element.urlToImage}  newsUrl={element.url} author={element.author} date={element.publishedAt}  source = {element.source.name} />
          </div>
          )
          
        })}
        </div>

        <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} onClick={this.handlePrevClick} className="btn btn-dark">&larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
