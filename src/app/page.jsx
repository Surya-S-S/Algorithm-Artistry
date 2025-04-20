"use client";
import { motion } from "framer-motion";
import styles from "./page.module.css";

const content = [
  { title: "Sorting", url: "sorting" },
  { title: "Searching", url: "searching" },
  { title: "Stack", url: "stack" },
  { title: "Two pointers", url: "two-pointers" },
  // {title: "Hashing", url: "hashing"},
  // {title: "Sliding window", url: "sliding-window"},
  // {title: "Matrix", url: "matrix"},
  // {title: "String", url: "string"},
  // {title: "Recursion", url: "recursion"},
  // {title: "Back tracking", url: "back-tracking"},
  { title: "Path Finding", url: "path-finding" },
  { title: "Linked List", url: "linked-list" },
  // {title: "Queue", url: "queue"},
  { title: "Tree", url: "tree" },
  // {title: "Trie", url: "trie"},
];

const handleClick = (url) => {
  window.location.href = url;
};

const Home = () => {
  return (
    <div className={styles.main}>
      <div className={styles.heading}>
        <h2>Algorithm Artistry</h2>
      </div>
      <div className={styles.board}>
        {content.map((data, index) => {
          return (
            <motion.button
              id={index}
              key={index}
              className={styles.titleCard}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                handleClick(data?.url);
              }}
            >
              <h3>{data?.title}</h3>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
