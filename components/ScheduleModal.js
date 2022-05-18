import { AiOutlineCloseCircle } from "react-icons/ai";
import Table from "./Table";
import classes from "./Modal.module.css";
// import { firestore, sessionToJSON } from "../lib/firebase";
// import { useContext } from "react";
// import { SessionsContext } from "../lib/context";

// export async function getFilteredPosts(context) {
//   const { modalContent } = useContext(SessionsContext);
//   const postQuery = firestore
//     .collection("agSched")
//     .where("subject", "==", `${modalContent.btnName}`);
//   const posts = (await postQuery.get()).docs.map(sessionToJSON);

//   return {
//     props: { posts },
//   };
// }

// console.log(props.posts);

const ScheduleModal = (props) => {
  // const posts = props.posts;
  console.log("btnName in Schedule Modal", posts);

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

  const posts = filterDataBySubject(props.posts, props.modalContent.btnName);

  const footnote = `Zoom sessions are marked with this color , in-person sessions are marked with this color. Canceled sessions appear like this. <br />
  *Enter at 12th and Larimer for in person sessions <br />
  **Zoom log-in requires your CU Denver Student account. <br />
  Times are subject to change throughout the semester. We will adjust based on student demand and Academic Guide availability`;

  // const posts = getFilteredPosts(props.modalContent.btnName);
  // console.log("data in ScheduleModal", props.posts);
  // console.log(props.posts);
  return (
    <>
      <div className={classes["modal__background"]}></div>
      <div className={classes.modal}>
        <AiOutlineCloseCircle
          className={classes["modal__icon"]}
          onClick={props.onClose}
        />
        <div className={classes["modal__title"]}>
          <h2>{props.modalContent.btnName}</h2>
        </div>
        <div className={classes["modal__content"]}>
          <Table posts={posts} action={"filteredAgSched"} />
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
