'use client';

import {
  Center,
  FileInput,
  Group,
  Stack,
  Text,
  Loader,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import LeafyButton from '../components/LeafyButton';
import LeafyBadge from '../components/LeafyBadge';
import Image from 'next/image';

async function uploadFile(file, setInsights, setImageUrl) {
  const data = new FormData();
  data.set('file', file);
  const res = await fetch('../api/describeSavingsFromImage', {
    method: 'POST',
    body: data,
  }).then((res) => res.json());

  console.log(res);
  setInsights(res[0]);
  setImageUrl(res[res.length - 1].url);
  // if (!res.ok) throw new Error(await res.text())
}

export default function Pictures() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [insights, setInsights] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [clicked, setClicked] = useState(false);
  return (
    <Stack p='xl'>
      {insights === null && <><Stack>
        <Title>🧠 sAIv with rAIny</Title>
        <Text>
          Upload a photo of your current surroundings for personalised savings
          insights! 📷
        </Text>
      </Stack>
      <FileInput
        value={file}
        onChange={setFile}
        w='100%'
        accept='image/*'
        label='Upload an image'
        placeholder='No image selected'
      />
      <LeafyButton
        variant='primary'
        width='100%'
        onClick={() => {
          uploadFile(file, setInsights, setImageUrl);
          setClicked(true);
          setFiles([...files, file]);
        }}
      >
        Upload
      </LeafyButton>
      {insights === null && clicked && (
        <Center p='xl'>
          <Loader c='white' size='sm' />
        </Center>
      )}</>}
      {insights !== null && (
        <Stack>
          <Stack gap={10}>
            <Title>{insights.title}</Title>
            <LeafyBadge color='green' text={insights.category} />
          </Stack>
          <Text>{insights.detail}</Text>
          {imageUrl && (
            <Center>
              <Image
                radius='xl'
                alt='insights'
                width={300}
                height={300}
                src={imageUrl}
              />
            </Center>
            
          )}
        </Stack>
      )}
    </Stack>
  );
}
