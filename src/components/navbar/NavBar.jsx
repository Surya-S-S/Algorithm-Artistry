import Button from "@/components/button/Button";
import DropDown from "@/components/dropdown/DropDown";
import styles from "./NavBar.module.css";

const NavBar = ({ heading, options, actions }) => {
  return (
    <div className={styles.navBar}>
      <div>
        <h2>{heading}</h2>
      </div>
      <div className={styles.options}>
        {options?.map((option, index) => {
          switch (option?.type) {
            case "dropDown":
              return (
                <div key={index} className={styles.option}>
                  <DropDown
                    option={option}
                    handleSelect={actions?.handleSelect}
                  />
                </div>
              );
            case "button":
              return (
                <div key={index} className={styles.option}>
                  <Button option={option} handleClick={actions?.handleClick} />
                </div>
              );
            case "inputButton":
              return (
                <div key={index} className={styles.option}>
                  <Button
                    option={option}
                    handleClick={actions?.handleClick}
                    hasInput={true}
                  />
                </div>
              );
          }
        })}
      </div>
    </div>
  );
};

export default NavBar;
