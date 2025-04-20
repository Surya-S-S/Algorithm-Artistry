"use client";
import Boxes from "@/components/boxes/Boxes";
import NavBar from "@/components/navbar/NavBar";
import StackView from "@/components/stack/StackView";
import { List } from "@/utils/List";
import { Stack } from "@/utils/Stack";
import { useEffect, useState } from "react";
import NextGreaterElement from "./algorithms/NextGreaterElement";
import PreviousSmallerElement from "./algorithms/PreviousSmallerElement";
import styles from "./page.module.css";

const StackPage = () => {
  const [list, setList] = useState([]);
  const [stackView, setStackView] = useState([]);
  const [result, setResult] = useState([]);
  const maxSize = Math.floor(window.innerWidth / 95);
  const [size, setSize] = useState(maxSize);
  const maxSpeed = 750;
  const [speed, setSpeed] = useState(maxSpeed - 375);
  const [algo, setAlgo] = useState("Algorithms");
  const [arr, setArr] = useState([]);
  const [stack, setStack] = useState([]);

  const colors = [
    "#ff1744",
    "#d500f9",
    "#40c4ff",
    "#76ff03",
    "#ffd54f",
    "#4dd0e1",
    "#ef5350",
    "#26c6da",
    "#f06292",
    "#aed581",
    "#ff3d00",
    "#ffea00",
    "#1de9b6",
    "#651fff",
    "#ff4081",
  ];

  const randomizeList = (len) => {
    const elements = Array.from(Array(len).keys()).splice(1);
    for (let i = elements.length; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i - 1));
      const tmp = elements[i - 1];
      elements[i - 1] = elements[randomIndex];
      elements[randomIndex] = tmp;
    }
    const arrayList = new List("Block");
    elements.forEach((element) => {
      arrayList.addBack({
        value: element,
        color: colors[element - 1],
        id: "id-" + element,
      });
    });
    const stk = new Stack();

    setArr(arrayList);
    setList(arrayList.arr);
    setStack(stk);
    setStackView([]);
    setResult([]);
  };

  const selectAlgo = (algorithm) => {
    setAlgo(algorithm);
  };

  const perform = () => {
    if (algo == "Next Greater") {
      let { results, stackViews } = NextGreaterElement(arr, stack);
      let n = results.length;
      for (let i = 0; i < n; i++) {
        setTimeout(() => {
          setResult(results[i]);
          setStackView(stackViews[i]);
        }, speed * i);
      }
    } else if (algo == "Previous Smaller") {
      let { results, stackViews } = PreviousSmallerElement(arr, stack);
      let n = results.length;
      for (let i = 0; i < n; i++) {
        setTimeout(() => {
          setResult(results[i]);
          setStackView(stackViews[i]);
        }, speed * i);
      }
    }
  };

  const heading = "Stack Visualizer";
  const stackAlgos = ["Next Greater", "Previous Smaller"];

  const options = [
    {
      id: "algorithms",
      label: algo,
      type: "dropDown",
      options: stackAlgos,
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
        setSize(Math.max(5, Math.floor(maxSize * (parseFloat(item) / 100))));
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

  return (
    <div>
      <NavBar heading={heading} options={options} actions={actions} />
      <div className={styles.board}>
        <div className={styles.listSpace}>
          <Boxes heading={"Input"} list={list} />
          <Boxes heading={"Result"} list={result} />
        </div>
        <div className={styles.stackSpace}>
          <StackView stack={stackView} />
        </div>
      </div>
    </div>
  );
};

export default StackPage;
