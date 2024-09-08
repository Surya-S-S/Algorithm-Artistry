"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import styles from "./DropDown.module.css";

let clamp = (num, min, max) => Math.max(Math.min(num, max), min);
let roundTo = (num, decimals) =>
  Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);

const DropDown = ({ option, handleSelect }) => {
  const heading = option?.label;
  const options = option?.options;
  const animation = {
    type: "spring",
    bounce: 0,
    duration: 0.3,
  };
  const [panning, setPanning] = useState(false);
  const initialValue = options.length == 1 ? options[0] : 0;
  let progress = useMotionValue(initialValue);
  let width = useTransform(progress, (v) => `${v * 100}%`);
  let roundedProgress = useTransform(
    progress,
    (v) => `${roundTo(v * 100, 0)}%`
  );

  return (
    <div className={styles.dropDown}>
      <div>
        <motion.button
          className={styles.dropDownButton}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          {heading}
        </motion.button>
      </div>
      <div
        className={`${styles.dropDownContent} ${
          panning && styles.displayDropDownContent
        }`}
      >
        {options.length > 1 ? (
          options?.map((item, index) => {
            return (
              <a
                key={index}
                onClick={() => {
                  handleSelect(option, item);
                }}
              >
                {item}
              </a>
            );
          })
        ) : (
          <motion.div
            initial={false}
            className={styles.wrapper}
            transition={animation}
            onPanStart={() => {
              setPanning(true);
            }}
            onPanEnd={() => {
              setPanning(false);
              handleSelect(option, roundedProgress.get());
            }}
            onPan={(event, info) => {
              event.preventDefault();
              let deltaInPercent = (info.delta.x / window.innerWidth) * 10;
              let newPercent = clamp(progress.get() + deltaInPercent, 0, 1);
              progress.set(newPercent);
            }}
          >
            <motion.div
              initial={false}
              style={{ width }}
              className={styles.slider}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DropDown;
