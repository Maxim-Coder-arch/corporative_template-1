import "../../../styles/scss/main-page/advantages/index.scss";
import { websiteData as data } from "@/data/data.website";

const Advantages = () => {
  return (
    <section id="advantages">
      <div className="advantages">
        <div className="advantages-content">

          <div className="advantages-content-title">
            <h3>{data.advantages.title}</h3>
          </div>

          <div className="advantages-content-points">
            {data.advantages.advantagesPoints.map((item, index) => (
              <div key={index} className="advantages-content-points-item">
                <h4>0{index + 1}</h4>
                <span>{item}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}


export default Advantages;