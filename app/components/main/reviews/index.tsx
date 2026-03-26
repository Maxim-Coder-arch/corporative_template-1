'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import "../../../styles/scss/main-page/reviews/index.scss";
import { websiteData as data } from "@/data/data.website";

const Reviews = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const displayedReviews = data.reviews.reviewsPoints.slice(0, 4);

  const totalReviews = data.reviews.reviewsPoints.length;
  const averageRating = (
    data.reviews.reviewsPoints.reduce((sum, r) => sum + r.rating, 0) / totalReviews
  ).toFixed(1);
  const ratingPercent = (parseFloat(averageRating) / 5) * 100;

  return (
    <section id="reviews" ref={sectionRef} className="reviews-section">
      <div className="reviews-container">
        <div className="reviews-content">
          <motion.div 
            className="reviews-header"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2>{data.reviews.title}</h2>
          </motion.div>

          <div className="reviews-grid">
            {displayedReviews.map((review, index) => (
              <motion.div 
                key={index} 
                className={`review-card ${index % 2 === 1 ? 'review-card--offset' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -3 }}
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
                  <span className="review-card__name">{review.userName}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          className="reviews-meta"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
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
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;