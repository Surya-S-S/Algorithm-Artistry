import { motion } from "framer-motion";
import styles from "./Boxes.module.css";

const Boxes = ({ list }) => {
  return (
    <div className={styles.listBlocks}>
      {list?.map((item, index) => {
        const animation = { type: "spring", damping: 20, stiffness: 300 };
        return (
          <div>
            <motion.div
              id={index}
              key={index}
              layout
              transition={animation}
              className={`${styles["block"]} ${styles[item?.style]}`}
            >
              {item?.value}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default Boxes;
