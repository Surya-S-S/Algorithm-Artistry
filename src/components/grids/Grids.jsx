import { clsx } from "clsx";
import { motion } from "framer-motion";
import styles from "./Grids.module.css";

const Grids = ({ matrix }) => {
  const animation = { type: "spring", damping: 20, stiffness: 300 };
  return (
    <div className={styles.matrixContainer}>
      {matrix.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className={styles.rowContainer}>
            {row.map((item, index) => {
              const color = { backgroundColor: item?.color };
              return (
                <motion.div
                  id={index}
                  key={index}
                  layout
                  transition={animation}
                  className={clsx(styles["gridCell"], {
                    [styles[`${item?.style}`]]: item?.style,
                  })}
                  style={color}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grids;
