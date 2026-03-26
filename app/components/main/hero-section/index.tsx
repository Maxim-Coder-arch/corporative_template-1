'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import "../../../styles/scss/main-page/home/index.scss";
import { websiteData as data } from "@/data/data.website";

const HeroSection = () => {
  return (
    <section id="hero-section">
      <div className="hero-section">
        <motion.div 
          className="hero-section-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>{data.heroSection.title}</h1>
          <h2>{data.heroSection.subTitle}</h2>
          <Link href={data.heroSection.labelLink}>{data.heroSection.labelLink}</Link>
        </motion.div>

        <motion.div 
          className="hero-section-ares-of-work"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {data.heroSection.aresOfWork.map((item, index) => (
            <div key={index} className="hero-section-ares-of-work-item">
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection;