"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./Button.module.css";

const Button = ({ option, handleClick, hasInput }) => {
  const router = useRouter();
  const [value, setValue] = useState(1);
  const label = option?.label;
  return (
    <div className={`${hasInput && styles["wrapper"]}`}>
      <div className={styles.buttonWrapper}>
        <motion.button
          className={`${styles["button"]} ${hasInput && styles["input"]}`}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: hasInput ? 1 : 1.1 }}
          onClick={() => {
            label === "<" ? router.push("/") : handleClick(option, value);
          }}
        >
          {label}
        </motion.button>
      </div>
      {hasInput && (
        <motion.input
          className={styles.inputField}
          defaultValue={1}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      )}
    </div>
  );
};

export default Button;
