import React from "react";
import { Image, Flex } from "@chakra-ui/react";

import "./Spinner.css";

const Spinner = () => {
  return (
    <Flex alignItems="center" justifyContent="center" h="90vh">
      <Image
        className="spinner"
        src="https://mystickermania.com/cdn/stickers/rick-and-morty/sticker_2060-512x512.png"
      />
    </Flex>
  );
};

export default Spinner;
