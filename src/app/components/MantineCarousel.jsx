'use client';

import { Carousel } from '@mantine/carousel';
import { Container} from '@mantine/core';
import { useState } from 'react';
import { Card } from './Card';

const data = [
  {
    image: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?w=900&auto=format&fit=crop&w=400&q=80',
    title: 'Replace your morning coffee with yoga',
    category: 'coffee',
  },
  {
    image: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=900&auto=format&fit=crop&w=400&q=80',
    title: 'Have you watched Netflix recently?',
    category: 'subscriptions',
  },
  {
    image: 'https://images.unsplash.com/photo-1615829386703-e2bb66a7cb7d?w=900&auto=format&fit=crop&w=400&q=80',
    title: 'Explore government funded electric car schemes',
    category: 'petrol',
  }
];

export default function MantineCarousel() {
  const [embla, setEmbla] = useState(null);

  return (
    <Container pos="relative" p={0} w="100%">
      <Carousel
        w="100%"
        getEmblaApi={setEmbla}
        slideSize={'100%'}
        align="start"
        slidesToScroll={1}
        withControls={false}
      >
        {data.map((item, index) => (
          <Carousel.Slide key={index}>
            <Card embla={embla} {...item} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
}