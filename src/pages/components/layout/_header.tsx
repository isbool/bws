import {
  ActionIcon,
  Burger,
  Group,
  Header as HeaderMantine,
  MediaQuery,
  useMantineColorScheme,
} from "@mantine/core";
import { Sun, MoonStars } from "tabler-icons-react";
import { Logo } from "./_logo";

const Header = ({ opened, setOpened }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <HeaderMantine height={{ base: 50, md: 70 }} p="md">
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={colorScheme}
            mr="xl"
          />
        </MediaQuery>
        <Group sx={{ height: "100%" }} px={20} position="apart">
          <Logo colorScheme={colorScheme} />
          <ActionIcon
            variant="default"
            onClick={() => toggleColorScheme()}
            size={30}
          >
            {colorScheme === "dark" ? (
              <Sun size={16} />
            ) : (
              <MoonStars size={16} />
            )}
          </ActionIcon>
        </Group>
      </div>
    </HeaderMantine>
  );
};

export default Header;
