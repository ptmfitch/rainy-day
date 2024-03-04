'use client';

import { Paper, Stack, Text, Group, Loader } from "@mantine/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faPoundSign } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

import LeafyButton from "./LeafyButton";

export default function UnclassifiedTransactionCard({ txn }) {
  
  const [classification, setClassification] = useState(null);
  const [clicked, setClicked] = useState(false);

  async function handleClassify(id) {
    const res = await fetch('/api/categoriseTransaction?txn_id=' + id, {
      method: 'GET'
    }).then(res => res.json())
    setClassification(res['category'])
  }

  const date = txn.ts.split('T')[0];
  const time = txn.ts.split('T')[1].split('.')[0];
  const description = txn.description.replace(/\s+/g, ' ');
  const amount = txn.amount.toFixed(2);
  return (<Paper
    w="80%"
    shadow="sm"
    padding="sm"
  >
    <Stack justify='space-around' p="sm">
      <Text>{description}</Text>
      <Group w="100%" justify='space-between'>
        <Group>
          <FontAwesomeIcon icon={faCalendar} />
          <Text>{date}</Text>
        </Group>
        <Group>
          <FontAwesomeIcon icon={faClock} />
          <Text>{time}</Text>
        </Group>
        <Group>
          <FontAwesomeIcon icon={faPoundSign} />
          <Text>{amount}</Text>
        </Group>
      </Group>
      {(classification === null && !clicked) && <LeafyButton variant="primary" width="100%" onClick={() => {
        setClicked(true)
        handleClassify(txn._id)
      }}>Classify</LeafyButton>}
      {(classification === null && clicked) && <LeafyButton variant="primary" width="100%" disabled={true}>
        <Loader size="sm" color="white"/>
      </LeafyButton>}
      {classification !== null && <Text>{classification}</Text>}
    </Stack>
  </Paper>);
}