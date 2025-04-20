"use client";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./Bars.module.css";

const Bars = ({ list, isClosed = false }) => {
  const [width, setWidth] = useState(30);

  useEffect(() => {
    setWidth(Math.ceil(window.innerWidth / 50));
  }, [list?.length]);

  return (
    <div className={styles.listBlocks}>
      {list?.map((item, index) => {
        const blockHeight = item?.value * (40 / list?.length) * 10;
        const fillHeight = item?.fill * (40 / list?.length) * 10;
        const blockStyle = {
          height: blockHeight,
          width: width,
          order: index,
        };
        const fillStyle = {
          height: fillHeight,
          width: width,
          order: index,
        };
        const blockTransition = {
          type: "spring",
          damping: 20,
          stiffness: 300,
        };
        const fillTransition = {
          type: "spring",
          damping: 30,
          stiffness: 300,
        };
        return (
          <div key={index}>
            {isClosed && (
              <motion.div
                id={index}
                key={index}
                layout
                transition={fillTransition}
                className={clsx(styles["block"], {
                  [styles["closedBlock"]]: isClosed,
                  [styles["blueBlock"]]: item?.fill,
                })}
                style={fillStyle}
              />
            )}
            <motion.div
              id={index}
              key={index}
              layout
              transition={blockTransition}
              className={clsx(styles["block"], {
                [styles["closedBlock"]]: isClosed,
                [styles["outline"]]: isClosed,
                [styles[`${item?.style}`]]: item?.style,
              })}
              style={blockStyle}
            />
            <div
              className={clsx(styles["quantity"], {
                [styles["closedQuantity"]]: isClosed,
                [styles["outline"]]: isClosed,
                [styles[`${item?.style}`]]: item?.style,
              })}
            >
              {item?.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Bars;
