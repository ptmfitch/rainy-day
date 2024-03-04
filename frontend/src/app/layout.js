import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import LeafyAppShell from './components/LeafyAppShell';
import { theme } from './theme';
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;

export const metadata = {
  title: "Leafy Mantine",
  description: "Example repo for Mantine + Leafy Green UI",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <LeafyAppShell>
            {children}
          </LeafyAppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
