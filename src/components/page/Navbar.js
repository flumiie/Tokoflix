import React from 'react';

class Navbar extends React.Component
{
  render()
  {
    return (
      <div className="movies_nav">
        <div className="container">
          <nav className="navbar navbar-default">
            <div className="navbar-header navbar-left">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            {/* Collect the nav links, forms, and other content for toggling */}
            <div className="collapse navbar-collapse navbar-right" id="bs-example-navbar-collapse-1">
              <nav>
                <ul className="nav navbar-nav">
                  {
                    window.location.pathname === '/' ?
                      <li className="active"><a href="/">Home</a></li>
                    :
                      <li><a href="/">Home</a></li>
                  }
                    
                  <li className="dropdown">
                    <a href={null} className="dropdown-toggle" data-toggle="dropdown">Genres <b className="caret"></b></a>
                    <ul className="dropdown-menu multi-column columns-3">
                      <li>
                      <div className="col-sm-4">
                        <ul className="multi-column-dropdown">
                          <li><a href="genres.html">Action</a></li>
                          <li><a href="genres.html">Biography</a></li>
                          <li><a href="genres.html">Crime</a></li>
                          <li><a href="genres.html">Family</a></li>
                          <li><a href="horror.html">Horror</a></li>
                          <li><a href="genres.html">Romance</a></li>
                          <li><a href="genres.html">Sports</a></li>
                          <li><a href="genres.html">War</a></li>
                        </ul>
                      </div>
                      <div className="col-sm-4">
                        <ul className="multi-column-dropdown">
                          <li><a href="genres.html">Adventure</a></li>
                          <li><a href="comedy.html">Comedy</a></li>
                          <li><a href="genres.html">Documentary</a></li>
                          <li><a href="genres.html">Fantasy</a></li>
                          <li><a href="genres.html">Thriller</a></li>
                        </ul>
                      </div>
                      <div className="col-sm-4">
                        <ul className="multi-column-dropdown">
                          <li><a href="genres.html">Animation</a></li>
                          <li><a href="genres.html">Costume</a></li>
                          <li><a href="genres.html">Drama</a></li>
                          <li><a href="genres.html">History</a></li>
                          <li><a href="genres.html">Musical</a></li>
                          <li><a href="genres.html">Psychological</a></li>
                        </ul>
                      </div>
                      <div className="clearfix"></div>
                      </li>
                    </ul>
                  </li>
                  <li><a href="series.html">tv - series</a></li>
                  <li><a href="news.html">news</a></li>
                </ul>
              </nav>
            </div>
          </nav>	
        </div>
      </div>
    );
  }
}

export default Navbar;