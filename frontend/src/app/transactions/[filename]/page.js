'use client';

import useSWR from "swr"
import { Center, Loader, Paper, Stack, Group, Text } from "@mantine/core";
import { useState } from "react";
import LeafyButton from "@/app/components/LeafyButton";
import IconText from "@/app/components/IconText";
import { faAudioDescription, faBalanceScale, faBook, faBrain, faCalendar, faComputer, faPoundSign, faRobot, faSignOut, faSort } from "@fortawesome/free-solid-svg-icons";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const test_data = [
  {
      "date": "01/05/2024",
      "paymentType": "Faster Payment",
      "detail": "Spotify Subscription",
      "paidOut": 9.99,
      "balance": 9990.01,
      "category": "Subscriptions"
  },
  {
      "date": "01/10/2024",
      "paymentType": "Faster Payment",
      "detail": "Shell Petrol Station",
      "paidOut": 45.75,
      "balance": 9944.26,
      "category": "General"
  },
]

export default function Transactions({params}) {
  const pdfFilename = "/" + params.filename.split('%20').join('/')
  console.log('pdfFilename:', pdfFilename)
  const { data: transactions, isLoading: transactionsLoading } = useSWR(`/api/importpdf?query=${pdfFilename}`, fetcher)
  const [clicked, setClicked] = useState(false)

  return (<>
    {transactionsLoading && <Center mt="md">
      <LeafyButton onClick={() => setClicked(true)}>
        {clicked ? <Loader size="sm" color="white"/> : "Analyse PDF"}
      </LeafyButton>
    </Center>}
    {Array.isArray(transactions) && transactions.map((transaction, index) => {
      return (
        <Paper
          key={index}
          bg="gray.1"
          w="100%"
          mb="xs"
          radius="md"
        >
          <Stack justify='space-around' p="sm">
            <Group w="100%" justify='space-between'>
              <Text c="green.7" fw="800" lineClamp={1}>{`Transaction ${index + 1}`}</Text>
              <IconText icon={faRobot} text={transaction.category}/>
            </Group>

            <Group><IconText icon={faBook} text={transaction.detail} /></Group>
            
            <Group w="100%" justify='space-between'>
              
              <IconText icon={faCalendar} text={transaction.date} />
              <IconText icon={faPoundSign} text={transaction.paidOut} />
            </Group>
          </Stack>
        </Paper>
      )
    })}
  </>)
}