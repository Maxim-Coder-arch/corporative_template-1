import "../../../styles/scss/pages/about/index.scss";
import { pagesData as data } from "@/data/data.website";


const AboutBlockParagraphs = () => {
  return (
    <div className="about-block">
      <div className="about-block-title">
        <h3>{data.about.title}</h3>
      </div>
      <div className="about-block-paragraphs">
        {data.about.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  )
}

const OurMission = () => {
  return (
    <div className="about-our-mission">
      <h3>{data.about.titleMission}</h3>
      <div className="about-our-mission-points">
        {data.about.paragraphsMission.map((paragraph, index) => (
          <div className="about-our-mission-item" key={index}>
            <h4>0{index + 1}</h4>
            <span>{paragraph}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const OurDirection = () => {
  return (
    <div className="about-our-direction">
      <h3>{data.about.direction.label}</h3>
      <div className="about-our-direction-sub-label">
        {data.about.direction.subLabel}
      </div>
      <div className="about-our-direction-points">
        {data.about.direction.directionPoints.map((point, index) => (
          <div className="about-our-direction-item" key={index}>
            <h4>{point.title}</h4>
            <span>{point.label}</span>
          </div>
        ))}
        </div>
    </div>
  )
}

const About = () => {
  return(
    <section id="about">
      <div className="about">
        <div className="about-content">
          <AboutBlockParagraphs />
          <OurMission />
          <OurDirection />
        </div>
      </div>
    </section>
  )
}

export default About;