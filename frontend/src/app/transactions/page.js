'use client';

import useSWR from "swr"
import { Center, Loader, SegmentedControl, Stack } from "@mantine/core";
import TransactionAccordion from "../components/TransactionAccordion";
import { useState } from "react";

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

export default function Transactions() {
  const { data: transactions, isLoading: transactionsLoading } = useSWR('/api/totalPerCategory', fetcher)
  const [activeAccount, setActiveAccount] = useState('monzo')
  return (<>
    <SegmentedControl 
      fullWidth={true}
      color="green.7"
      value={activeAccount}
      onChange={setActiveAccount}
      data={[
        { value: 'monzo', label: 'Monzo' },
        { value: 'lloyds', label: 'Lloyds' },
        { value: 'add', label: '+'}
      ]}
    />  
    {transactionsLoading && <Center mt="md"><Loader /></Center>}
    {transactions && <Stack p="md">{transactions.filter(a => a._id != null).sort((a, b) => a.total - b.total).reverse().map((transaction) => {
      return (<div key={transaction._id}>{cleanCategoryName(transaction._id)} - £{transaction.total}</div>)
    })}</Stack>}
    <TransactionAccordion />
  </>)
}