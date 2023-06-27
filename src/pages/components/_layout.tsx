import { AppShell } from '@mantine/core';
import { PropsWithChildren, useState } from "react";
import Navbar from './layout/_navbar';
// import {NavbarMinimal as Navbar} from './layout/_navbar2';
import Footer from './layout/_footer';
import Header from './layout/_header';

const Layout = ({ children }: PropsWithChildren) => {
  const [opened, setOpened] = useState(false);
 
  return (
    <AppShell
    padding="md"
    fixed={false} 
    navbarOffsetBreakpoint="sm"
    asideOffsetBreakpoint="sm"
    navbar={
        <Navbar  /> //opened={opened}
    }
    // aside={
    //   <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
    //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
    //       <Text>Application sidebar</Text>
    //     </Aside>
    //   </MediaQuery>
    // }
    // footer={
    //     <Footer />
    // }
    // header={
    //     <Header opened={opened} setOpened={setOpened} />
    // }
    styles={(theme) => ({
      main: {
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
      },
    })}
    >
          {children}
      </AppShell>
  );
};

export default Layout;
