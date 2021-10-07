import React from "react";
import { Text as ChakraText } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";

export function Text({ messageId, messageValues, ...props }) {
  const child = messageId ? (
    <FormattedMessage id={messageId} values={messageValues} />
  ) : (
    props.children
  );

  return <ChakraText {...props}>{child}</ChakraText>;
}

export function ErrorText(props) {
  return <Text {...props} color="error" />;
}

export default Text;
