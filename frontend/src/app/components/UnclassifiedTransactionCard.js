'use client';

import { Paper, Stack, Text, Group, Loader, TextInput } from "@mantine/core";
import { faCalendar, faClock, faPoundSign } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

import LeafyButton from "./LeafyButton";
import IconText from "./IconText";

export default function UnclassifiedTransactionCard({ txn }) {
  
  const [classification, setClassification] = useState(null);
  const [clicked, setClicked] = useState(false);

  async function handleClassify(id) {
    const res = await fetch('/api/categoriseTransaction?txn_id=' + id, {
      method: 'GET'
    }).then(res => res.json())
    if (res['category'] === null) {
      setClassification('Unclassified')
    } else {
      res['category'] = res['category'].replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      setClassification(res['category'])
    }
  }

  const date = txn.ts.split('T')[0];
  const time = txn.ts.split('T')[1].split('.')[0];
  const description = txn.description.replace(/\s+/g, ' ');
  const amount = txn.amount.toFixed(2);

  return (<Paper
    bg="gray.1"
    w="100%"
    mb="xs"
    radius="md"
  >
    <Stack justify='space-around' p="sm">
      <Text c="green.7" fw="800" lineClamp={1}>{description}</Text>
      <Group w="100%" justify='space-between'>
        <IconText icon={faCalendar} text={date} />
        <IconText icon={faClock} text={time} />
        <IconText icon={faPoundSign} text={amount} />
      </Group>

      {(classification === null && !clicked) && <LeafyButton variant="primary" width="100%" onClick={() => {
        setClicked(true)
        handleClassify(txn._id)
      }}>Classify</LeafyButton>}

      {(classification === null && clicked) && <LeafyButton variant="primary" width="100%">
        <Loader size="sm" color="white"/>
      </LeafyButton>}

      {classification !== null && (<Group justify='space-between' align="flex-end">
        <TextInput label="Category" value={classification} onChange={(event) => setClassification(event.target.value)} />
        {/*TODO: on confirm, pop up with a modal that vector searches similar txns, offering to classify them*/}
        {<LeafyButton variant="primary" onClick={() => console.log("Confirmed: " + classification)}>
          Confirm
        </LeafyButton>}
      </Group>)}

    </Stack>
  </Paper>);
}