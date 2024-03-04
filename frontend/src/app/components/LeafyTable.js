'use client';

import { Table } from '@mantine/core';

export default function LeafyTable({columns, rows}) {
  const headings = columns.map((column) => (
    <Table.Th key={column.name}>{column.title}</Table.Th>
  ));

  const data = rows.map((row) => (
    <Table.Tr key={row.name}>
      {columns.map((column) => (
        <Table.Td key={column.name}>{row[column.name]}</Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <Table
      withRowBorders={false}
    >
      <Table.Thead>
        <Table.Tr>
          {headings}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{data}</Table.Tbody>
    </Table>
  );
}