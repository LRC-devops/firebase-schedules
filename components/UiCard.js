import classes from "../components/UiCard.module.css";

const UiCard = (props) => {
  return (
    <div className={classes["ui-card__box"]}>
      <div className={classes["ui-card"]}>
        <h1 className={classes["ui-card__heading"]}>ui card</h1>
        <div className={classes["ui-card__icon"]}></div>
        <div className={classes["ui-card__text"]}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non totam
            assumenda error! Error, perspiciatis dicta neque hic illo eaque
            fugit sunt ut tempora recusandae quod adipisci est vel a iusto!
          </p>
        </div>
      </div>
      <div className={classes["ui-card"]}>
        <h1 className={classes["ui-card__heading"]}>ui card</h1>
        <div className={classes["ui-card__icon"]}></div>
        <div className={classes["ui-card__text"]}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non totam
            assumenda error! Error, perspiciatis dicta neque hic illo eaque
            fugit sunt ut tempora recusandae quod adipisci est vel a iusto!
          </p>
        </div>
      </div>
      <div className={classes["ui-card"]}>
        <h1 className={classes["ui-card__heading"]}>ui card</h1>
        <div className={classes["ui-card__icon"]}></div>
        <div className={classes["ui-card__text"]}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non totam
            assumenda error! Error, perspiciatis dicta neque hic illo eaque
            fugit sunt ut tempora recusandae quod adipisci est vel a iusto!
          </p>
        </div>
      </div>
    </div>
  );
};

export default UiCard;

// classes["main-image"]
