import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function getArticles() {
    try {
      let resp = await axios.get('http://localhost:3000/author-api/viewallarticles')

      if (resp.data.message === "success") {
        // Fix: The backend sends 'articles', not 'payload'

        setArticles(resp.data.payload || [])
      } else {
        setError(resp.data.message)
      }
    } catch (err) {
      setError("Failed to fetch articles")
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getArticles();
  }, [])

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">
          <i className="bi bi-journal-richtext me-2 text-primary"></i>
          All Articles
        </h2>
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="alert alert-danger rounded-4 shadow-sm" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <div className="text-center py-5 bg-light rounded-4 shadow-sm border-0">
          <i className="bi bi-file-earmark-x display-1 text-secondary mb-3"></i>
          <h4 className="text-secondary fw-semibold">No articles found</h4>
          <p className="text-muted">There are currently no articles to display.</p>
        </div>
      )}

      {!loading && !error && articles.length > 0 && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 ">
          {articles.map((article) => (
            <div className="col" key={article.articleId || article._id}>
              <Link to={`../${article.articleId}` } state={article} className="text-decoration-none">
                <div 
                  className="card h-100 shadow-sm border-0 rounded-4  bg-body-secondary" 
                  style={{ transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.classList.replace('shadow-sm', 'shadow'); }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.classList.replace('shadow', 'shadow-sm'); }}
                >
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge bg-primary text-white rounded-pill px-3 py-2 fw-medium">
                        {article.category}
                      </span>
                      <small className="text-muted fw-medium">
                        <i className="bi bi-calendar3 me-1"></i>
                        {article.dateOfModification ? article.dateOfModification.split(' ')[0] : 'Recent'}
                      </small>
                    </div>
                    
                    <h4 className="card-title fw-bold text-dark mb-3" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {article.title}
                    </h4>
                    
                    <p className="card-text text-secondary mb-4 flex-grow-1" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {article.content}
                    </p>
                    
                    <div className="mt-auto d-flex align-items-center pt-3 border-top">
                      <div className="bg-light rounded-circle d-flex justify-content-center align-items-center me-3" style={{ width: '40px', height: '40px' }}>
                        <i className="bi bi-person-fill text-secondary fs-5"></i>
                      </div>
                      <div>
                        <p className="mb-0 fw-bold text-dark small">{article.authorData?.nameOfAuthor || 'Unknown Author'}</p>
                        <small className="text-muted" style={{ fontSize: '0.75rem' }}>Author</small>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Articles