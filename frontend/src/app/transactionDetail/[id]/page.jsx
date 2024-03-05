'use client';
import useSWR from 'swr';
import UnclassifiedTransactionCard from '../../components/UnclassifiedTransactionCard';
import { Group, Title } from '@mantine/core';
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function TransactionDetail({ params }) {
  const txn_id = params.id;
  const { data, isLoading } = useSWR(
    '/api/transactionDetail?id=' + txn_id,
    fetcher
  );

  if (data) {
    console.log('data:', data);
  }

  return (
    <>
      {data && (
        <Group justify='center'>
          <Title mb={'5'}>Transaction Detail</Title>
          <UnclassifiedTransactionCard txn={data} />
        </Group>
      )}
    </>
  );
}
