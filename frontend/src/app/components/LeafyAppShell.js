'use client';
import { useEffect, useState } from 'react';
import { AppShell, Avatar, Burger, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Popover, Text, Button } from '@mantine/core';
import { usePathname } from 'next/navigation';
import useSWR from 'swr';

import classes from './LeafyAppShell.module.css';
import SearchInput from './SearchInput';

const pages = [
  { name: '🏠 Home', href: '/' },
  { name: '📊 Categories', href: '/categories' },
  { name: '💱 Transactions', href: '/transactions' },
  { name: '🌧️ Weather', href: '/weather' },
  { name: '📷 Pictures', href: '/pictures' },
];

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function LeafyAppShell({ children }) {
  const pathname = usePathname();
  const [opened, { toggle }] = useDisclosure();
  const [search, setSearch] = useState('');

  const handleSearch = (value) => {
    console.log(value);
    setSearch(value);
    setPopover(false);
  };

  const { data: searchData, isLoading } = useSWR(
    '/api/search?query=' + search,
    fetcher
  );

  const [popover, setPopover] = useState(false);

  useEffect(() => {
    if (searchData) {
      console.log('searchData:', searchData);
      if (searchData.length > 1) {
        setPopover(true);
      } else {
        setPopover(false);
      }
    }
  }, [searchData]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: '100%',
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header withBorder={false} bg='gray.0'>
        <Group p='sm' justify='space-between'>
          <Burger opened={opened} onClick={toggle} size='sm' />

          <Popover shadow='md' opened={popover} onChange={setPopover} withArrow>
            <Popover.Target>
              <SearchInput value={search} onChange={handleSearch} />
            </Popover.Target>

            <Popover.Dropdown style={{ marginTop: 60, marginLeft: 60 }}>
              {searchData &&
                searchData.map((item, index) => (
                  <NavLink
                    key={index}
                    href={`/transactionDetail/${item._id}`}
                    label={item.description}
                    variant='filled'
                  />
                ))}
            </Popover.Dropdown>
          </Popover>

          <Avatar src='avatar.jpg' alt='avatar' />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar withBorder={false} bg='gray.0'>
        <h1 className={classes.h1}>NAVIGATION</h1>
        {pages.map((page, index) => (
          <NavLink
            key={index}
            href={page.href}
            label={page.name}
            active={pathname === page.href}
            variant='filled'
            c={pathname === page.href ? 'green.7' : 'gray.6'}
            bg={pathname === page.href ? 'green.1' : 'gray.0'}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
