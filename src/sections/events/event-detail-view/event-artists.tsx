import Image from 'next/image';
import React from 'react';

const EventArtists: React.FC<any> = ({ artists }) => {
  return (
    <div className='item'>
      <div className='header'>
        <h5 className='sub-title'>Artists</h5>
        <div className='navigation d-none'>
          <div className='sponsors-prev'>
            <i className='flaticon-double-right-arrows-angles'></i>
          </div>
          <div className='sponsors-next'>
            <i className='flaticon-double-right-arrows-angles'></i>
          </div>
        </div>
      </div>
      <div className='artists-grid'>
        {artists?.map((eachArtist: any, index: number) => (
          <div className='artists-item' key={index}>
            <div className='artists-thumb'>
              <Image
                src={eachArtist?.images?.[0]?.imageurl}
                height={500}
                width={500}
                alt={eachArtist?.artistName}
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className='artists-content'>
              <h5 className='title'>{eachArtist?.artistName}</h5>
              <span className='cate'>{eachArtist?.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventArtists;
