'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import "../../../styles/scss/pages/services/index.scss";

interface Service {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch services:', err);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <section className="services-page">
        <div className="services-container">
          <div className="services-loading">Загрузка услуг...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="services-page">
      <div className="services-container">
        <div 
          className="services-header"
        >
          <h1>Наши услуги</h1>
          <p>Поможем вашему бизнесу расти</p>
        </div>

        <div 
          className="services-grid"
        >
          {services.length === 0 ? (
            <div className="services-empty">Услуги скоро появятся</div>
          ) : (
            services.map((service) => (
              <div 
                key={service._id}
                className="service-card"
              >
                {service.image ? (
                  <div className="service-card__image">
                    <Image 
                      src={service.image} 
                      alt={service.title}
                      className="service-card__img"
                      width={400}
                      height={250}
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
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;