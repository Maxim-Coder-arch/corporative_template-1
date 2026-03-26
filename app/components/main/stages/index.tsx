'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import "../../../styles/scss/main-page/stages/index.scss";
import { websiteData as data } from "@/data/data.website";

const Stages = () => {
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
    <section id="stages" ref={ref}>
      <div className="stages">
        <motion.div 
          className="stages-content"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="stages-content-title">
            <h3>{data.stages.title}</h3>
          </div>

          <motion.div 
            className="stages-content-points"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {data.stages.stagesPoints.map((item, index) => (
              <motion.div 
                key={index} 
                className="stages-content-points-item"
                variants={itemVariants}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="stages-item-number">
                  <span>0{index + 1}</span>
                  <div className="stages-item-line" />
                </div>
                <h4>{item.title}</h4>
                <p>{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Stages;