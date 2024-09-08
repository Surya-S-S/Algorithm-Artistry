"use client";
import Bars from "@/components/bars/Bars";
import NavBar from "@/components/navbar/NavBar";
import { useEffect, useState } from "react";
import BubbleSort from "./algorithms/BubbleSort";
import InsertionSort from "./algorithms/InsertionSort";
import MergeSort from "./algorithms/MergeSort";
import QuickSort from "./algorithms/QuickSort";
import SelectionSort from "./algorithms/SelectionSort";
import styles from "./page.module.css";

const SortingPage = () => {
  const [list, setList] = useState([]);
  const maxSize = 35;
  const [size, setSize] = useState(maxSize);
  const maxSpeed = 500;
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
    let randomList = [];
    elements.forEach((element) => {
      randomList.push({
        value: element,
        id: "id-" + element,
      });
    });
    setList(randomList);
  };

  const selectAlgo = (algorithm) => {
    setAlgo(algorithm);
  };

  const sortList = () => {
    let result = [];
    if (algo == "Bubble Sort") {
      result = BubbleSort(list);
    } else if (algo == "Insertion Sort") {
      result = InsertionSort(list);
    } else if (algo == "Selection Sort") {
      result = SelectionSort(list);
    } else if (algo == "Merge Sort") {
      result = MergeSort(list);
    } else if (algo == "Quick Sort") {
      result = QuickSort(list);
    }
    let n = result.length;
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        setList(result[i]);
      }, speed * i);
    }
  };

  const heading = "Sorting Visualizer";
  const sortingAlgos = [
    "Bubble Sort",
    "Insertion Sort",
    "Selection Sort",
    "Merge Sort",
    "Quick Sort",
  ];

  const options = [
    {
      id: "algorithms",
      label: algo,
      type: "dropDown",
      options: sortingAlgos,
    },
    { id: "randomize", label: "Randomize", type: "button", randomizeList },
    { id: "size", label: "Size", type: "dropDown", options: [size / maxSize] },
    {
      id: "speed",
      label: "Speed",
      type: "dropDown",
      options: [speed / maxSpeed],
    },
    { id: "sort", label: "Sort", type: "button", sortList },
  ];

  const handleClick = (item) => {
    switch (item?.id) {
      case "randomize": {
        randomizeList(size);
        break;
      }
      case "sort": {
        sortList();
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
        <Bars list={list} />
      </div>
    </div>
  );
};

export default SortingPage;
