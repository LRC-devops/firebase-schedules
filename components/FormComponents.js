import React from "react";
import classes from "./FormComponents.module.css";

export const FormInput = (props) => {
  return (
    <input
      className={classes["form-input"]}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
    />
  );
};

export const FormButton = (props) => {
  return <button className={classes["form-button"]}>{props.children}</button>;
};

// export default FormInput;
