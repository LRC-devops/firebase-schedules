import { useAddSession } from "../lib/hooks";
import { SessionsContext } from "../lib/context";
import { useContext } from "react";
import toast from "react-hot-toast";

export default function Editor(props) {
  const { setNewSessions } = useContext(SessionsContext);
  let optionUpdate = props.isCancelled;
  // const updateOption = () => {
  //   return !optionUpdate;
  // };
  const submitHandler = (e) => {
    e.preventDefault();
    let s = e.target;
    if (props.action === `add`) {
      if (
        s.subject.value.length === 0 ||
        s.course.value.length === 0 ||
        s.dayTime.value.length === 0 ||
        s.host.value.length === 0 ||
        s.mode.value.length === 0
      ) {
        return toast.error("session data is incomplete");
      } else {
        const newSessions = useAddSession(e);
        setNewSessions(newSessions);
        return newSessions;
      }
    } else {
      props.onSubmit(e);
    }
  };

  return (
    <div>
      <h1>EDITOR</h1>
      {props.value ? <h2>{props.value}</h2> : null}
      {/* <form onSubmit={props.onSubmit} className="form-basic"> */}
      <form onSubmit={submitHandler} className="form-basic">
        {/* <label htmlFor="course">Course</label> */}
        <input type="text" placeholder="Subject" name="subject" />
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
