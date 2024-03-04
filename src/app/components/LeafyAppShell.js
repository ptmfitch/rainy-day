'use client';

import { AppShell, Avatar, Burger, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { usePathname } from "next/navigation";

import classes from './LeafyAppShell.module.css';
import SearchInput from './SearchInput';

const pages = [
  {name: "🏠 Home", href: "/"},
  {name: "📊 Categories", href: "/categories"},
  {name: "💱 Transactions", href: "/transactions"},
  {name: "🌧️ Weather", href: "/weather"},
  {name: "📷 Pictures", href: "/pictures"}
]

export default function LeafyAppShell({children}) {
  const pathname = usePathname();
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60}}
      navbar={{
        width: "100%",
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header
        withBorder={false}
        bg="gray.0"
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
        {pages.map((page, index) => (
          <NavLink
            key={index}
            href={page.href}
            label={page.name}
            active={pathname === page.href}
            variant="filled"
            c={pathname === page.href ? 'green.7' : 'gray.6'}
            bg={pathname === page.href ? 'green.1' : 'gray.0'}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}