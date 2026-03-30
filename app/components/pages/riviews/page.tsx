'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from "next/image";
import "../../../styles/scss/pages/riviews/index.scss";
import { websiteData as data } from "@/data/data.website";

interface IReview {
  name: string;
  rating: number;
  text: string;
}

const Riviews = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    text: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(setReviews)
      .catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', rating: 5, text: '' });
      } else {
        setStatus('error');
      }
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const renderStars = (rating: number, interactive = false, onChange?: (rating: number) => void) => {
    return (
      <div className="review-stars">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className={`star ${i < rating ? 'star--filled' : ''} ${interactive ? 'star--interactive' : ''}`}
            onClick={() => interactive && onChange?.(i + 1)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="riviews" ref={ref}>
      <div className="riviews">
        <div className="riviews-container">
          <div className="riviews-list">
            <motion.div 
              className="riviews-header"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <p className="riviews-subtitle">{data.reviews.subtitle}</p>
              <h2 className="riviews-title">{data.reviews.title}</h2>
            </motion.div>

            <motion.div 
              className="riviews-grid"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {reviews.map((item, index) => (
                <motion.div 
                  className="review-card" 
                  key={index}
                  variants={itemVariants}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="review-card__header">
                    <div className="review-avatar">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="review-info">
                      <h4>{item.name}</h4>
                      {renderStars(item.rating)}
                    </div>
                  </div>
                  <div className="review-card__body">
                    <p>{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div 
            className="riviews-form"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="form-card">
              <h3>Оставить отзыв</h3>
              <p>Ваше мнение важно для нас</p>

              <form onSubmit={handleSubmit} className="review-form">
                <div className="form-field">
                  <input
                    type="text"
                    name="name"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                  />
                </div>

                <div className="form-field form-field--rating">
                  <label>Оценка:</label>
                  <div className="rating-input">
                    {renderStars(formData.rating, true, (rating) => setFormData(prev => ({ ...prev, rating })))}
                  </div>
                </div>

                <div className="form-field">
                  <textarea
                    name="text"
                    placeholder="Ваш отзыв"
                    rows={4}
                    value={formData.text}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                  />
                </div>

                <button 
                  type="submit" 
                  className="form-submit"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Отправка...' : 
                   status === 'success' ? 'Отправлено!' : 
                   status === 'error' ? 'Ошибка' : 'Отправить отзыв'}
                </button>
              </form>

              <div className="form-divider">
                <span>или</span>
              </div>

              <div className="social-review">
                <p>Напишите нам в соцсетях, и мы добавим ваш отзыв на сайт</p>
                <div className="social-icons">
                  {data.reviews.socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                    >
                      <Image src={social.icon} alt={social.name} width={24} height={24} />
                    </a>
                  ))}
                </div>
              </div>

              <p className="form-note">* Все отзывы проходят модерацию перед публикацией</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Riviews;