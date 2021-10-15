import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../shared/IconButton";
import { Flex } from "@chakra-ui/react";
import Text from "../shared/Text";
import LocaleDropdown from "./LocaleDropdown";
import Logo from "../Logo";

const NavBar = ({ onOpen }) => {
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Logo />
        <Flex justifyContent="space-between" alignItems="center">
          <Link to="/episodes">
            <Text messageId="header.episodes" px="15px" />
          </Link>
          <Link to="/characters">
            <Text messageId="header.characters" px="15px" />
          </Link>
          <Link to="/locations">
            <Text messageId="header.locations" px="15px" />
          </Link>
          <IconButton
            icon={<FontAwesomeIcon icon={faSearch} color="gray" />}
            size="sm"
            onClick={onOpen}
          />
        </Flex>
      </Flex>
      <LocaleDropdown />
    </>
  );
};

export default withRouter(NavBar);
