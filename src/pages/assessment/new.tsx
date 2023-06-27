import { type NextPage } from "next";
import { AppShell, Center, Title } from "@mantine/core";
import Guide from "../components/_guide";
import Navbar from "../components/layout/_navbar";

const New: NextPage = () => {
  return (
    <>
      <Center maw={400} h={100} mx="auto">
        <Title order={1}>Assessment</Title>
      </Center>
      <Guide />
    </>
  )
};

export default New;
