'use client';

import { FileInput, Group, Stack, Text, Loader, Title } from "@mantine/core"
import { useState } from "react"
import LeafyButton from "../components/LeafyButton";
import LeafyBadge from "../components/LeafyBadge";
import Image from "next/image";

async function uploadFile(file, setInsights) {
  const data = new FormData()
  data.set('file', file)
  const res = await fetch('../api/describeSavingsFromImage', {
    method: 'POST',
    body: data
  }).then(res => res.json())
  setInsights(res[0])
  // if (!res.ok) throw new Error(await res.text())
}

export default function Pictures() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [insights, setInsights] = useState(null);
  const [clicked, setClicked] = useState(false);
  return (<Stack p="xl">
    <FileInput 
      value={file} onChange={setFile}
      w="100%"
      accept="image/*"
      label="Upload an image"
      placeholder="No image selected"
    />        
    <LeafyButton variant="primary" width="100%" onClick={() => {
      uploadFile(file, setInsights)
      setClicked(true)
      setFiles([...files, file])
    }}>{(clicked && insights === null) ? <Loader c="white" size="sm"/> : "Upload"}</LeafyButton>
    {insights !== null && <Stack> 
      <Group align="flex-start" justify='space-between'>
        <Title>
          {insights.title}
        </Title> 
        <LeafyBadge color="green" text={insights.category}/>
      </Group>
      <Text>
        {insights.detail}
      </Text>
    </Stack>}
  </Stack>)
}