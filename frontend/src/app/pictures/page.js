'use client';

import { FileInput, Stack } from "@mantine/core"
import { useState } from "react"

export default function Pictures() {
  const [image, setImage] = useState(null);

  return (<Stack p="xl">
    <FileInput 
      value={image} onChange={setImage}
      w="100%"
      accept="image/*"
      label="Upload an image"
      placeholder="No image selected"
    />
  </Stack>)
}