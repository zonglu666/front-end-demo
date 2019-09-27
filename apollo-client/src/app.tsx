import React from "react";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";

const App: React.FC = () => {
  const { loading, error, data } = useQuery(gql`
    {
      hello
    }
  `);
  console.log(loading, error, data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  return <h1>{data.hello}</h1>;
};

export default App;
