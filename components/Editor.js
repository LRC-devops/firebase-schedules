import { addSession, useEditSession } from "../lib/hooks";
import { SessionsContext } from "../lib/context";
import { useContext } from "react";
import toast from "react-hot-toast";

export default function Editor(props) {
  const { setNewSessions, newSessions, modalContent } =
    useContext(SessionsContext);

  // let optionUpdate = props.isCancelled;
  // const updateOption = () => {
  //   return !optionUpdate;
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("enter editor submitHandler");
    let s = e.target;
    if (props.action === `add`) {
      // console.log("enter add in submitHandler");
      if (
        s.subject.value.length === 0 ||
        s.course.value.length === 0 ||
        s.dayTime.value.length === 0 ||
        s.host.value.length === 0 ||
        s.mode.value.length === 0
      ) {
        // console.log("incom session data");
        return toast.error("session data is incomplete");
      } else {
        // console.log("enter useAddSession call");
        const newSess = addSession(e);
        // console.log(newSess);

        // setNewSessions([...newSessions, newSess]);
        setNewSessions((prevState) => {
          return [...prevState, newSess];
        });

        // console.log(newSessions);
        return newSessions;
      }
    }
    if (props.action === "edit") {
      // console.log("enter else in SubmitHandler -- Editor");
      // console.log(modalContent);
      props.onSubmit(e);
      // useEditSession(e, modalContent.session);
    }
    // s.subject.value = "";
    // s.course.value = "";
    // s.dayTime.value = "";
    // s.host.value = "";
    // s.link.value = "";
    // s.mode.value = "";
    // return toast.success(`Yay!`);
  };

  return (
    <div>
      <h1>EDITOR</h1>
      {props.value ? <h2>{props.value}</h2> : null}
      {/* <form onSubmit={props.onSubmit} className="form-basic"> */}
      <form onSubmit={submitHandler} className="form-basic">
        {/* <label htmlFor="course">Course</label> */}

        <input
          type="text"
          placeholder={props.action === "edit" ? `Edit Field` : "Subject"}
          name="subject"
        />
        <input type="text" placeholder="Course" name="course" />
        <input type="text" placeholder="Day/Time" name="dayTime" />
        <input type="text" placeholder="host" name="host" />
        <input type="text" placeholder="link" name="link" />
        <input type="text" placeholder="mode" name="mode" />
        <button>Submit</button>
      </form>
    </div>
  );
}
