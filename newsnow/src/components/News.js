import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  // Capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => 
    string.charAt(0).toUpperCase() + string.slice(1);

  // Fetch and update news articles
  const updateNews = async () => {
    props.setProgress(10);
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      const response = await fetch(url);
      props.setProgress(30);
      const data = await response.json();
      props.setProgress(70);
      setArticles(data.articles);
      setTotalResults(data.totalResults);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
      props.setProgress(100);
    }
  };

  // Fetch more news articles for infinite scrolling
  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
      const response = await fetch(url);
      const data = await response.json();
      setArticles((prevArticles) => [...prevArticles, ...data.articles]);
      setTotalResults(data.totalResults);
      setPage(nextPage);
    } catch (error) {
      console.error('Error fetching more news:', error);
    }
  };

  // Update document title and fetch initial news
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, [props.category, props.country, props.pageSize, props.apiKey]);

  return (
    <>
      <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
       Latest {capitalizeFirstLetter(props.category)} News
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((article) => (
              <div className="col-md-4" key={article.url}>
                <NewsItem
                  title={article.title || ""}
                  description={article.description || ""}
                  imageUrl={article.urlToImage}
                  newsUrl={article.url}
                  author={article.author}
                  date={article.publishedAt}
                  source={article.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
