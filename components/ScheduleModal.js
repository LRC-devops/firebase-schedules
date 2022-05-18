import { AiOutlineCloseCircle } from "react-icons/ai";
import Table from "./Table";
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
    return filteredData;
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
      <div className="modal__background"></div>
      <div className="modal">
        <AiOutlineCloseCircle className="modal__icon" onClick={props.onClose} />
        <div className="modal__title">
          <h2>{props.modalContent.btnName}</h2>
        </div>
        <div className="modal__content">
          <Table posts={posts} />
        </div>
        <div className="modal__footer">
          <p>
            Zoom sessions are marked with this color , in-person sessions are
            marked with this color. Canceled sessions appear like this. <br />
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
