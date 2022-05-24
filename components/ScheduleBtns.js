import classes from "../components/ScheduleBtns.module.css";

const ScheduleBtns = (props) => {
  const filterDataBySubject = [
    ...new Set(props.posts.map((session) => session.subject)),
  ];

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
        {filterDataBySubject.map((session) => (
          <button
            className={classes["sched-btn__btn"]}
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
