import { addSession, useEditSession } from "../lib/hooks";
import { SessionsContext } from "../lib/context";
import { useContext } from "react";
import toast from "react-hot-toast";

export default function Editor(props) {
  const { setNewSessions, newSessions, modalContent } =
    useContext(SessionsContext);

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
      } else if (s.mode.value === "Zoom" || s.mode.value === "In-Person") {
        const newSess = addSession(e);

        setNewSessions((prevState) => {
          return [...prevState, newSess];
        });
        console.log(newSessions);
        return newSessions;
      } else {
        if (s.mode.value !== "Zoom" || s.mode.value !== "In-Person") {
          return toast.error(
            `${s.mode.value} is not a valid Mode. Please enter "Zoom" or "In-Person" only. (case-sensitive)`
          );
        } else {
          return toast.error("Some other error occured");
        }
      }
    }

    if (props.action === "edit") {
      props.onSubmit(e);
    }
  };

  return (
    <div>
      <h1>EDITOR</h1>
      {props.value ? <h2>{props.value}</h2> : null}
      <form onSubmit={submitHandler} className="form-basic">
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
