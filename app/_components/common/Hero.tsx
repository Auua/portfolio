import '@/app/_styles/common.css';

import React from 'react';
import Picture from '@/app/_components/pictures/Picture';

type HeroProps = {
  title: string;
  content: string;
  tag: string;
  img?: string;

};
const Hero = ({
  title, content, tag, img,
}: HeroProps) => (
  <section className={'hero-container'} id={`hero__${tag}`}>
    {img ? <Picture source={img} alt={tag} isCircle={true}
                    sizes={'(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'} /> : null}
    <div className={`hero ${img ? 'with-image' : ''}`}>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  </section>
);
export default Hero;
