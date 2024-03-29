import { Paper, Stack, Title, Group, ActionIcon, Loader, Text, Modal, Divider } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LeafyButton from "./LeafyButton";
import LeafyBadge from "./LeafyBadge";
import useSWR from 'swr';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useDisclosure } from "@mantine/hooks";

import classes from './MantineCarousel.module.css';

const fetcher = (...args) => fetch(...args).then(res => res.json())

export function Card({ embla, title, category, insight, detail}) {
  const [opened, { open, close }] = useDisclosure(false);
  const handleNext = () => embla?.scrollNext();
  const handlePrev = () => embla?.scrollPrev();
  const { data, isLoading } = useSWR('/api/categoryImageLookup?query=' + category, fetcher, {revalidateOnFocus: false})
  if (isLoading) return <LoadingCard />
  const imageUrl = data.urls.regular
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
        <Stack w="100%" align="flex-start" justify="space-between">
          
          <Paper w="100%" justify="center" align="center" p="sm" bg="green.1" radius="lg">
            <Title 
              radius="md"
              order={3} 
              c="black"
            >
              {title}
            </Title>
          </Paper>
          <LeafyBadge text={category}/>
          
        </Stack>
        <Group w="100%" justify="space-between">
          <ActionIcon onClick={handlePrev} color="green.7">
            <FontAwesomeIcon icon={faArrowLeft} />
          </ActionIcon>
          <LeafyButton variant="primary" onClick={open}>Read more</LeafyButton>
          <ActionIcon onClick={handleNext} color="green.7">
            <FontAwesomeIcon icon={faArrowRight} />
          </ActionIcon>
        </Group>
      </Stack>

      <Modal opened={opened} onClose={close} title={title} centered>
        <Stack>
          <Text>{insight}</Text>
          <Text>{detail}</Text>
        </Stack>
      </Modal>
      
    </Paper>
  );
}

export function LoadingCard() {
  return (
    <Paper 
      bg="gray.2"
      p="xl" 
      radius="md" 
      h="400"
      w="100%"
      className={classes.card}
    >
      <Stack 
        h="100%"
        w="100%"
        justify="center" 
        align="center"
      >
        <Loader/>
      </Stack>
      
    </Paper>
  );
}