'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";
import { websiteData as data } from "@/data/data.website";
import "../../../styles/scss/main-page/bid/index.scss";

const Bid = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // TODO: подключить API позже
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };


  return (
    <section id="bid" className="bid-section">
      <div className="bid-container">
        {/* Левая секция */}
        <motion.div 
          className="bid-info"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="bid-info__title">{data.bid.title}</h2>
          <p className="bid-info__subtitle">{data.bid.subtle}</p>
          
          <div className="bid-info__divider">
            <span>или</span>
          </div>
          
          <div className="bid-info__social">
            <p className="bid-info__social-label">Свяжитесь с нами сами</p>
            <div className="bid-info__social-icons">
              {data.bid.socials.map((social, idx) => (
                <motion.a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  whileHover={{ y: -3, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                >
                  <Image src={social.icon} alt={social.name} width={24} height={24} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Правая секция — форма */}
        <motion.div 
          className="bid-form"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="bid-form__form">
            <div className="bid-form__field">
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
            
            <div className="bid-form__field">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={status === 'loading'}
              />
            </div>
            
            <div className="bid-form__field">
              <input
                type="tel"
                name="phone"
                placeholder="Телефон"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={status === 'loading'}
              />
            </div>
            
            <div className="bid-form__field">
              <textarea
                name="message"
                placeholder="Ваше сообщение"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                disabled={status === 'loading'}
              />
            </div>
            
            <button 
              type="submit" 
              className="bid-form__submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Отправка...' : 
               status === 'success' ? '✓ Отправлено' : 
               status === 'error' ? '✗ Ошибка' : 'Отправить заявку'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Bid;