import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../shared/IconButton";
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
} from "@chakra-ui/react";
import Text from "../shared/Text";
import LocaleDropdown from "./LocaleDropdown";
import Logo from "../Logo";

const NavBar = ({ onOpen }) => {
  return (
    <>
        <Flex justifyContent="space-between" alignItems="center">
          <Menu autoSelect={false}>
            <MenuButton
              as={IconButton}
              icon={<FontAwesomeIcon icon={faBars} color="gray" />}
              variant="ghost"
            />
            <MenuList mt="40px" ml="20px">
              <MenuItem>
                <Link to="/episodes">
                  <Text messageId="header.episodes" px="15px" />
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/characters">
                  <Text messageId="header.characters" px="15px" />
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/locations">
                  <Text messageId="header.locations" px="15px" />
                </Link>
              </MenuItem>
            </MenuList>
          </Menu>
          <IconButton
            icon={<FontAwesomeIcon icon={faSearch} color="gray" />}
            size="sm"
            onClick={onOpen}
            ml="5px"
          />
        </Flex>
        <Logo />
        <LocaleDropdown />
      </>
  );
};

export default withRouter(NavBar);
