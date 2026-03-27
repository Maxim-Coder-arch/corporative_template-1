'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from "next/image";
import "../../../styles/scss/pages/services/index.scss";
import { pagesData as data } from "@/data/data.website";

const Services = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="services" className="services-page" ref={ref}>
      <div className="services-container">
        <motion.div 
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h1>{data.servicesOrProducts.title}</h1>
          <p>{data.servicesOrProducts.subtitle}</p>
        </motion.div>

        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {data.servicesOrProducts.servicePoints.map((service, index) => (
            <motion.div 
              key={index}
              className="service-card"
              variants={itemVariants}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -8 }}
            >
              {service.img ? (
                <div className="service-card__image">
                  <Image 
                    src={service.img} 
                    alt={service.title}
                    width={400}
                    height={250}
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="service-card__overlay" />
                </div>
              ) : (
                <div className="service-card__placeholder">
                  <span className="service-card__placeholder-icon">✨</span>
                </div>
              )}

              <div className="service-card__content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;