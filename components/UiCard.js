import classes from "../components/UiCard.module.css";
import { AiOutlineUser } from "react-icons/ai";
import { MdInput } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineFieldTime } from "react-icons/ai";
import { GrPersonalComputer } from "react-icons/gr";

const UiCard = (props) => {
  const uiCardArr = [
    {
      title: "sign-up or show up!",
      icon: <MdInput className={classes["ui-card__icon--icon"]} />,
      description: "at anytime during the session",
    },
    {
      title: "your class",
      icon: <AiOutlineCheck className={classes["ui-card__icon--icon"]} />,
      description:
        "Study with classmates and have an Academic Guide there to answer questions.",
    },
    {
      title: "Check-in",
      icon: <AiOutlineFieldTime className={classes["ui-card__icon--icon"]} />,
      description:
        "at the Learning Hub front desk, or register when signing onto Zoom for an Online Appointment.",
    },
    {
      title: "online or in-person",
      icon: <GrPersonalComputer className={classes["ui-card__icon--icon"]} />,
      description: "at anytime during the session",
    },
  ];
  return (
    <div className={classes["ui-card__box"]}>
      {uiCardArr.map((card) => (
        <div key={`uiCard-${Math.random()}`} className={classes["ui-card"]}>
          <h1 className={classes["ui-card__heading"]}>{card.title}</h1>
          <div className={classes["ui-card__icon"]}>{card.icon}</div>
          <div className={classes["ui-card__description"]}>
            <p>{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UiCard;

// classes["main-image"]
