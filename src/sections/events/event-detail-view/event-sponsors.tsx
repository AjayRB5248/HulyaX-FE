import Image from "next/image";
import React, { useEffect } from "react";
import Slider from "react-slick";

import Sponsor01 from "src/assets/frontend/images/sponsors/sponsor01.png";
import Sponsor02 from "src/assets/frontend/images/sponsors/sponsor02.png";

const mockSponsors = [
  {
    imageUrl: Sponsor01,
  },
];

const EventSponsors: React.FC<any> = ({ sponsors }) => {

  return (
    <div className="item">
      <div className="header">
        <h5 className="sub-title">Organizers and Sponsors</h5>
        <div className="navigation d-none">
          <div className="sponsors-prev">
            <i className="flaticon-double-right-arrows-angles"></i>
          </div>
          <div className="sponsors-next">
            <i className="flaticon-double-right-arrows-angles"></i>
          </div>
        </div>
      </div>
      <div className="sponsors-grid">
        {mockSponsors?.map((eachSponsor: any, index: number) => (
          <div className="sponsors-item" key={index}>
            <div className="sponsors-thumb">
              <Image src={eachSponsor.imageUrl} height={50} width={50} alt="Sponsors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventSponsors;
