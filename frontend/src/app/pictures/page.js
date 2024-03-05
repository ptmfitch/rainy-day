'use client';

import { FileInput, Stack } from "@mantine/core"
import { useState } from "react"
import LeafyButton from "../components/LeafyButton";

async function uploadFile(file) {
  const data = new FormData()
  data.set('file', file)
  const res = await fetch('../api/describeSavingsFromImage', {
    method: 'POST',
    body: data
  })
  if (!res.ok) throw new Error(await res.text())
}

export default function Pictures() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  return (<Stack p="xl">
    <FileInput 
      value={file} onChange={setFile}
      w="100%"
      accept="image/*"
      label="Upload an image"
      placeholder="No image selected"
    />        
    <LeafyButton variant="primary" width="100%" onClick={() => {
      uploadFile(file)
      setFiles([...files, file])
      close()
    }}>Upload</LeafyButton>
  </Stack>)
}