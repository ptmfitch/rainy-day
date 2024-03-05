'use client';

import useSWR from "swr"
import { Center, Loader } from "@mantine/core";
import { useState } from "react";
import LeafyButton from "@/app/components/LeafyButton";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function replaceUnderscoresWithSpaces(s) {
  return s.replace(/_/g, ' ')
}

function capitaliseFirstLetter(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function cleanCategoryName(s) {
  if (s) {
    return capitaliseFirstLetter(replaceUnderscoresWithSpaces(s))
  } else {
    return "Uncategorised"
  }
}

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
        {clicked ? <Loader /> : "Analyse PDF"}
      </LeafyButton>
    </Center>}
  </>)
}