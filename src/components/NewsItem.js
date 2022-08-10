import React, { Component } from 'react'
import { Stack } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

export class NewsItem extends Component {

  const = ""
  render() {

    let {title,description , imageUrl, newsUrl , author , date , source  } = this.props;
    // this is how expracting only date form date of  the date of publication of artical using regular expression
    const dateStr = date.match(/(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g);
    const Unknown = source;
    return (
      <>
      <div className="my-3">

        <div className="card" >
        
          <img className="card-img-top" rel="noreferrer" src={!imageUrl ? "https://static.euronews.com/articles/stories/06/91/09/58/945x531_screenshot_1200_15_6910958.jpg" : imageUrl } alt="someThing loading....."/>
              <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <Stack sx={{ ml:{lg:'900px' , xs:'500px'} }}>
                  </Stack>
                  <p className="card-text">{description}</p>
                  {/* <p className="card-text"><small className="text-muted">By {!author ? "Unknown" :author } on {new Date (date).toGMTString} </small></p> */}
                  <p className="card-text"><small className="text-muted">By {!author? Unknown: author} on {dateStr}</small></p>
                  <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-dark">Read More </a>
                  <span className="position-absolute top-0 start-200 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'  , marginRight:'70px'}}> {source} </span>
                  <a href='/' rel="noreferrer" style={{marginLeft:'200px'}} target='_blank' className="btn btn-sm btn-success"><ShareIcon color='green'/> </a>
              </div>
        </div>

      </div>




      </>
    )
  }
}

export default NewsItem