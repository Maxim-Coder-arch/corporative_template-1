import Advantages from "./components/main/advantages";
import Bid from "./components/main/bid";
import HeroSection from "./components/main/hero-section";
import Reviews from "./components/main/reviews";
import Stages from "./components/main/stages";
import "./styles/scss/main-page/home/index.scss";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Advantages />
      <Stages />
      <Reviews />
      <Bid />
    </main>
  );
}
