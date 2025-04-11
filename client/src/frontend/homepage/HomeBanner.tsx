import React from 'react';
import Slider from 'react-slick';
import { Button, Typography, Container, Box } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface BannerItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

const banners: BannerItem[] = [
  {
    id: 1,
    image: 'public/bannerimage/home-banner-one.jpg',
    title: 'Increase print profits <br /> by lowering costs.',
    description:
      'With our help, you can reduce your printing costs and maximize your profit margin.',
  },
  {
    id: 2,
    image: 'public/bannerimage/home-banner-two.jpg',
    title: 'Reduce costs <br /> maximize margins.',
    description:
      'Our solutions streamline printing operations and help cut unnecessary expenses.',
  },
  {
    id: 3,
    image: 'public/bannerimage/home-banner-three.jpg',
    title: 'Streamline your print business <br /> with smart tools.',
    description:
      'We provide tools to improve efficiency and boost profitability in the print industry.',
  },
  {
    id: 4,
    image: 'public/bannerimage/home-banner-four.jpg',
    title: 'Elevate your print business <br /> with our support.',
    description:
      'Experience better workflows, reduced costs, and happier clients.',
  },
];

const CustomPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <Box className="custom-arrow left" onClick={onClick}>
      <ChevronLeftIcon fontSize="large" />
    </Box>
  );
};

const CustomNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <Box className="custom-arrow right" onClick={onClick}>
      <ChevronRightIcon fontSize="large" />
    </Box>
  );
};

const sliderSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 5000,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
};

const HomeBanner: React.FC = () => {
  return (
    <Slider {...sliderSettings}>
      {banners.map((banner) => (
        <Box
          key={banner.id}
          sx={{
            backgroundImage: `url(${banner.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: { xs: '400px', md: '600px' },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Container className="text-white">
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 'medium',
                marginBottom: 4,
                fontSize: { xs: '1.75rem', md: '3rem', lg: '4rem' },
              }}
              dangerouslySetInnerHTML={{ __html: banner.title }}
            />
            <Typography
              variant="body1"
              sx={{
                color: 'primary.main',
                marginBottom: 4,
                maxWidth: '600px',
              }}
            >
              {banner.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                borderRadius: 2,
                paddingX: 4,
                paddingY: 1.5,
                fontWeight: 'medium',
                textTransform: 'none',
              }}
              href="/shop"
            >
              Shop Now
            </Button>
          </Container>
        </Box>
      ))}
    </Slider>
  );
};

export default HomeBanner;
