import Image from "next/image";
import React, { useEffect } from "react";
import Slider from "react-slick";

import Artist01 from "src/assets/frontend/images/artists/Sacar.jpeg";
import Artist02 from "src/assets/frontend/images/artists/Neetesh.jpeg";
import Artist03 from "src/assets/frontend/images/artists/Olivia.png";
import Artist04 from "src/assets/frontend/images/artists/LANA.jpg";

// TODO: Add Image URL , Artist Title in Artists
const mockArtists = [
  {
    _id: "65bdbed4b7dd4b1bfeae1a03",
    artistName: "Sacar KANDEL",
    imageUrl: Artist01,
  },
  {
    _id: "65bdbed4b7dd4b1bfeae1a03",
    artistName: "Sacar KANDEL",
    imageUrl: Artist02,
  },
  {
    _id: "65bdbed4b7dd4b1bfeae1a03",
    artistName: "Sacar KANDEL",
    imageUrl: Artist03,
  },
  {
    _id: "65bdbed4b7dd4b1bfeae1a03",
    artistName: "Sacar KANDEL",
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
      <div className="artists-grid">
        {mockArtists?.map((eachArtist: any, index: number) => (
          <div className="artists-item" key={index}>
            <div className="artists-thumb">
              <Image src={eachArtist.imageUrl} height={50} width={50} alt="artists" style={{ objectFit: "cover" }} />
            </div>
            <div className="artists-content">
              <h5 className="title">{eachArtist.artistName}</h5>
              <span className="cate">Musician/Actor</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventArtists;
