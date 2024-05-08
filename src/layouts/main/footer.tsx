import Image from 'next/image';
import Link from 'next/link';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import FooterBackground from 'src/assets/frontend/images/event1.jpg';
import FooterLogo from 'src/assets/frontend/images/hulyalogo-dark.png';
import axiosInstance from 'src/utils/axios';

const socialIcons = [
  { iconClass: 'fab fa-facebook-f', href: '#0' },
  { iconClass: 'fab fa-twitter', href: '#0', isActive: true },
  { iconClass: 'fab fa-pinterest-p', href: '#0' },
  { iconClass: 'fab fa-google', href: '#0' },
  { iconClass: 'fab fa-instagram', href: '#0' },
];

const footerLinks = [
  { label: 'About', href: '#0' },
  { label: 'Terms Of Use', href: '#0' },
  { label: 'Privacy Policy', href: '#0' },
  { label: 'FAQ', href: '#0' },
  { label: 'Feedback', href: '#0' },
];

const Year = new Date().getFullYear();

export default function Footer() {
  const [email, setEmail] = useState('');

  const renderLink = (item: any, key: any) => (
    <li key={key}>
      <Link href={item.href}>
        {item.label || <i className={item.iconClass}></i>}
      </Link>
    </li>
  );

  const handelSubscribe = (e: any): void => {
    e.preventDefault();
    if (!email) return;
    axiosInstance
      .post(`/subscribe`, { email })
      .then((response: any) => {
        if (response.status === 201) {
          enqueueSnackbar(
            response?.data?.message || 'Event Removed Successfully',
            {
              variant: 'success',
            }
          );
        } else {
          enqueueSnackbar('Error Subscribing Event', { variant: 'error' });
        }
      })
      .catch((error) => {
        console.error('Error getting:', error);
        enqueueSnackbar(
          error?.response?.data?.message || 'Error Subscribing Event',
          {
            variant: 'error',
          }
        );
      });
  };

  return (
    <footer className='footer-section'>
      <div className='newslater-section padding-bottom mt-50'>
        <div className='container'>
          <div
            className='newslater-container bg_img'
            style={{ backgroundImage: `url(${FooterBackground.src})` }}
          >
            <div className='newslater-wrapper'>
              <h5 className='cate'>subscribe to Hulya </h5>
              <h3 className='title'>to get exclusive benefits</h3>
              <form className='newslater-form'>
                <input
                  type='text'
                  placeholder='Your Email Address'
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  style={{
                    fontSize: 14,
                    color: '#fff',
                  }}
                />
                <button type='submit' onClick={handelSubscribe}>
                  subscribe
                </button>
              </form>
              <p>We respect your privacy, so we never share your info</p>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='footer-top'>
          <div className='logo'>
            <Link href='index-1.html'>
              <Image width={100} src={FooterLogo} alt='Footer Image' />
            </Link>
          </div>
          <ul className='social-icons'>{socialIcons.map(renderLink)}</ul>
        </div>
        <div className='footer-bottom'>
          <div className='footer-bottom-area'>
            <div className='left'>
              <p>
                Copyright © {Year}.All Rights Reserved By{' '}
                <Link href='#0'>Hulya Events</Link>
              </p>
            </div>
            <ul className='links'>{footerLinks.map(renderLink)}</ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
