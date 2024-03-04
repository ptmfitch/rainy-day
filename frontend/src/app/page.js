'use client';

import { Button, Group, Stack, Text, Title, Modal, FileInput } from "@mantine/core";
import { faArrowUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MantineCarousel from "./components/MantineCarousel";
import { useDisclosure } from '@mantine/hooks';
import Image from "next/image";
import LeafyButton from "./components/LeafyButton";
import { useState } from "react";

async function uploadFile(file) {
  const data = new FormData()
  data.set('file', file)
  const res = await fetch('/api/uploadpdf', {
    method: 'POST',
    body: data
  })
  if (!res.ok) throw new Error(await res.text())
}

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

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
          {files.map((file, i) => (<Text key={i}>Added</Text>))}
          {files.length === 0 && <Button radius="xl" color="green.4" onClick={open}><FontAwesomeIcon color="black" icon={faPlus}/></Button>}
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
