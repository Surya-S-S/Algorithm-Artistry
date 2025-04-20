import { motion } from "framer-motion";
import styles from "./StackView.module.css";

const StackView = ({ stack }) => {
  return (
    <div>
      <div className={styles.stack}>
        {stack?.map((item, index) => {
          const animation = { type: "spring", damping: 20, stiffness: 300 };
          return (
            <div key={index}>
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
      <h3 className={styles.title}>{"Stack"}</h3>
    </div>
  );
};

export default StackView;
