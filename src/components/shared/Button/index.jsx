import React from "react";
import PropTypes from "prop-types";
import { Button as ChakraButton } from "@chakra-ui/react";
import Text from "../Text";

const Button = ({
  onClick,
  messageId,
  variant,
  isLoading,
  size,
  textColor,
  ...props
}) => (
  <ChakraButton
    onClick={onClick}
    variant={variant}
    isLoading={isLoading}
    size={size}
    _hover={{
      bgColor: "none",
      boxShadow: "0 0 10px rgb(0, 217, 255)",
      transition: "all 0.4s",
    }}
    _focus={{ outline: "none" }}
    {...props}
  >
    <Text messageId={messageId} color={textColor} fontSize="14px" />
  </ChakraButton>
);

Button.propTypes = {
  textColor: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["link", "outline", "solid", "ghost", "unstyled"]),
  isLoading: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "md", "lg", "xs"]),
};

Button.defaultProps = {
  textColor: "white",
  variant: "outline",
  isLoading: false,
  size: "sm",
};

export default Button;
