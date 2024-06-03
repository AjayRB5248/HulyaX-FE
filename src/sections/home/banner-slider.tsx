import Image from "next/image";
import WebBanner from "src/assets/frontend/images/media/AXIXPOSTER.png";
import { EventProps } from "src/types/events";
import { EventStatusEnum } from "../tour/utils";

const BannerSlider: React.FC<EventProps> = ({ events }) => {
  let featuredEvent =
    events &&
    events.length > 0 &&
    events?.find((event: any) => event.status === EventStatusEnum.ONGOING && event.tags?.includes("FEATURED"));

  const bannerImage =
    featuredEvent &&
    featuredEvent?.images &&
    featuredEvent?.images?.find((eventImg: any) => eventImg?.isPrimary)?.imageurl;

  return (
    <section className="section-wrapper ad-banner-section">
      <div className="container-fluid">
        <div className="banner-wrapper">
          <Image src={bannerImage} alt="Banner" height={1200} width={1200} />
        </div>
      </div>
    </section>
  );
};

export default BannerSlider;
