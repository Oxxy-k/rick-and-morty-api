import React from "react";
import { Image, Box } from "@chakra-ui/react";
import { Link, withRouter } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <Box cursor="pointer">
        <Image
          pb="10px"
          src="https://occ-0-1068-1723.1.nflxso.net/dnm/api/v6/TsSRXvDuraoJ7apdkH6tsHhf-ZQ/AAAABbtnw6C35mhluezr-K_FiP65TW93xpH0M3S6lKPv50_7eshzc1vosWxE3CxcnJ5-eVYmpcaQyra9yFLzQtsNx4odwYO-GtDDmDU0.png?r=47e"
          height="50px"
        />
      </Box>
    </Link>
  );
};

export default withRouter(Logo);
