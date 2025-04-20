import { clsx } from "clsx";
import { motion } from "framer-motion";
import styles from "./Boxes.module.css";

const Boxes = ({ heading, list }) => {
  return (
    <div className={clsx({ [styles.blockContainer]: heading })}>
      {heading && <h3 className={styles.title}>{heading}</h3>}
      <div className={styles.listBlocks}>
        {list?.map((item, index) => {
          const animation = { type: "spring", damping: 20, stiffness: 300 };
          const color = { backgroundColor: item?.color };
          return (
            <div key={index}>
              <motion.div
                id={index}
                key={index}
                layout
                transition={animation}
                className={clsx(styles["block"], {
                  [styles[`${item?.style}`]]: item?.style,
                })}
                style={color}
              >
                {item?.value}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Boxes;
