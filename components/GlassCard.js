import classNames from "classnames";
import React from "react";
import classes from "./GlassCard.module.css";

const GlassCard = (props) => {
  return <div className={classes["glass-card"]}>{props.children}</div>;
};

export default GlassCard;
