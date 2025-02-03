import React from 'react';
import style from './heroSection.module.css';

interface HeroSectionProps {
  imageSrc: string;
  title: string;
  altText?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ imageSrc, title, altText = "Background Image" }) => {
  return (
    <section className={style.hero}>
      <img src={imageSrc} alt={altText} className={style.heroImage} loading="lazy" />
      <div className={style.overlay}></div>
      <h1 className={style.heroText}>{title}</h1>
    </section>
  );
};

export default HeroSection;
