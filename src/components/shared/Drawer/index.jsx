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

export default function Drawer({
  isOpen,
  onClose,
  children,
  onUpdateListData,
}) {
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
            <Button onClick={onClose} messageId="button.cancel" />
            <Button
              onClick={() => {
                onUpdateListData();
                onClose();
              }}
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
