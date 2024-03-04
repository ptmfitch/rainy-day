import { Card, Group, Loader, ScrollArea, Stack, Text, Title } from "@mantine/core";
import Banner from "./components/Banner";
import LeafyButton from "./components/LeafyButton";
import IconButton from "./components/IconButton";
import { faCat, faCogs, faCoins, faDog, faUmbrella } from "@fortawesome/free-solid-svg-icons";
import LeafyTable from "./components/LeafyTable";
import { columns, rows } from "../utils/static";
import LeafyBadge from "./components/LeafyBadge";
import SearchInput from "./components/SearchInput";

export default function Home() {
  return (
    <main>
      <Stack align="flex-start" p="5rem" gap="2.5rem">
        <Title>Leafy Mantine</Title>

        <SearchInput />
        
        <Loader />

        <Group>
          <Text>LeafyButtons:</Text>
          <LeafyButton variant="default">Default</LeafyButton>
          <LeafyButton variant="primary">Primary</LeafyButton>
          <LeafyButton variant="danger">Danger</LeafyButton>
        </Group>

        <Group>
          <Text>IconButtons:</Text>
          <IconButton icon={faCogs} />
          <IconButton icon={faUmbrella} />
          <IconButton icon={faDog} />
          <IconButton icon={faCat} />
          <IconButton icon={faCoins} />
        </Group>

        <Group>
          <Text>Badges:</Text>
          <LeafyBadge color="green" text="green" />
          <LeafyBadge color="yellow" text="yellow" />
          <LeafyBadge color="red" text="red" />
          <LeafyBadge color="blue" text="blue" />
          <LeafyBadge text="default" />
        </Group>

        <ScrollArea w="80%" h="30rem">
          <Stack pl="sm" pt="sm" gap="xl">
            <Banner variant="note">Link component is simply dummy text of the printing and typesetting industry. Anchor tag has been the industry standard dummy children ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Banner>
            <Banner variant="tip">Link component is simply dummy text of the printing and typesetting industry. Anchor tag has been the industry standard dummy children ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Banner>
            <Banner variant="important">Link component is simply dummy text of the printing and typesetting industry. Anchor tag has been the industry standard dummy children ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Banner>
            <Banner variant="warning">Link component is simply dummy text of the printing and typesetting industry. Anchor tag has been the industry standard dummy children ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Banner>
            <Banner variant="example">Link component is simply dummy text of the printing and typesetting industry. Anchor tag has been the industry standard dummy children ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Banner>
          </Stack>
        </ScrollArea>

        <Group w="80%">
          <LeafyTable columns={columns} rows={rows}/>
        </Group>

        <Card w="80%">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy children ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Card>
      
      </Stack>
    </main>
  );
}
