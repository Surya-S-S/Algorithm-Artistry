"use client";
import ListNodes from "@/components/listNodes/ListNodes";
import NavBar from "@/components/navbar/NavBar";
import { LinkedList } from "@/utils/LinkedList";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const LinkedListPage = () => {
  const [list, setList] = useState([]);
  const [result, setResult] = useState([]);
  const maxSize = Math.floor(window.innerWidth / 120);
  const maxSpeed = 1000;
  const [speed, setSpeed] = useState(maxSpeed - 250);
  const [algo, setAlgo] = useState("Algorithms");
  const [head, setHead] = useState(null);

  const randomizeList = (len) => {
    const elements = Array.from(Array(len).keys()).splice(1);
    for (let i = elements.length; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i - 1));
      const tmp = elements[i - 1];
      elements[i - 1] = elements[randomIndex];
      elements[randomIndex] = tmp;
    }
    const ll = new LinkedList();
    elements.forEach((element) => {
      ll.addBack({
        value: element,
        id: "id-" + element,
      });
    });

    setHead(ll);
    setList(ll.serialize());
    setResult([]);
  };

  const selectAlgo = (algorithm) => {
    setAlgo(algorithm);
  };

  const perform = () => {
    if (algo == "Reverse") {
      let { list, result } = head.reverseLinkedList();
      let n = list.length;
      for (let i = 0; i < n; i++) {
        setTimeout(() => {
          setList(list[i]);
          setResult(result[i]);
        }, speed * i);
      }
    } else if (algo == "Find Middle") {
      let result = head.findMiddle();
      let n = result.length;
      for (let i = 0; i < n; i++) {
        setTimeout(() => {
          setResult(result[i]);
        }, speed * i);
      }
    }
  };

  const heading = "Linked List Visualizer";
  const linkedListAlgos = ["Reverse", "Find Middle"];

  const options = [
    {
      id: "algorithms",
      label: algo,
      type: "dropDown",
      options: linkedListAlgos,
    },
    { id: "randomize", label: "Randomize", type: "button", randomizeList },
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
        randomizeList(maxSize);
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
    randomizeList(maxSize);
  }, []);

  return (
    <div>
      <NavBar heading={heading} options={options} actions={actions} />
      <div className={styles.board}>
        <ListNodes heading={"Input"} list={list} />
        <ListNodes heading={"Result"} list={result} />
      </div>
    </div>
  );
};

export default LinkedListPage;
