import Image from 'next/image';

const Logo = () => {
  return (
    <>
      <Image
        src="/static/images/images.png"
        width={100}
        height={50}
        alt="Go to home page"
      />
    </>
  );
};

export default Logo;
