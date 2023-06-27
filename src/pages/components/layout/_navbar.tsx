import { Navbar as NavbarMantine } from "@mantine/core";
import { Logo } from "./_logo";
import { MainLinks } from "./_mainLinks";
import { User } from "./_user";
 
const Navbar = ({ opened } : { opened: boolean }) => {
  return (
    <NavbarMantine
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
        <NavbarMantine.Section>
        <Logo />
      </NavbarMantine.Section>
      <NavbarMantine.Section grow mt="xs">
        <MainLinks />
      </NavbarMantine.Section>
      <NavbarMantine.Section>
        <User />
      </NavbarMantine.Section>
    </NavbarMantine>
  );
};

export default Navbar;
