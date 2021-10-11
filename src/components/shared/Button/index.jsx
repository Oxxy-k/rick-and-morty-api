import React from "react";
import PropTypes from "prop-types";
import { Button as ChakraButton } from "@chakra-ui/react";
import Text from "../Text";

const Button = ({ onClick, messageId, variant, isLoading, size, ...props }) => (
  <ChakraButton
    {...props}
    onClick={onClick}
    variant={variant}
    isLoading={isLoading}
    size={size}
    _hover={{
      bgColor: "none",
      boxShadow: "0 0 10px rgb(0, 217, 255)",
    }}
    _focus={{ outline: "none" }}
  >
    <Text messageId={messageId} color="white" />
  </ChakraButton>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["link", "outline", "solid", "ghost", "unstyled"]),
  isLoading: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "md", "lg", "xs"]),
};

Button.defaultProps = {
  variant: "outline",
  isLoading: false,
  size: "sm",
};

export default Button;
