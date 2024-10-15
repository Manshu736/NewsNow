import React from 'react';

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source }) => {
  const defaultImageUrl = "/image/news.jpg";
  const formattedDate = new Date(date).toLocaleString(); // Use toLocaleString for better readability

  return (
    <div className="my-3">
      <div className="card">
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '0',
            top: '0',
            margin: '10px'
          }}
        >
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img 
          src={defaultImageUrl} 
          className="card-img-top" 
          alt={title || "News Image"} 
        />
        <div className="card-body">
          <h5 className="card-title">{title || "No Title"}</h5>
          <p className="card-text">{description || "No description available"}</p>
          <p className="card-text">
            <small className="text-muted">
              By {author || "Unknown"} on {formattedDate}
            </small>
          </p>
          <a 
            rel="noreferrer" 
            href={newsUrl} 
            target="_blank" 
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
