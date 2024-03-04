'use client';

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextInput } from "@mantine/core";

export default function SearchInput({ placeholder = "Search", value, onChange }) {
  return (
    <TextInput
      leftSection={<FontAwesomeIcon icon={faSearch}/>}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      radius="md"
    />
  );
}