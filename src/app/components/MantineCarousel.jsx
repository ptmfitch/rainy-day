'use client';

import { Carousel, Embla } from '@mantine/carousel';
import { Container, rem, Paper, Space, Text, Title, Stack, Group, ActionIcon } from '@mantine/core';
import LeafyButton from './LeafyButton';
import LeafyBadge from './LeafyBadge';
import classes from './MantineCarousel.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Card({ embla, image, title, category }) {
  const handleNext = () => embla?.scrollNext();
  const handlePrev = () => embla?.scrollPrev();
  return (
    <Paper
      justify="space-between"
      p="xl"
      radius="md"
      h="400"
      style={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <Stack 
        h="100%"
        align='flex-start' 
        justify="space-between"
      >
        <Stack>
          <LeafyBadge text={category}/>
          <Title order={3} mt="sm" c="white">
            {title}
          </Title>
        </Stack>
        <Group w="100%" justify="space-between">
          <ActionIcon onClick={handlePrev} color="green.7">
            <FontAwesomeIcon icon={faArrowLeft} />
          </ActionIcon>
          <LeafyButton variant="primary">Read more</LeafyButton>
          <ActionIcon onClick={handleNext} color="green.7">
            <FontAwesomeIcon icon={faArrowRight} />
          </ActionIcon>
        </Group>
      </Stack>
      
    </Paper>
  );
}

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