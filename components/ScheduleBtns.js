import classes from "../components/ScheduleBtns.module.css";

const ScheduleBtns = (props) => {
  const filterDataBySubject = [
    ...new Set(props.posts.map((session) => session.subject)),
  ];
  const randColorGen = (index) => {
    const colorClassArr = [
      "schedBtnTeal",
      "sched-btn__green",
      "sched-btn__teal-var",
      "sched-btn__green-var",
    ];
    console.log(colorClassArr[index]);
    return colorClassArr[index];
  };

  if (props.type === "ssw") {
    return (
      <button
        className={classes["sched-btn__btn"]}
        onClick={props.btnClickHandler}
        key={Math.random()}
      >
        Schedule
      </button>
    );
  } else {
    return (
      <div className={classes["sched-btn__box"]}>
        {filterDataBySubject.map((session, index) => (
          <button
            className={classes.schedBtn}
            onClick={props.btnClickHandler}
            key={Math.random()}
          >
            {session}
          </button>
        ))}
      </div>
    );
  }
};

export default ScheduleBtns;
