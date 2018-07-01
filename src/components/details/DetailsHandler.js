import React from 'react';
import $ from 'jquery';
import { Button } from 'semantic-ui-react';
// import MovieRow from '../MovieRow';

import Navbar from '../page/Navbar';
import Popup from '../page/Popup';

import '../../includes/css/style.css';

var blc = 0;
if(localStorage.getItem('userBalance') === null)
{
  blc = 100000;
  localStorage.setItem('userBalance', blc);
}
else
{
  blc = localStorage.getItem('userBalance');
}
var price = 0;

export const priceFormat = (x) =>
{
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "."/* Change this part for comma, dot, or any character you want on here */);
  return parts.join(".");
}

class DetailsHandler extends React.Component
{
  constructor(props)
  {
    super(props);
    this.onSearchHandler = this.onSearchHandler.bind(this);
    this.state = {};
  }

  componentWillMount()
  {
    this.viewDetails();
    // this.state.contents;
  }

  viewDetails()
  {
    if(localStorage.getItem('selMovieID') !== null)
    {
      var api_key = '1c67c0067c6a82a74b92665f1e488325';
      var movieID = localStorage.getItem('selMovieID');
      const tmdbURL     = 'https://api.themoviedb.org/3/movie/' + movieID + '?api_key=' + api_key ;
      const tmdbYoutube = 'https://api.themoviedb.org/3/movie/' + movieID + '/videos?api_key=' + api_key + '&language=en-US';

      /**
       * Trailer
       */
      var ytEmbedURL = '';
      $.ajax({
        url: tmdbYoutube,
        success: (youtubeResult) =>
        {
          ytEmbedURL = 'https://www.youtube-nocookie.com/embed/' + youtubeResult.results[0].key;
        }
      });

      $.ajax({
        url: tmdbURL,
        success: (selMovie) =>
        {
          // console.log('Successfuly fetched the Movie data');
          // console.log(selMovie);

          /**
           * Gallery
          */
          var rootimgURL = 'https://image.tmdb.org/t/p/w500';
          var backdrop = rootimgURL + selMovie.backdrop_path;
          if(selMovie.backdrop_path === null) backdrop = '/images/image-not-available.png';

          /**
           * Pricing
           */
          var rating = selMovie.vote_average;
          if(rating >= 1 && rating <= 2.99)      price = 3500;
          else if(rating >= 3 && rating <= 5.99) price = 8250;
          else if(rating >= 6 && rating <= 7.99) price = 16350;
          else if(rating >= 8 && rating <= 10)   price = 21250;
          
          const priceFormat = (x) =>
          {
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "."/* Change this part for comma, dot, or any character you want on here */);
            return parts.join(".");
          }

          var formattedPrice = priceFormat(price);
          
          let md = '';
          md += `
            <div class="col-sm-8 single-left">
              <div class="song">
                <div class="song-info">
                  <h2>${selMovie.title}</h2>
                </div>
                <div class="video-grid-single-page-agileits">

                  <div class="container" style="margin-top:20px">
                    <div class="col-sm-2">
                      <img src=${'https://image.tmdb.org/t/p/w200' + selMovie.poster_path} alt=${selMovie.title} class="img-responsive" style="margin-left:-18%" />
                    </div>

                    <div class="col-sm-10">

                      <div class="mov-details">
                        <h3>Overview</h3>
                        <p>${selMovie.overview}</p>
                      </div>

                      <div class="mov-details">
                        <table class="mov-det-votes">
                          <tr>
                            <th><h3>Vote Average</h3></th>
                            <th><h3>Vote Count</h3></th>
                          </tr>
                          <tr>
                            <td><p><b>${selMovie.vote_average}</b> / 10</p></td>
                            <td><p><b>${selMovie.vote_count}</b> votes</p></td>
                          </tr>
                        </table>
                      </div>

                      <div class="mov-details">
                        <table class="mov-det-votes">
                          <tr>
                            <th><h3>Price</h3></th>
                          </tr>
                          <tr>
                            <td>
                              Rp ${formattedPrice}
                            </td>
                          </tr>
                        </table>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
              <div class="clearfix"> </div>
            </div>
            <div class="clearfix"> </div>`;
          document.getElementById('movie-details-sn-page').innerHTML = md;

          let extras = '';
          extras +=
          `<div style="margin-top:20px">
                  
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" href="#profile" role="tab" data-toggle="tab">profl</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#trailer" role="tab" data-toggle="tab">Trailer</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#gallery" role="tab" data-toggle="tab">Gallery</a>
              </li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane fade in active" id="profile">...</div>
              <div role="tabpanel" class="tab-pane fade in" id="trailer">
                <iframe width="853" height="480" style="margin-top:5px" src=${ytEmbedURL} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
              </div>
              <div role="tabpanel" class="tab-pane fade in" id="gallery">
                <img src=${backdrop} alt=${selMovie.title} class="img-responsive movie-preview" style="width:60%" />
              </div>
            </div>

          </div>`;
          document.getElementById('some-extras').innerHTML = extras;
          
          let breadcrumb = '';
          breadcrumb =
          `<li><a href="/">Home</a></li>
          <li className="active"><a href=${localStorage.getItem('movieDetailsURL')}>${selMovie.title}</a></li>`;
          document.getElementById('breadcrumb-movie-details').innerHTML = breadcrumb;

          this.setState(
          {
            contents: md
          });
        },
        error: (xhr, status, err) =>
        {
          // console.log('Failed to fetch movie data');
        }
      })
    }
    else
    {
      window.history.replaceState({}, '', '/');
      // return window.location.replace('/');
    }
  }

  balance()
  {
    var formattedBlc = priceFormat(blc);
    return formattedBlc;
  }

  purchase()
  {
    if(!(blc - price < 0))
    {
      blc = blc - price;
      localStorage.setItem('userBalance', blc);
      localStorage.setItem('purchased-'+localStorage.getItem('selMovieID'), 'true')
      
      document.getElementById('purchase-btn').disabled = 'true';
      document.getElementById('purchase-btn').style.backgroundColor = 'gray';
      document.getElementById('purchase-btn').innerHTML = 'Purchased';

      window.location.pathname = window.location.pathname;

      return blc;
    }
    else
    {
      alert("Out of Balance!");
    }
    return blc;
  }

  recommended()
  {
    var api_key = '1c67c0067c6a82a74b92665f1e488325';
    const tmdbURL = 'https://api.themoviedb.org/3/movie/&api_key=' + api_key ;

    $.ajax({
      url: tmdbURL,
      success: (rcmList) =>
      {
        // console.log('Successfuly fetched the Movie data');
        console.log(rcmList);

        // let rcm = '';
        // rcm += `
        //   <div className="item">
        //     <div className="w3l-movie-gride-agile w3l-movie-gride-agile1">
        //       <a href="single.html" className="hvr-shutter-out-horizontal">
        //         <img src="images/m13.jpg" title="album-name" className="img-responsive" alt=" " />
        //         <div className="w3l-action-icon"><i className="fa fa-play-circle" aria-hidden="true"></i></div>
        //       </a>
        //       <div className="mid-1 agileits_w3layouts_mid_1_home">
        //         <div className="w3l-movie-text">
        //           <h6><a href="single.html">Citizen Soldier</a></h6>
        //         </div>
        //         <div className="mid-2 agile_mid_2_home">
        //           <p>2016</p>
        //           <div className="block-stars">
        //             <ul className="w3l-ratings">
        //               <li><a href="#"><i className="fa fa-star" aria-hidden="true"></i></a></li>
        //               <li><a href="#"><i className="fa fa-star" aria-hidden="true"></i></a></li>
        //               <li><a href="#"><i className="fa fa-star" aria-hidden="true"></i></a></li>
        //               <li><a href="#"><i className="fa fa-star" aria-hidden="true"></i></a></li>
        //               <li><a href="#"><i className="fa fa-star-half-o" aria-hidden="true"></i></a></li>
        //             </ul>
        //           </div>
        //           <div className="clearfix"></div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>`;
        // document.getElementById('movie-details-sn-page').innerHTML = rcm;
        
        // let breadcrumb = '';
        // breadcrumb =
        // `<li><a href="/">Home</a></li>
        // <li className="active"><a href=${localStorage.getItem('movieDetailsURL')}>${selMovie.title}</a></li>`;
        // document.getElementById('breadcrumb-movie-details').innerHTML = breadcrumb;

        // this.setState(
        // {
        //   contents: rcm
        // });
      },
      error: (xhr, status, err) =>
      {
        // console.log('Failed to fetch movie data');
      }
    })
  }

  onSearchHandler()
  {
    window.location.href = '/';
  }

  handleScroll = () =>
  {
    if(this.scroller)
      console.log(this.scroller.scrollTop);
  }

  logout()
  {
    localStorage.clear();
    window.location.pathname = '/'
  }

  render()
  {
    return (
      <div>
        <div className="header">
          <div className="container">
            <div className="layouts_logo">
              <a href="index.html"><h1>Tokoflix<span>Movies</span></h1></a>
            </div>
            <div className="w3_search">
              {/* <form action={null} method="post"> */}
                <input
                  type="text"
                  name="Search"
                  placeholder="Search ..."
                  required=""
                  onClick={this.onSearchHandler}
                />
                {/* <input type="submit" value="Go"/> */}
              {/* </form> */}
            </div>
            <div className="w3l_sign_in_register">
              <ul className="pull-right">
                {
                  localStorage.getItem('Authorization') === null ?
                    <li><a href="#" data-toggle="modal" data-target="#authModal">Login</a></li>
                  :
                  ([
                    <li key="0">
                      <i className="fa fa-money" aria-hidden="true"></i>
                      Rp {this.balance()}
                    </li>,
                    <li key="1">
                      <a onClick={this.logout} style={{cursor: 'pointer'}}>Logout</a>
                    </li>
                  ])
                }
              </ul>
            </div>
            <div className="clearfix"> </div>
          </div>
        </div>

        <Popup />

        <Navbar />

        {/* single */}
        <div className="single-page-agile-main">
          <div className="container">
            {/* /w3l-medile-movies-grids */}
            <div className="agileits-single-top">
              <ol className="breadcrumb" id="breadcrumb-movie-details"></ol>
            </div>

            <div className="single-page-agile-info">
              <div className="show-top-grids-w3lagile" id="movie-details-sn-page"></div>
              <div className="purchase-btn-container">
              {
                localStorage.getItem('Authorization') === null ?
                  <p style={{color:'gray'}}><i>Login to make a purchase</i></p>
                :
                ([
                  localStorage.getItem('purchased-'+localStorage.getItem('selMovieID')) === null &&
                    <Button id="purchase-btn" color="orange" className="fade" role="button" style={{opacity:1}} onClick={this.purchase}>
                      Purchase
                    </Button>,
                  
                  localStorage.getItem('purchased-'+localStorage.getItem('selMovieID')) === 'true' &&
                    <Button id="purchase-btn" color="gray" className="fade" role="button" style={{opacity:1}} onClick={this.purchase} disabled>
                      Purchased
                    </Button>
                ])
              }
              </div>
              <div id="some-extras"></div>

              {/*body wrapper start*/}
              <h2 style={{margin: '60px 0 20px 0'}}>Recommended For You</h2>
              <div className="w3_agile_banner_bottom_grid">
                <div id="owl-demo" className="owl-carousel owl-theme">
                  { this.state.recommended }
                </div>
              </div>
              {/*body wrapper end*/}
            </div>
            {/* //w3l-latest-movies-grids */}
          </div>
        </div>
        {/* //w3l-medile-movies-grids */}
      </div>
    );
  }
}

export default DetailsHandler;