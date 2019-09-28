import React from "react";
import { w, h, width, height, margin } from "./utils/chart_utils";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter
} from "d3-force";

function ForceChart(props) {
  const { nodes, links } = props;

  const simulation = forceSimulation()
    .force(
      "charge",
      forceManyBody()
        .strength(-15)
        .distanceMax(300)
    )
    .force("center", forceCenter(w / 2, h / 6))
    .stop();

  simulation.nodes(nodes).force(
    "link",
    forceLink(links).id(function(d) {
      return d.id;
    })
  );
  for (var i = 0; i < 300; ++i) {
    simulation.tick();
  }

  let link = links.map((d, i) => (
    <line
      key={i + "links"}
      x1={d.source.x}
      y1={d.source.y}
      x2={d.target.x}
      y2={d.target.y}
      style={{ fill: "none", stroke: "#000", strokeWidth: 2, opacity: 0.2 }}
    />
  ));

  let node = nodes.map((d, i) => (
    <g
      key={i}
      className="node"
      style={{ stroke: "#666", fill: "red" }}
      transform={`translate(${d.x}, ${d.y})`}
    >
      <circle r={Math.sqrt(d.data.size) / 10 || 4.5} />
    </g>
  ));

  return (
    <div className="chart">
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {link}
          {node}
        </g>
      </svg>
    </div>
  );
}

export default ForceChart;
