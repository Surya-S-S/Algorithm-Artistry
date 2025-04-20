import Node from "@/components/node/Node";
import styles from "./ListNodes.module.css";

const ListNodes = ({ heading, list }) => {
  return (
    <div className={styles.listWrapper}>
      <h3 className={styles.title}>{heading}</h3>
      <div className={styles.listContainer}>
        {list.map((item, index) => {
          const isLast = index == list.length - 1;
          return (
            <div id={index} key={index} className={styles.nodeContainer}>
              <Node data={item} index={index} />
              {!isLast && (
                <div className={styles.arrow}>
                  <svg height="20" width="40">
                    <line
                      x1="0"
                      y1="10"
                      x2="30"
                      y2="10"
                      stroke="#b4b4b4"
                      strokeWidth="1"
                    />
                    <polygon points="30,5 40,10 30,15" fill="#b4b4b4" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListNodes;
