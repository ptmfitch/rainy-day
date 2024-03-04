'use client';

import { Button, Group, Stack, Text, Title, Modal, FileInput, useMantineTheme, Spoiler } from "@mantine/core";
import { faBank, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MantineCarousel from "./components/MantineCarousel";
import { useDisclosure } from '@mantine/hooks';
import Image from "next/image";
import LeafyButton from "./components/LeafyButton";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

async function uploadFile(file) {
  const data = new FormData()
  data.set('file', file)
  const res = await fetch('/api/uploadpdf', {
    method: 'POST',
    body: data
  })
  if (!res.ok) throw new Error(await res.text())
}

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const { data: spendData, isLoading } = useSWR('/api/spendComparison', fetcher)

  const theme = useMantineTheme()
  const router = useRouter();

  {!isLoading && console.log('spendData:', spendData)}

  return (
    <main>

      <Stack align="flex-start" pt="sm" pb="sm" pl="xl" pr="xl" gap="1rem">
        <Title>Hello, James! 👋</Title>

        {isLoading && <Text size="xl">rAInyday is thinking... 🧠</Text>}
        {Array.isArray(spendData) && <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
          <Text size="lg">{spendData[0].insight}</Text>
          <Text size="lg">{spendData[0].detail}</Text>
        </Spoiler>}

        <MantineCarousel /> 

        <Text size="xl">🏦 Connected accounts</Text> 
        <Group w="100%" justify="flex-start">
          <Button h="100" w="110" radius="xl" size="xl" color="green.1">
            <Stack align="center" gap="0">
              <Image alt="Monzo" height="30" width="30" src="monzo-icon.svg"/>
              <Text c="black" size="sm">Monzo</Text>
            </Stack>
          </Button>
          <Button h="100" w="110" radius="xl" size="xl" color="green.5" disabled>
            <Stack align="center" gap="0">
              <Image alt="Lloyds" height="30" width="30" src="lloyds-icon.svg"/>
              <Text c="black" size="sm">Lloyds</Text>
            </Stack>
          </Button>
          <Button h="100" w="110" radius="xl" color="gray.1" disabled>
            <Stack align="center" gap="3">
              <FontAwesomeIcon color={theme.colors.gray[6]} size="2x" icon={faBank}/>
              <Text c="black" size="sm">Add Bank</Text>
            </Stack>
          </Button>
        </Group>

        <Text size="xl">📄 AI statement insights</Text> 
        <Group w="100%" justify="flex-start">
          <Button h="100" w="120" radius="xl" size="xl" color="green.1">
            <Stack align="center" gap="0">
              <Image alt="Monzo" height="30" width="30" src="monzo-icon.svg"/>
              <Text c="black">Monzo</Text>
            </Stack>
          </Button>
          <Button h="100" w="120" radius="xl" color="green.4" onClick={open}>
            <Stack align="center" gap="3">
            <FontAwesomeIcon color={theme.colors.gray[6]} size="2x" icon={faPlus}/>
            <Text c="black">PDF</Text>
            </Stack>
          </Button>
        </Group>


      </Stack>

      <Modal opened={opened} onClose={close} title="Upload Statement" centered>
        <Stack align="center" gap="1rem" w="100%">
        <FileInput 
          value={file} onChange={setFile}
          w="100%"
          accept="application/pdf"
          label="Upload a PDF Bank Statement"
          placeholder="No file selected"
        />
        <LeafyButton variant="primary" width="100%" onClick={() => {
          uploadFile(file)
          setFiles([...files, file])
          close()
        }}>Upload</LeafyButton>
        </Stack>
      </Modal>

    </main>
  );
}
