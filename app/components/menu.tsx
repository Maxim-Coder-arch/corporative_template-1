'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuData } from "@/data/data.website";
import Image from "next/image";
import Link from "next/link";
import "../styles/scss/menu.scss";
import { usePathname } from 'next/navigation';

const Menu = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`menu ${isScrolled ? 'menu--scrolled' : ''}`}>
        <Link href="/" className="logotype-company">
          <div 
            className="logo" 
            style={{ backgroundImage: `url(${menuData.logotype})` }}
            aria-label="Логотип компании"
          />
          <span className="company-name">{menuData.companyName}</span>
        </Link>

        <ul className="menu-desktop">
          {menuData.points.map((item, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={item.link} className={`menu-link ${pathName === item.link ? 'menu-link-active' : ''}`}>
                {item.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="contacts-menu">
          <ul className="social-icons">
            {menuData.iconsLink.map((item, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Link 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={`Перейти в ${item.icon}`}
                >
                  <Image 
                    src={item.icon} 
                    alt={item.icon}
                    width={20}
                    height={20}
                  />
                </Link>
              </motion.li>
            ))}
          </ul>
          <Link 
            href={menuData.linkTargetAction.link} 
            className="cta-button"
          >
            {menuData.linkTargetAction.label}
          </Link>
        </div>

        <button 
          className={`burger ${isMobileMenuOpen ? 'burger--open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Меню"
        >
          <span></span>
          <span></span>
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <div className="mobile-menu-header">
                <div className="mobile-menu-logo">
                  <div 
                    className="logo" 
                    style={{ backgroundImage: `url(${menuData.logotype})` }}
                  />
                  <span>{menuData.companyName}</span>
                </div>
                <button 
                  className="mobile-menu-close"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ✕
                </button>
              </div>
              <ul className="mobile-menu-list">
                {menuData.points.map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link 
                    className={`${pathName === item.link ? 'menu-link-active' : ''}`}
                      href={item.link} 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mobile-menu-footer">
                <div className="mobile-social-icons">
                  {menuData.iconsLink.map((item, index) => (
                    <Link 
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image src={item.icon} alt={item.icon} width={24} height={24} />
                    </Link>
                  ))}
                </div>
                <Link 
                  href={menuData.linkTargetAction.link} 
                  className="mobile-cta"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {menuData.linkTargetAction.label}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Menu;