import React from "react";
import { withRouter } from "next/router";

export default function PrivateRoute(PrivateRoute) {
  const hocComponent = (props) => {
    return <PrivateRoute {...props} />;
  };

  return withRouter(hocComponent);
}
