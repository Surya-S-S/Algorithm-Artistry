"use client";
import { motion } from "framer-motion";
import styles from "./Node.module.css";

const Node = ({ data, index }) => {
  const animation = {
    type: "spring",
    damping: 20,
    stiffness: 300,
  };
  return (
    <motion.div
      id={index}
      key={index}
      layout
      transition={animation}
      className={`${styles["node"]} ${styles[data?.style]}`}
    >
      {data?.value}
    </motion.div>
  );
};

export default Node;
