import { Stack, Title } from "@mantine/core";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MantineCarousel from "./components/MantineCarousel";

export default function Home() {
  return (
    <main>
      <Stack align="flex-start" pt="sm" pl="xl" pr="xl" gap="1rem">
        <Title>Hello, James!</Title>
        <Title order={2}>Today&apos;s spend: <FontAwesomeIcon icon={faArrowUp}/>5%</Title>
        <MantineCarousel />   
      </Stack>
    </main>
  );
}
