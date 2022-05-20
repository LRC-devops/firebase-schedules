import { AiOutlineCloseCircle } from "react-icons/ai";
import Table from "./Table";
import classes from "./Modal.module.css";
// import { getDoc, getDocs } from "firebase/firestore";
import { sessionToJSON } from "../lib/firebase";
// import { SessionsContext } from "../lib/context";
// import { useContext, useState } from "react";
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

// console.log(props.posts);
// const query = queryByBtnName(props.modalContent.btnName);

const ScheduleModal = (props) => {
  // const [filteredPosts, setFilteredPosts] = useState([]);
  // async function queryByBtnName(btnName) {
  //   const query = firestore
  //     .collection("agSched")
  //     .where("subject", "==", btnName);
  //   const posts = (await query.get()).docs.map(sessionToJSON);
  //   // setFilteredPosts(posts);

  //   return posts;
  // }

  // console.log(
  //   queryByBtnName(props.modalContent.btnName).then((result) => result.data)
  // );
  // // const queriedPosts = queryByBtnName();
  // // queryByBtnName("Chemistry").then(console.log);
  // // queryByBtnName("Chemistry").then(posts);

  // const printPosts = async () => {
  //   const a = await queryByBtnName(props.modalContent.btnName);
  //   console.log(a);
  //   // setIsLoading(false);
  //   return a;
  // };

  // const getData = async () => {
  //   const data = await printPosts();
  //   console.log(data);
  // };
  // const posts = getData();
  // console.log(posts);
  // const posts = printPosts("Chemistry").then(result);
  // console.log(posts);

  // const posts = printPosts();
  // console.log(posts);
  // console.log(printPosts());

  // const testPost = firestore
  //   .collection("agSched")
  //   .where("subject", "==", props.modalContent.btnName);
  // const testPostReturn = testPost
  //   .get()
  //   .then((response) => response.json())
  //   .then((post) => {
  //     return post.testPostReturn;
  //   });

  // console.log(testPostReturn);

  //   const getQueryPosts
  //  = async (btnName) => {
  //    const query = db.collection('agSched').where('subject', '==', btnName);
  //    const data = await
  //  }
  // console.log(posts);
  // console.log(queriedPosts);

  // queryByBtnName(props.modalContent.btnName).then((response) => {
  //   props: {
  //     posts;
  //   }
  // });
  // const posts = props.posts;
  // console.log(props.posts);
  // const posts = props.posts;
  // console.log("btnName in Schedule Modal", posts);

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

  // const posts = filterDataBySubject(props.posts, props.modalContent.btnName);

  // const querySnapshot = getDocs(query);
  // console.log(querySnapshot);
  // querySnapshot.forEach((doc) => {
  //   console.log(docId, "=>", doc.data());
  // });

  // console.log("posts in scheduleModal", posts);

  // const posts = getFilteredPosts(props.modalContent.btnName);
  // console.log("data in ScheduleModal", props.posts);
  // console.log(props.posts);
  // console.log(filteredPosts);

  console.log(props.modalContent.sessions);

  const posts = [props.modalContent.sessions];

  console.log(posts);

  const newArr = posts.map((session) => session);
  console.log(newArr);
  const filteredArr = newArr.map((session) => session.course);

  // posts.forEach((session) => {
  //   console.log(session[0].subject);
  // });
  // posts.map((session) => console.log(session.subject));

  // const sessions = props.modalContent.sessions.then((result) => console.log);
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
          {/* <Table posts={posts} action={"filteredAgSched"} /> */}
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
