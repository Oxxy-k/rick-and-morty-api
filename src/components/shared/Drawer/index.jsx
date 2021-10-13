import React from "react";
import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";
import Button from "../Button";
import Text from "../Text";

export default function Drawer({ isOpen, onClose, children, onSearch }) {
  return (
    <>
      <ChakraDrawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent backgroundColor="black">
          <DrawerHeader>
            <Text fontSize="30px" messageId="header.searchByParameters" />
          </DrawerHeader>

          <DrawerBody color="white">{children}</DrawerBody>

          <DrawerFooter>
            <Button size="md" onClick={onClose} messageId="button.cancel" />
            <Button
              onClick={onSearch}
              size="md"
              backgroundColor="rgb(0, 217, 255)"
              textColor="black"
              variant="ghost"
              messageId="button.search"
              ml="10px"
            />
          </DrawerFooter>
        </DrawerContent>
      </ChakraDrawer>
    </>
  );
}
