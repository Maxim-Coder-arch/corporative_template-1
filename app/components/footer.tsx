'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import "../styles/scss/footer.scss";
import { websiteData as data } from "@/data/data.website";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="footer-contacts">
      <div className="footer-container">
        <motion.div 
          className="footer-brand"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="footer-brand__title">{data.footer.title}</h2>
          <p className="footer-brand__subtitle">{data.footer.subtitle}</p>
          <div className="footer-brand__social">
            {data.footer.contacts.map((contact, idx) => (
              <motion.a
                key={idx}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ duration: 0.2, delay: idx * .1 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <Image src={contact.icon} alt="Соцсеть" width={24} height={24} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="footer-links"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="footer-links__col">
            <h3>{data.footer.menu.label}</h3>
            <ul>
              {data.footer.menu.points.map((point, idx) => (
                <li key={idx}>
                  <Link href={point.link}>{point.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-links__col">
            <h3>{data.footer.agrees.title}</h3>
            <ul>
              {data.footer.agrees.points.map((point, idx) => (
                <li key={idx}>
                  <Link href={point.link}>{point.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="footer-bottom"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="footer-bottom__info">
          <span>{data.footer.regionOrCopyright}</span>
          <span className="separator">•</span>
          <a href={`tel:${data.footer.tel}`}>{data.footer.tel}</a>
          <span className="separator">•</span>
          <a href={`mailto:${data.footer.email}`}>{data.footer.email}</a>
        </div>
        <div className="footer-bottom__copyright">
          © {currentYear} NEXSOL. Все права защищены.
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;