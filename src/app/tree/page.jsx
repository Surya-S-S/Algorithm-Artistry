"use client";
import NavBar from "@/components/navbar/NavBar";
import { TreeNode } from "@/utils/TreeNode";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Tree } from "react-d3-tree";
import "./custom-tree.css";
import styles from "./page.module.css";

const TreePage = () => {
  const [treeData, setTreeData] = useState({});
  const [tree, setTree] = useState(null);
  const maxSize = 32;
  const [size, setSize] = useState(16);
  const maxSpeed = 1000;
  const [speed, setSpeed] = useState(maxSpeed - 250);
  const [algo, setAlgo] = useState("Algorithms");

  const randomizeList = (len) => {
    const elements = Array.from(Array(len).keys()).splice(1);
    for (let i = elements.length; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i - 1));
      const tmp = elements[i - 1];
      elements[i - 1] = elements[randomIndex];
      elements[randomIndex] = tmp;
    }
    const arr = [];
    elements.forEach((element) => {
      arr.push({
        name: element,
        style: "greyNode",
      });
    });

    const tree = new TreeNode();
    tree.generateTree(arr);
    setTree(tree);
    setTreeData(tree.treeData);
  };

  const selectAlgo = (algorithm) => {
    setAlgo(algorithm);
  };

  const animateTree = (value) => {
    let data = treeData;
    const nodeList = [treeData];
    while (true) {
      const current = nodeList.shift();
      if (current) {
        if (current.name === value) {
          current.attributes = {
            style: "blueNode",
          };
          data = { ...data, current };
          break;
        }
        if (current.children)
          current.children.forEach((child) => nodeList.push(child));
      } else break;
    }
    setTreeData(data);
  };

  const perform = () => {
    let list = [];
    if (algo == "Inorder") {
      tree.inorder(treeData);
      list = tree.inorderList;
    } else if (algo == "Preorder") {
      tree.preorder(treeData);
      list = tree.preorderList;
    } else if ("Postorder") {
      tree.postorder(treeData);
      list = tree.postorderList;
    }
    let n = list.length;
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        animateTree(list[i]);
      }, speed * i);
    }
  };

  const heading = "Tree Visualizer";
  const treeAlgos = ["Inorder", "Preorder", "Postorder"];

  const options = [
    {
      id: "algorithms",
      label: algo,
      type: "dropDown",
      options: treeAlgos,
    },
    { id: "randomize", label: "Randomize", type: "button", randomizeList },
    { id: "size", label: "Size", type: "dropDown", options: [size / maxSize] },
    {
      id: "speed",
      label: "Speed",
      type: "dropDown",
      options: [speed / maxSpeed],
    },
    { id: "perform", label: "Perform", type: "button", perform },
  ];

  const handleClick = (item) => {
    switch (item?.id) {
      case "randomize": {
        randomizeList(size);
        break;
      }
      case "perform": {
        perform();
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
      case "size": {
        const percent = parseFloat(item);
        if (percent >= 0 && percent <= 25) setSize(4);
        else if (percent > 25 && percent <= 50) setSize(8);
        else if (percent > 50 && percent <= 75) setSize(16);
        else setSize(32);
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
    randomizeList(size);
  }, [size]);

  const renderCustomNode = ({ nodeDatum, toggleNode }) => {
    return (
      <g>
        <circle
          className={clsx(styles.node, styles[nodeDatum?.attributes?.style])}
          r={20}
          onClick={toggleNode}
        />
        <text className={styles.text} x={-6} y={5}>
          {`${nodeDatum?.name}`}
        </text>
      </g>
    );
  };

  return (
    <div>
      <NavBar heading={heading} options={options} actions={actions} />
      <div className={styles.board}>
        <Tree
          data={treeData}
          translate={{ x: 560, y: 50 }}
          depthFactor={105}
          pathFunc={"diagonal"}
          orientation={"vertical"}
          rootNodeClassName="rootNode"
          branchNodeClassName="branchNode"
          leafNodeClassName="leafNode"
          pathClassFunc={() => "link"}
          renderCustomNodeElement={renderCustomNode}
          separation={{ siblings: 0.5, nonSiblings: 0.35 }}
        />
      </div>
    </div>
  );
};

export default TreePage;
