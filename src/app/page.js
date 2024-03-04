import { Group, Stack, Text, Title } from "@mantine/core";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MantineCarousel from "./components/MantineCarousel";
import LeafyButton from "./components/LeafyButton";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Stack align="flex-start" pt="sm" pb="sm" pl="xl" pr="xl" gap="1rem">
        <Title>Hello, James! 👋</Title>
        <Text size="xl">💸 Today&apos;s spend: <FontAwesomeIcon icon={faArrowUp}/>5%</Text>

        <MantineCarousel /> 

        <Text size="xl">🏦 Connected accounts</Text> 
        <Group>
          <LeafyButton><Image alt="Monzo" height="40" width="40" src="monzo-icon.svg"/></LeafyButton>
        </Group>
      </Stack>
    </main>
  );
}
