import React from 'react';
import logoPng from '../assets/logo.png';
import logoWebp from '../assets/logo.webp';

const Logo = ({ className = "h-8" }) => (
  <picture>
    <source srcSet={logoWebp} type="image/webp" />
    <img 
      src={logoPng}
      alt="RB First Connect"
      className={`${className} object-contain`}
    />
  </picture>
);

export default Logo;
