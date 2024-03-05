'use client';

import { Accordion, Group, Loader } from "@mantine/core";
import UnclassifiedTransactionCard from "./UnclassifiedTransactionCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderTree } from "@fortawesome/free-solid-svg-icons";

import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function TransactionAccordion() {

  const { data: uncatTxns, isLoading: uncatTxnsLoading } = useSWR(
    '/api/getUncategorisedTransactions',
    fetcher
  )

  return(
    <Accordion>
      <Accordion.Item key={"unclassified"} value={"Unclassified Transactions"}>
        <Accordion.Control icon={<FontAwesomeIcon icon={faFolderTree}/>}>
          Unclassified Transactions
        </Accordion.Control>
        <Accordion.Panel>
          {uncatTxnsLoading && <Group justify='center'><Loader /></Group>}
          {Array.isArray(uncatTxns) && uncatTxns.map((txn, index) => <>
            <UnclassifiedTransactionCard key={index} txn={txn}/>
          </>)}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}