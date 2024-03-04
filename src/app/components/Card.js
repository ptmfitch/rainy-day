import { Paper, Stack, Title, Group, ActionIcon, Loader, Center } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LeafyButton from "./LeafyButton";
import LeafyBadge from "./LeafyBadge";
import useSWR from 'swr';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import classes from './MantineCarousel.module.css';

const fetcher = (...args) => fetch(...args).then(res => res.json())

export function Card({ embla, title, category, image }) {
  const handleNext = () => embla?.scrollNext();
  const handlePrev = () => embla?.scrollPrev();
  // const { data, isLoading } = useSWR('/api/categoryImageLookup?query=' + category, fetcher)
  // if (isLoading) return <Center><Loader /></Center>
  const imageUrl = image ? image : data.urls.regular
  return (
    <Paper
      justify="space-between"
      p="xl"
      radius="md"
      h="400"
      style={{ backgroundImage: `url(${imageUrl})` }}
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