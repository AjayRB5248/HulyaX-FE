import Image from "next/image";
import Lana from "src/assets/frontend/images/artists/LANA.jpg";
import Sacar from "src/assets/frontend/images/artists/Sacar.jpeg";
import Neetesh from "src/assets/frontend/images/artists/Neetesh.jpeg";
import Olivia from "src/assets/frontend/images/artists/Olivia.png";

import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

const artists = [
  {
    artistName: "Sacar Adhikari",
    artistTitle: "Rapper/Musician",
    artistProfileImg: Sacar,
  },
  {
    artistName: "Neetesh Jung Kunwar",
    artistTitle: "Rapper/Musician",
    artistProfileImg: Neetesh,
  },
  {
    artistName: "Olivia Rodrigo",
    artistTitle: "Singer/Pianist",
    artistProfileImg: Olivia,
  },
  {
    artistName: "Lana Del Rey",
    artistTitle: "Singer/SongWriter",
    artistProfileImg: Lana,
  },
  {
    artistName: "Sacar Adhikari",
    artistTitle: "Rapper/Musician",
    artistProfileImg: Sacar,
  },
  {
    artistName: "Neetesh Jung Kunwar",
    artistTitle: "Rapper/Musician",
    artistProfileImg: Lana,
  },
];

const Artists = () => {
  return (
    <section className="section-wrapper artists-section">
      <div className="section-title">
        <h4 className="title">Meet Popular Artists</h4>
        <p>Discover a world of art and innovation with renowned global artists.</p>
      </div>
      <div className="container-fluid">
        <Slider {...settings}>
          {artists.map((artist: any) => (
            <div className="d-flex flex-column align-items-center">
              <div className="artist-profile">
                <Image src={artist.artistProfileImg} alt={artist.artistName} />
              </div>
              <div className="artist-desc">
                <h3 className="name">{artist.artistName}</h3>
                <span className="title">{artist.artistTitle}</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Artists;
