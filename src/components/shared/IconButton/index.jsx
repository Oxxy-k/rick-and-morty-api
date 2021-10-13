import React from "react";
import PropTypes from "prop-types";
import { Button } from "@chakra-ui/react";

const IconButton = ({ icon, onClick, size, variant, color, ...props }) => {
  return (
    <Button
      borderRadius="12px"
      p="0"
      minW="5px"
      minH="5px"
      h="30px"
      w="30px"
      backgroundColor="transparent"
      variant={variant}
      size={size}
      color={color}
      _focus={{ outline: "none" }}
      _hover={{ color: "white", cursor: "pointer" }}
      onClick={onClick}
      {...props}
    >
      {icon}
    </Button>
  );
};

IconButton.propTypes = {
  color: PropTypes.string,
  variant: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg", "xs"]),
};

IconButton.defaultsProps = {
  color: "gray",
  variant: "link",
  icon: <></>,
  onClick: () => ({}),
  size: PropTypes.oneOf(["sm", "md", "lg", "xs"]),
};

export default IconButton;
