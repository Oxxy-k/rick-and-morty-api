import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../shared/IconButton";
import { renderNavBarItems } from "../../constants/renderNavBarItems";
import Text from "../shared/Text";
import Logo from "../Logo";

const NavBar = ({ onOpen }) => {
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Logo />
        <Flex justifyContent="space-between" alignItems="center">
          {renderNavBarItems.map(({ title, key }) => (
            <Link to={`/${title}`} key={key}>
              <Text messageId={`header.${title}`} px="15px" />
            </Link>
          ))}
          <IconButton
            icon={<FontAwesomeIcon icon={faSearch} color="gray" />}
            size="sm"
            onClick={onOpen}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default withRouter(NavBar);
