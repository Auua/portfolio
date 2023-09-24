import Image from 'next/image';

type PictureProps = {
  alt: string;
  source: string;
  desc?: string;
  isCircle?: boolean;
  sizes: string;
};
const Picture = ({
  source, alt, desc, isCircle = false, sizes,
}: PictureProps) => (
  <figure className={`image-container ${isCircle ? 'circle' : null}`}>
    <Image
      src={source}
      fill={true}
      alt={alt}
      sizes={sizes}
    />
    {desc ? <figcaption className={'image-caption visually__hidden'}>{desc}</figcaption> : null}
  </figure>
);
export default Picture;
