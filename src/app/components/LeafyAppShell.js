'use client';

import { AppShell, Avatar, Burger, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { usePathname } from "next/navigation";

import classes from './LeafyAppShell.module.css';
import SearchInput from './SearchInput';

export default function LeafyAppShell({children}) {
  const pathname = usePathname();
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 100 }}
      navbar={{
        width: "100%",
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header
        withBorder={false}
      >
        <Group p="sm" justify="space-between">
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
          />
          <SearchInput />
          <Avatar alt="avatar"/>
        </Group>
      </AppShell.Header>
      

      <AppShell.Navbar
        withBorder={false}
        bg="gray.0"
      >
        <h1 className={classes.h1}>NAVIGATION</h1>
        <NavLink
          href="/"
          label="Home"
          active={pathname === '/'}
          variant="filled"
          c={pathname === '/' ? 'green.7' : 'gray.6'}
          bg={pathname === '/' ? 'green.1' : 'gray.0'}
        />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}