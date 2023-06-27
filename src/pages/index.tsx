import { type NextPage } from "next";
import { AppShell } from '@mantine/core';
import { PropsWithChildren, useState } from "react";
import Navbar from './components/layout/_navbar';

const Home: NextPage = ({ children }: PropsWithChildren) => {


  return (
    <>
      {children}
    </>
  );
};

export default Home;
