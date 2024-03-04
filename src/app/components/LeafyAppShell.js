'use client';

import { AppShell, NavLink } from "@mantine/core";
import classes from './LeafyAppShell.module.css'
import { usePathname } from "next/navigation";

export default function LeafyAppShell({ children }) {
  const pathname = usePathname();

  return (
    <AppShell
      navbar={{
        width: 200
      }}
    >
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
        <NavLink 
          href="/example"
          label="Example"
          active={pathname === '/example'}
          variant="filled"
          c={pathname === '/example' ? 'green.7' : 'gray.6'}
          bg={pathname === '/example' ? 'green.1' : 'gray.0'}
        />
      </AppShell.Navbar>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}