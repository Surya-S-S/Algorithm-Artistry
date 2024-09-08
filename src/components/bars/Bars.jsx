"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./Bars.module.css";

const Bars = ({ list }) => {
  const [width, setWidth] = useState(30);

  useEffect(() => {
    setWidth(Math.ceil(window.innerWidth / 50));
  }, [list?.length]);

  return (
    <div className={styles.listBlocks}>
      {list?.map((item, index) => {
        const height = (item?.value + 2) * (40 / list?.length) * 10;
        const style = {
          height: height,
          width: width,
          order: index,
        };
        const animation = {
          type: "spring",
          damping: 20,
          stiffness: 300,
        };
        return (
          <div key={index}>
            <motion.div
              id={index}
              key={index}
              layout
              transition={animation}
              className={`${styles["block"]} ${styles[item?.style]}`}
              style={style}
            />
            <div className={`${styles["quantity"]} ${styles[item?.style]}`}>
              {item?.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Bars;
