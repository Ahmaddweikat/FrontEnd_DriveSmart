import React from 'react';
import { ImageList, ImageListItem } from '@mui/material';
import { GALLERY_IMAGES } from '../../constants';

const GalleryTab = () => {
  return (
    <ImageList cols={3} gap={16}>
      {GALLERY_IMAGES.map((item) => (
        <ImageListItem key={item.id}>
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
            style={{ borderRadius: '12px' }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default GalleryTab;
