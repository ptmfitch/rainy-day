'use client';

import { Carousel } from '@mantine/carousel';
import { Container} from '@mantine/core';
import { useState } from 'react';
import { Card, LoadingCard } from './Card';
import useSWR from 'swr';
import React from 'react';

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function MantineCarousel() {
  const { data: storyData, isLoading } = useSWR('/api/stories', fetcher)

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
        {isLoading && <LoadingCard/>}
        {Array.isArray(storyData) && storyData.map((item, index) => (
          <Carousel.Slide key={index}>
            <Card embla={embla} {...item} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
}