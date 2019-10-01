import React from "react";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";

const App: React.FC = () => {
  const GRAPHQL_SCHEMA = gql`
    query ProductsByBrand($cursor: String, $id: String) {
      productsByBrand(cursor: $cursor, id: $id) {
        list {
          skuId
        }
        cursor
      }
    }
  `;
  const { loading, error, data } = useQuery(GRAPHQL_SCHEMA, {
    variables: {
      $id: "5ad58abcbf5d31000f796f9c",
      $cursor: "5cde6aa879afbf0025a468ce"
    }
  });
  let result: any;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  if (data) {
    result = data.data["ProductsByBrand"];
    console.log("result", result);
  }

  const fetchMore = () => {
    console.log("fetchMore");
    console.log("result.cursor", result.cursor);
    fetchMore();
  };

  return (
    <div>
      <h1>Hello World!「From Client」</h1>
      <button onClick={fetchMore}>fetchMore</button>
    </div>
  );
};

export default App;
