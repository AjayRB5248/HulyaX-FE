import Image from "next/image";
import FooterBackground from "src/assets/frontend/images/event1.jpg";
import AppImg1 from "src/assets/frontend/images/apps/apps01.png";
import AppImg2 from "src/assets/frontend/images/apps/apps02.png";
import AppImg3 from "src/assets/frontend/images/apps/apps03.png";

const MobileApp = () => {
  return (
    <section className="section-wrapper">
      <div className="container-fluid">
        <div className="apps-wrapper">
          <div className="bg_img apps-bg" style={{ backgroundImage: `url(${AppImg1.src})` }}></div>

          <div className="row">
            <div className="col-lg-7 offset-lg-5">
              <div className="content">
                <h3 className="title">Hulya Events App Launching Soon</h3>
                <p>
                  Discover the Hulya Events App: Scan for exclusive event details and unlock a world of unforgettable
                  experiences.
                </p>
                <ul className="app-button">
                  <li>
                    <a href="#0">
                      <Image src={AppImg3} alt="apps" />
                    </a>
                  </li>
                  <li>
                    <a href="#0">
                      <Image src={AppImg2} alt="apps" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileApp;
