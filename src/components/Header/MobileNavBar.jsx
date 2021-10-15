import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton as ChakraIconButton,
} from "@chakra-ui/react";
import IconButton from "../shared/IconButton";
import { renderNavBarItems } from "../../constants/renderNavBarItems";
import Text from "../shared/Text";
import Logo from "../Logo";

const MobileNavBar = ({ onOpen }) => {
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Menu autoSelect={false}>
          <MenuButton
            as={ChakraIconButton}
            icon={<FontAwesomeIcon icon={faBars} color="gray" />}
            _focus={{ outline: "none" }}
            variant="ghost"
          />
          <MenuList>
            {renderNavBarItems.map(({ title, key }) => (
              <MenuItem key={key}>
                <Link to={`/${title}`}>
                  <Text messageId={`header.${title}`} px="15px" />
                </Link>
              </MenuItem>
            ))}
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
    </>
  );
};

export default withRouter(MobileNavBar);
