'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { useParams } from 'next/navigation';
import "../../../../styles/scss/pages/new/index.scss";

interface NewsItem {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

const New = () => {
  const params = useParams();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [otherNews, setOtherNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        const current = data.find((item: NewsItem) => item._id === params.id);
        const others = data.filter((item: NewsItem) => item._id !== params.id);
        setNews(current);
        setOtherNews(others);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch news:', err);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <section id="new">
        <div className="new">
          <div className="new-loading">Загрузка...</div>
        </div>
      </section>
    );
  }

  if (!news) {
    return (
      <section id="new">
        <div className="new">
          <div className="new-not-found">Новость не найдена</div>
        </div>
      </section>
    );
  }

  return (
    <section id="new">
      <div className="new">
        <div className="new-block">
          <div className="new-header">
            <Link href="/components/pages/news">← Назад</Link>
            <h3>{news.title}</h3>
          </div>
          <div className="new-item">
            <p>{news.description}</p>
          </div>
        </div>
        <div className="news-meta">
          <h3>Другие новости</h3>
          {otherNews.length === 0 ? (
            <div className="new-another-empty">Нет других новостей</div>
          ) : (
            otherNews.map((item) => (
              <div className="new-another-item" key={item._id}>
                <Link href={`/components/pages/new/${item._id}`}>{item.title}</Link>
              </div>
            ))
          )}
          <Link href="/components/pages/news" className="new-footer">
            Смотреть все новости
          </Link>
        </div>
      </div>
    </section>
  );
};

export default New;