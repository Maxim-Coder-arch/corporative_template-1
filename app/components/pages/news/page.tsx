'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import "../../../styles/scss/pages/news/index.scss";

interface NewsItem {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        setNews(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="news-page">Загрузка...</div>;
  }

  return (
    <div className="news-page">
      <div className="news-container">
        <div className="news-header">
          <p className="news-subtitle">Новости и события</p>
          <h1 className="news-title">Новости компании</h1>
        </div>

        <div className="news-grid">
          {news.map((item) => (
            <div key={item._id} className="news-card">
              <h3 className="news-card__title">{item.title}</h3>
              <p className="news-card__excerpt">
                {item.description.slice(0, 120)}...
              </p>
              <Link href={`/components/pages/new/${item._id}`} className="news-card__link">
                Читать далее →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;