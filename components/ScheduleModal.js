import { AiOutlineCloseCircle } from "react-icons/ai";
import Table from "./Table";
import classes from "./Modal.module.css";

const ScheduleModal = (props) => {
  // FILTER DATA GET
  const filterDataBySubject = (data, btnName) => {
    // const filtArr = new Set(data.map((session)))
    const filteredData = data.filter((session) => {
      return session.subject === btnName;
    });
    const filteredCourses = [
      ...new Set(filteredData.map((session) => session.course)),
    ];
    const dataOut = [];
    for (let i = 0; i < filteredCourses.length; i++) {
      const filteredDataByCourse = filteredData.filter((session) => {
        return session.course === filteredCourses[i];
      });
      dataOut.push(filteredDataByCourse);
    }
    return dataOut;
  };
  // const service = props.service.slice(-5);

  let posts;
  let action;
  if (props.serviceType === "sched") {
    posts = filterDataBySubject(props.posts, props.modalContent.btnName);
    action = "filteredAgSched";
  } else if (props.serviceType === "calendar") {
    posts = props.posts;
    action = "ssw";
  } else if (props.type === "EDIT") {
    action = "EDIT";
  }

  let modalTitle;
  if (props.modalContent.btnName) {
    modalTitle = props.modalContent.btnName;
  } else {
    modalTitle = props.service;
  }

  return (
    <>
      <div
        className={classes["modal__background"]}
        onClick={props.onClose}
      ></div>
      <div className={classes.modal}>
        <AiOutlineCloseCircle
          className={classes["modal__icon"]}
          onClick={props.onClose}
        />
        <div className={classes["modal__title"]}>
          <h2>{modalTitle}</h2>
        </div>
        <div className={classes["modal__content"]}>
          <Table posts={posts} action={action} type={props.type} />
        </div>
        <div className={classes["modal__footer"]}>
          <p>
            <span className={classes["modal__footer--zoom-span"]}>
              Zoom sessions are marked with this color
            </span>{" "}
            ,{" "}
            <span className={classes["modal__footer--in-person-span"]}>
              in-person sessions are marked with this color.
            </span>{" "}
            <span className={classes["modal__footer--cancel-span"]}>
              Canceled sessions appear like this.
            </span>{" "}
            <br />
            *Enter at 12th and Larimer for in person sessions <br />
            **Zoom log-in requires your CU Denver Student account. <br />
            Times are subject to change throughout the semester. We will adjust
            based on student demand and Academic Guide availability
          </p>
        </div>
      </div>
    </>
  );
};

export default ScheduleModal;
