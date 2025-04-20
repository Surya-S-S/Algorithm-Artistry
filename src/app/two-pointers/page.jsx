"use client";
import Bars from "@/components/bars/Bars";
import NavBar from "@/components/navbar/NavBar";
import { List } from "@/utils/List";
import { useEffect, useState } from "react";
import TrappingRainwater from "./algorithms/TrappingRainwater";
import styles from "./page.module.css";

const TwoPointersPage = () => {
  const [list, setList] = useState([]);
  const maxSize = 40;
  const [size, setSize] = useState(maxSize);
  const maxSpeed = 500;
  const [speed, setSpeed] = useState(maxSpeed - 250);
  const [algo, setAlgo] = useState("Algorithms");
  const [arr, setArr] = useState([]);

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
        fill: 0,
        id: "id-" + element,
      });
    });

    setArr(arrayList);
    setList(arrayList.arr);
  };

  const selectAlgo = (algorithm) => {
    setAlgo(algorithm);
  };

  const perform = () => {
    let result = [];
    if (algo == "Trapping Rainwater") {
      result = TrappingRainwater(arr);
    }
    let n = result.length;
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        setList(result[i]);
      }, speed * i);
    }
  };

  const heading = "Two Pointers Visualizer";
  const twoPointerAlgos = ["Trapping Rainwater", "Sample"];

  const options = [
    {
      id: "algorithms",
      label: algo,
      type: "dropDown",
      options: twoPointerAlgos,
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
        setSize(Math.max(15, Math.floor(maxSize * (parseFloat(item) / 100))));
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
        <Bars list={list} isClosed={true} />
      </div>
    </div>
  );
};

export default TwoPointersPage;
