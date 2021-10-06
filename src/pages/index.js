import React from "react";
import withPrivateRoute from "../hoc/withPrivateRoute";
import Layout from "../components/Layout";

const HomePage = () => {
  return <Layout>Home page</Layout>;
};

export default withPrivateRoute(HomePage);
