"use client";
import Boxes from "@/components/boxes/Boxes";
import NavBar from "@/components/navbar/NavBar";
import { useEffect, useState } from "react";
import BinarySearch from "./algorithms/BinarySearch";
import LinearSearch from "./algorithms/LinearSearch";
import styles from "./page.module.css";

const SearchingPage = () => {
  const [list, setList] = useState([]);
  const maxSize = 127;
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

  const searchList = (searchElement) => {
    let result = [];
    if (algo == "Linear Search") {
      result = LinearSearch(list, searchElement);
    } else if (algo == "Binary Search") {
      result = BinarySearch(list, searchElement);
    }
    let n = result.length;
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        setList(result[i]);
      }, speed * i);
    }
  };

  const heading = "Searching Visualizer";
  const searchingAlgos = ["Linear Search", "Binary Search"];

  const options = [
    {
      id: "algorithms",
      label: algo,
      type: "dropDown",
      options: searchingAlgos,
    },
    { id: "randomize", label: "Randomize", type: "button", randomizeList },
    { id: "size", label: "Size", type: "dropDown", options: [size / maxSize] },
    {
      id: "speed",
      label: "Speed",
      type: "dropDown",
      options: [speed / maxSpeed],
    },
    { id: "search", label: "Search", type: "inputButton", searchList },
  ];

  const handleClick = (
    item,
    searchElement = 1
  ) => {
    switch (item?.id) {
      case "randomize": {
        randomizeList(size);
        break;
      }
      case "search": {
        searchList(searchElement);
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
        setSize(Math.max(19, Math.floor(maxSize * (parseFloat(item) / 100))));
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
        <Boxes list={list} />
      </div>
    </div>
  );
};

export default SearchingPage;
