"use client";
import Grids from "@/components/grids/Grids";
import NavBar from "@/components/navbar/NavBar";
import { Grid } from "@/utils/Grid";
import { useEffect, useState } from "react";
import BreadthFirstSearch from "./algorithms/BreadthFirstSearch";
import DepthFirstSearch from "./algorithms/DepthFirstSearch";
import styles from "./page.module.css";

const PathFindingPage = () => {
  const [grid, setGrid] = useState([[]]);
  const maxRows = 13;
  const [rows, setRows] = useState(maxRows);
  const maxCols = 33;
  const [cols, setCols] = useState(maxCols);
  const maxSpeed = 500;
  const [speed, setSpeed] = useState(maxSpeed - 250);
  const [algo, setAlgo] = useState("Algorithms");
  const [matrix, setMatrix] = useState([[]]);

  const initialize = (rows, cols) => {
    const gridArray = new Grid(rows, cols);
    setGrid(gridArray);
    setMatrix(gridArray.matrix);
  };

  const selectAlgo = (algorithm) => {
    setAlgo(algorithm);
  };

  const findPath = () => {
    let result = [];
    if (algo == "Depth First Search") {
      DepthFirstSearch(grid.a, grid.b, rows, cols, grid, result);
    } else if (algo == "Breadth First Search") {
      BreadthFirstSearch(grid.a, grid.b, rows, cols, grid, result);
    }
    let n = result.length;
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        setMatrix(result[i]);
      }, speed * i);
    }
  };

  const heading = "Path-finding Visualizer";
  const searchingAlgos = ["Depth First Search", "Breadth First Search"];

  const options = [
    {
      id: "algorithms",
      label: algo,
      type: "dropDown",
      options: searchingAlgos,
    },
    { id: "initialize", label: "Initialize", type: "button", initialize },
    { id: "rows", label: "Rows", type: "dropDown", options: [rows / maxRows] },
    { id: "cols", label: "Cols", type: "dropDown", options: [cols / maxCols] },
    {
      id: "speed",
      label: "Speed",
      type: "dropDown",
      options: [speed / maxSpeed],
    },
    { id: "search", label: "Search", type: "button", findPath },
  ];

  const handleClick = (item) => {
    switch (item?.id) {
      case "initialize": {
        initialize(rows, cols);
        break;
      }
      case "search": {
        findPath();
        break;
      }
    }
  };

  const handleSelect = (option, item) => {
    switch (option?.id) {
      case "algorithms": {
        selectAlgo(item);
        break;
      }
      case "rows": {
        setRows(Math.max(1, Math.floor(maxRows * (parseFloat(item) / 100))));
        break;
      }
      case "cols": {
        setCols(Math.max(2, Math.floor(maxCols * (parseFloat(item) / 100))));
        break;
      }
      case "speed": {
        setSpeed(
          25 + maxSpeed - Math.floor(maxSpeed * (parseFloat(item) / 100))
        );
        break;
      }
    }
  };
  const actions = { handleClick, handleSelect };

  useEffect(() => {
    initialize(rows, cols);
  }, [rows, cols]);

  return (
    <div>
      <NavBar heading={heading} options={options} actions={actions} />
      <div className={styles.board}>
        <Grids matrix={matrix} />
      </div>
    </div>
  );
};

export default PathFindingPage;
