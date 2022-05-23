import classes from "../components/ScheduleBtns.module.css";

const ScheduleBtns = (props) => {
  const filterDataBySubject = [
    ...new Set(props.posts.map((session) => session.subject)),
  ];
  const btnClickHandler = (e) => {
    const btnName = e.target.innerHTML;
    console.log(btnName);
    return btnName;
  };
  const data = ["Chemistry", "Music", "Psych"];
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
};

export default ScheduleBtns;
