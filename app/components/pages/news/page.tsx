'use client';

import Link from "next/link";
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import "../../../styles/scss/pages/news/index.scss";
import { pagesData as data } from "@/data/data.website";

const News = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="news" className="news-page" ref={ref}>
      <div className="news-container">
        <motion.div 
          className="news-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="news-subtitle">{data.news.subTitle}</p>
          <h1 className="news-title">{data.news.title}</h1>
        </motion.div>

        <motion.div 
          className="news-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {data.news.newPoints.map((item) => (
            <motion.div 
              key={item.id}
              className="news-card"
              variants={itemVariants}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="news-card__title">{item.title}</h3>
              <p className="news-card__excerpt">{item.content?.slice(0, 90)}...</p>
              <Link href={`/components/pages/new/${item.id}`} className="news-card__link">
                Читать далее
                <span className="news-card__arrow">→</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default News;