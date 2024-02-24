import Image from "next/image";
import React, { useEffect } from "react";
import Slider from "react-slick";

import Artist01 from "src/assets/frontend/images/artists/Sacar.jpeg";
import Artist02 from "src/assets/frontend/images/artists/Neetesh.jpeg";
import Artist03 from "src/assets/frontend/images/artists/Olivia.png";
import Artist04 from "src/assets/frontend/images/artists/LANA.jpg";

// TODO: Add Image URL in Artists
const mockArtists = [
  {
    imageUrl: Artist01,
  },
  {
    imageUrl: Artist02,
  },
  {
    imageUrl: Artist03,
  },
  {
    imageUrl: Artist04,
  },
];

const EventArtists: React.FC<any> = ({ artists }) => {
  return (
    <div className="item">
      <div className="header">
        <h5 className="sub-title">Artists</h5>
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
        {mockArtists?.map((eachArtist: any, index: number) => (
          <div className="sponsors-item" key={index}>
            <div className="sponsors-thumb">
              <Image src={eachArtist.imageUrl} height={50} width={50} alt="Sponsors" style={{ objectFit: "cover" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventArtists;
