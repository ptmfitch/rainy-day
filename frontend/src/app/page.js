import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { faArrowUp, faPlus } from "@fortawesome/free-solid-svg-icons";
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
        <Group w="100%" justify="flex-start">
          <Button radius="xl" size="xl" color="gray.1">
            <Stack align="center" gap="0">
              <Image alt="Monzo" height="30" width="30" src="monzo-icon.svg"/>
              <Text c="black">Monzo</Text>
            </Stack>
          </Button>
          <Button radius="xl" size="xl" color="gray.1">
            <Stack align="center" gap="0">
              <Image alt="Lloyds" height="30" width="30" src="lloyds-icon.svg"/>
              <Text c="black">Lloyds</Text>
            </Stack>
          </Button>
          <Button radius="xl" color="green.4"><FontAwesomeIcon color="black" icon={faPlus}/></Button>
        </Group>
      </Stack>
    </main>
  );
}
