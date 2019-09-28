import React, { useEffect, useState } from "react";
import json from "./data.json";
import ForceChart from "./ForceChart";
import { hierarchy } from "d3-hierarchy";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(json);
  }, []);

  if (data.lenth === 0) return <div>loading...</div>;

  const root = hierarchy(data);

  const nodes = flatten(root);
  const links = root.links();

  function flatten(root) {
    var nodes = [],
      i = 0;

    function recurse(node) {
      if (node.children) node.children.forEach(recurse);
      if (!node.id) node.id = ++i;
      else ++i;
      nodes.push(node);
    }
    recurse(root);
    return nodes;
  }

  return (
    <div className="App">
      <ForceChart nodes={nodes} links={links} />
    </div>
  );
}

export default App;
