import React from "react";
import PropTypes from "prop-types";
import { Text as ChakraText } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";

export function Text({
  messageId,
  fontSize,
  lineHeight,
  messageValues,
  color,
  ...props
}) {
  const child = messageId ? (
    <FormattedMessage id={messageId} values={messageValues} />
  ) : (
    props.children
  );

  return (
    <ChakraText
      color={color}
      fontSize={fontSize}
      lineHeight={lineHeight}
      {...props}
    >
      {child}
    </ChakraText>
  );
}

Text.propTypes = {
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  lineHeight: PropTypes.string,
  color: PropTypes.string,
};

Text.defaultProps = {
  fontSize: ["14px", "18px"],
  lineHeight: "150%",
  color: "gray",
};

export default Text;
