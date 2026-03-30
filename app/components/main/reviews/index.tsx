'use client';

import { useState, useEffect } from 'react';
import "../../../styles/scss/main-page/reviews/index.scss";
import { websiteData as data } from "@/data/data.website";

interface Review {
  _id: string;
  name: string;
  rating: number;
  text: string;
  status: string;
  createdAt: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load reviews:', err);
        setLoading(false);
      });
  }, []);

  const displayedReviews = reviews.slice(0, 4);

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : '0';
  const ratingPercent = (parseFloat(averageRating) / 5) * 100;

  if (loading) {
    return (
      <section className="reviews-section">
        <div className="reviews-container">
          <div className="reviews-content">
            <div className="reviews-header">
              <h2>{data.reviews.title}</h2>
            </div>
            <div className="reviews-loading">Загрузка отзывов...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reviews" className="reviews-section">
      <div className="reviews-container">
        <div className="reviews-content">
          <div 
            className="reviews-header"
          >
            <h2>{data.reviews.title}</h2>
          </div>

          <div className="reviews-grid">
            {displayedReviews.length > 0 ? (
              displayedReviews.map((review, index) => (
                <div 
                  key={review._id} 
                  className={`review-card ${index % 2 === 1 ? 'review-card--offset' : ''}`}
                >
                  <div className="review-card__rating">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`star ${i < review.rating ? 'star--filled' : ''}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="review-card__text">{review.text}</p>
                  <div className="review-card__author">
                    <span className="review-card__name">{review.name}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="reviews-empty">Пока нет отзывов</div>
            )}
          </div>
        </div>

        <div 
          className="reviews-meta"
        >
          <div className="reviews-meta__content">
            <div className="reviews-meta__total">
              <span className="reviews-meta__number">{totalReviews}</span>
              <span className="reviews-meta__label">отзывов</span>
            </div>
            <div className="reviews-meta__rating">
              <span className="reviews-meta__average">{averageRating}</span>
              <div className="reviews-meta__stars">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`star ${i < Math.floor(parseFloat(averageRating)) ? 'star--filled' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="reviews-meta__bar">
              <div 
                className="reviews-meta__bar-fill" 
                style={{ width: `${ratingPercent}%` }}
              />
            </div>
            <a href="/reviews" className="reviews-meta__link">
              Все отзывы
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;