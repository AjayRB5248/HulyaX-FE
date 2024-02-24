import Image from "next/image";
import React from "react";

import SacarPoster from "src/assets/frontend/images/event/SacarPoster.jpeg";
import NeeteshPoster from "src/assets/frontend/images/event/NeeteshConcert.jpg";
import Slider from "react-slick";
import { SliderGallery } from "src/components/slider-gallery";


const EventAbout: React.FC<any> = ({ eventName, eventDescription, eventPrimaryImg, eventImages }) => {
  return (
    <section className="movie-details-section padding-top padding-bottom">
      <div className="container-fluid">
        <div className="row justify-content-center flex-wrap-reverse mb--50">
          <div className="col-lg-3 col-sm-10 col-md-6 mb-50">
            {/* <div className="widget-1 widget-tags">
                    <ul>
                        <li>
                            <a href="#0">2D</a>
                        </li>
                        <li>
                            <a href="#0">imax 2D</a>
                        </li>
                        <li>
                            <a href="#0">4DX</a>
                        </li>
                    </ul>
                </div>
                <div className="widget-1 widget-offer">
                    <h3 className="title">Applicable offer</h3>
                    <div className="offer-body">
                        <div className="offer-item">
                            <div className="thumb">
                                <img src="./assets/images/sidebar/offer01.png" alt="sidebar">
                            </div>
                            <div className="content">
                                <h6>
                                    <a href="#0">Amazon Pay Cashback Offer</a>
                                </h6>
                                <p>Win Cashback Upto Rs 300*</p>
                            </div>
                        </div>
                        <div className="offer-item">
                            <div className="thumb">
                                <img src="./assets/images/sidebar/offer02.png" alt="sidebar">
                            </div>
                            <div className="content">
                                <h6>
                                    <a href="#0">PayPal Offer</a>
                                </h6>
                                <p>Transact first time with Paypal and
                                    get 100% cashback up to Rs. 500</p>
                            </div>
                        </div>
                        <div className="offer-item">
                            <div className="thumb">
                                <img src="./assets/images/sidebar/offer03.png" alt="sidebar">
                            </div>
                            <div className="content">
                                <h6>
                                    <a href="#0">HDFC Bank Offer</a>
                                </h6>
                                <p>Get 15% discount up to INR 100* 
                                    and INR 50* off on F&B T&C apply</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="widget-1 widget-banner">
                    <div className="widget-1-body">
                        <a href="#0">
                            <img src="./assets/images/sidebar/banner/banner01.jpg" alt="banner">
                        </a>
                    </div>
                </div> */}
          </div>
          <div className="col-lg-9 mb-50">
            <div className="movie-details">
              <h3 className="title font-weight-bold mb-4">Gallery</h3>
              <SliderGallery eventImages={eventImages} />

              <div className="tab summery-review">
                <ul className="tab-menu">
                  <li className="active">summery</li>
                  <li>
                    user review <span>147</span>
                  </li>
                </ul>
                <div className="tab-area">
                  <div className="tab-item active">
                    <div className="item">
                      <h5 className="sub-title">Synopsis</h5>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula eros sit amet est
                        tincidunt aliquet. Fusce laoreet ligula ac ultrices eleifend. Donec hendrerit fringilla odio, ut
                        feugiat mi convallis nec. Fusce elit ex, blandit vitae mattis sit amet, iaculis ac elit. Ut diam
                        mauris, viverra sit amet dictum vel, aliquam ac quam. Ut mi nisl, fringilla sit amet erat et,
                        convallis porttitor ligula. Sed auctor, orci id luctus venenatis, dui dolor euismod risus, et
                        pharetra orci lectus quis sapien. Duis blandit ipsum ac consectetur scelerisque.{" "}
                      </p>
                    </div>
                    {/* <div className="item">
                                    <div className="header">
                                        <h5 className="sub-title">cast</h5>
                                        <div className="navigation">
                                            <div className="cast-prev"><i className="flaticon-double-right-arrows-angles"></i></div>
                                            <div className="cast-next"><i className="flaticon-double-right-arrows-angles"></i></div>
                                        </div>
                                    </div>
                                    <div className="casting-slider owl-carousel">
                                        <div className="cast-item">
                                            <div className="cast-thumb">
                                                <a href="#0">
                                                    <img src="./assets/images/cast/cast01.jpg" alt="cast">
                                                </a>
                                            </div>
                                            <div className="cast-content">
                                                <h6 className="cast-title"><a href="#0">Bill Hader</a></h6>
                                                <span className="cate">actor</span>
                                                <p>As Richie Tozier</p>
                                            </div>
                                        </div>
                                        <div className="cast-item">
                                            <div className="cast-thumb">
                                                <a href="#0">
                                                    <img src="./assets/images/cast/cast02.jpg" alt="cast">
                                                </a>
                                            </div>
                                            <div className="cast-content">
                                                <h6 className="cast-title"><a href="#0">nora hardy</a></h6>
                                                <span className="cate">actor</span>
                                                <p>As raven</p>
                                            </div>
                                        </div>
                                        <div className="cast-item">
                                            <div className="cast-thumb">
                                                <a href="#0">
                                                    <img src="./assets/images/cast/cast03.jpg" alt="cast">
                                                </a>
                                            </div>
                                            <div className="cast-content">
                                                <h6 className="cast-title"><a href="#0">alvin peters</a></h6>
                                                <span className="cate">actor</span>
                                                <p>As magneto</p>
                                            </div>
                                        </div>
                                        <div className="cast-item">
                                            <div className="cast-thumb">
                                                <a href="#0">
                                                    <img src="./assets/images/cast/cast04.jpg" alt="cast">
                                                </a>
                                            </div>
                                            <div className="cast-content">
                                                <h6 className="cast-title"><a href="#0">josh potter</a></h6>
                                                <span className="cate">actor</span>
                                                <p>As quicksilver</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="header">
                                        <h5 className="sub-title">crew</h5>
                                        <div className="navigation">
                                            <div className="cast-prev-2"><i className="flaticon-double-right-arrows-angles"></i></div>
                                            <div className="cast-next-2"><i className="flaticon-double-right-arrows-angles"></i></div>
                                        </div>
                                    </div>
                                    <div className="casting-slider-two owl-carousel">
                                        <div className="cast-item">
                                            <div className="cast-thumb">
                                                <a href="#0">
                                                    <img src="./assets/images/cast/cast05.jpg" alt="cast">
                                                </a>
                                            </div>
                                            <div className="cast-content">
                                                <h6 className="cast-title"><a href="#0">pete warren</a></h6>
                                                <span className="cate">actor</span>
                                            </div>
                                        </div>
                                        <div className="cast-item">
                                            <div className="cast-thumb">
                                                <a href="#0">
                                                    <img src="./assets/images/cast/cast06.jpg" alt="cast">
                                                </a>
                                            </div>
                                            <div className="cast-content">
                                                <h6 className="cast-title"><a href="#0">howard bass</a></h6>
                                                <span className="cate">executive producer</span>
                                            </div>
                                        </div>
                                        <div className="cast-item">
                                            <div className="cast-thumb">
                                                <a href="#0">
                                                    <img src="./assets/images/cast/cast07.jpg" alt="cast">
                                                </a>
                                            </div>
                                            <div className="cast-content">
                                                <h6 className="cast-title"><a href="#0">naomi smith</a></h6>
                                                <span className="cate">producer</span>
                                            </div>
                                        </div>
                                        <div className="cast-item">
                                            <div className="cast-thumb">
                                                <a href="#0">
                                                    <img src="./assets/images/cast/cast08.jpg" alt="cast">
                                                </a>
                                            </div>
                                            <div className="cast-content">
                                                <h6 className="cast-title"><a href="#0">tom martinez</a></h6>
                                                <span className="cate">producer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                  </div>
                  {/* <div className="tab-item">
                                <div className="movie-review-item">
                                    <div className="author">
                                        <div className="thumb">
                                            <a href="#0">
                                                <img src="./assets/images/cast/cast02.jpg" alt="cast">
                                            </a>
                                        </div>
                                        <div className="movie-review-info">
                                            <span className="reply-date">13 Days Ago</span>
                                            <h6 className="subtitle"><a href="#0">minkuk seo</a></h6>
                                            <span><i className="fas fa-check"></i> verified review</span>
                                        </div>
                                    </div>
                                    <div className="movie-review-content">
                                        <div className="review">
                                            <i className="flaticon-favorite-heart-button"></i>
                                            <i className="flaticon-favorite-heart-button"></i>
                                            <i className="flaticon-favorite-heart-button"></i>
                                            <i className="flaticon-favorite-heart-button"></i>
                                            <i className="flaticon-favorite-heart-button"></i>
                                        </div>
                                        <h6 className="cont-title">Awesome Movie</h6>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer volutpat enim non ante egestas vehicula. Suspendisse potenti. Fusce malesuada fringilla lectus venenatis porttitor. </p>
                                        <div className="review-meta">
                                            <a href="#0">
                                                <i className="flaticon-hand"></i><span>8</span>
                                            </a>
                                            <a href="#0" className="dislike">
                                                <i className="flaticon-dont-like-symbol"></i><span>0</span>
                                            </a>
                                            <a href="#0">
                                                Report Abuse
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="movie-review-item">
                                    <div className="author">
                                        <div className="thumb">
                                            <a href="#0">
                                                <img src="./assets/images/cast/cast04.jpg" alt="cast">
                                            </a>
                                        </div>
                                        <div className="movie-review-info">
                                            <span className="reply-date">13 Days Ago</span>
                                            <h6 className="subtitle"><a href="#0">rudra rai</a></h6>
                                            <span><i className="fas fa-check"></i> verified review</span>
                                        </div>
                                    </div>
                                    <div className="movie-review-content">
                                        <div className="review">
                                            <i className="flaticon-favorite-heart-button"></i>
                                            <i className="flaticon-favorite-heart-button"></i>
                                            <i className="flaticon-favorite-heart-button"></i>
                                            <i className="flaticon-favorite-heart-button"></i>
                                            <i className="flaticon-favorite-heart-button"></i>
                                        </div>
                                        <h6 className="cont-title">Awesome Movie</h6>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer volutpat enim non ante egestas vehicula. Suspendisse potenti. Fusce malesuada fringilla lectus venenatis porttitor. </p>
                                        <div className="review-meta">
                                            <a href="#0">
                                                <i className="flaticon-hand"></i><span>8</span>
                                            </a>
                                            <a href="#0" className="dislike">
                                                <i className="flaticon-dont-like-symbol"></i><span>0</span>
                                            </a>
                                            <a href="#0">
                                                Report Abuse
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="movie-review-item">
                                    <div className="author">
                                        <div className="thumb">
                                            <a href="#0">
                                                <img src="./assets/images/cast/cast01.jpg" alt="cast">
                                            </a>
                                        </div>
                                        <div className="movie-review-info">
                                            <span className="reply-date">13 Days Ago</span>
                                            <h6 className="subtitle"><a href="#0">rafuj</a></h6>
                                            <span><i className="fas fa-check"></i> verified review</span>
                                        </div>
                                    </div>
                                    <div className="movie-review-content">
                                        <div className="review">
                                            <i className="flaticon-favorite-heart-button"></i>
                                            <i className="flaticon-favorite-heart-button"></i>
                                            <i className="flaticon-favorite-heart-button"></i>
                                            <i className="flaticon-favorite-heart-button"></i>
                                            <i className="flaticon-favorite-heart-button"></i>
                                        </div>
                                        <h6 className="cont-title">Awesome Movie</h6>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer volutpat enim non ante egestas vehicula. Suspendisse potenti. Fusce malesuada fringilla lectus venenatis porttitor. </p>
                                        <div className="review-meta">
                                            <a href="#0">
                                                <i className="flaticon-hand"></i><span>8</span>
                                            </a>
                                            <a href="#0" className="dislike">
                                                <i className="flaticon-dont-like-symbol"></i><span>0</span>
                                            </a>
                                            <a href="#0">
                                                Report Abuse
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="movie-review-item">
                                    <div className="author">
                                        <div className="thumb">
                                            <a href="#0">
                                                <img src="./assets/images/cast/cast03.jpg" alt="cast">
                                            </a>
                                        </div>
                                        <div className="movie-review-info">
                                            <span className="reply-date">13 Days Ago</span>
                                            <h6 className="subtitle"><a href="#0">bela bose</a></h6>
                                            <span><i className="fas fa-check"></i> verified review</span>
                                        </div>
                                    </div>
                                    <div className="movie-review-content">
                                        <div className="review">
                                            <i className="flaticon-favorite-heart-button"></i>
                                            <i className="flaticon-favorite-heart-button"></i>
                                            <i className="flaticon-favorite-heart-button"></i>
                                            <i className="flaticon-favorite-heart-button"></i>
                                            <i className="flaticon-favorite-heart-button"></i>
                                        </div>
                                        <h6 className="cont-title">Awesome Movie</h6>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer volutpat enim non ante egestas vehicula. Suspendisse potenti. Fusce malesuada fringilla lectus venenatis porttitor. </p>
                                        <div className="review-meta">
                                            <a href="#0">
                                                <i className="flaticon-hand"></i><span>8</span>
                                            </a>
                                            <a href="#0" className="dislike">
                                                <i className="flaticon-dont-like-symbol"></i><span>0</span>
                                            </a>
                                            <a href="#0">
                                                Report Abuse
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="load-more text-center">
                                    <a href="#0" className="custom-button transparent">load more</a>
                                </div>
                            </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventAbout;
