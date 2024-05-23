import Image from "next/image";
import WebBanner from "src/assets/frontend/images/media/AXIXPOSTER.png";

const BannerSlider = () => {
  return (
    <section className="section-wrapper ad-banner-section">
      <div className="container-fluid">
        <div className="banner-wrapper">
          <Image src={WebBanner} alt="Banner" />
        </div>
      </div>
    </section>
  );
};

export default BannerSlider;
