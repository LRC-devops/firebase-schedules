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
    // build arr from data input
    const dataArr = [];
    Array.from(e.target.elements).forEach((input) => {
      dataArr.push(input.value);
    });

    const checkMode = (mode) => {
      if (mode === "Zoom" || mode === "In-Person") {
        return true;
      } else {
        return false;
      }
    };
    const checkLength = (inputArr) => {
      let check = true;
      //arr.length - 1 becuase button counts as an element of the form
      for (let i = 0; i < inputArr.length - 1; i++) {
        if (inputArr[i].length === 0) {
          check = false;
        }
      }
      // console.log(check);
      return check;
    };

    if (props.action === `add`) {
      // console.log(checkLength(dataArr));
      if (!checkLength(dataArr)) {
        return toast.error("session data is incomplete");
      } else if (checkMode(s.mode.value)) {
        const newSess = addSession(e, props.service);

        setNewSessions((prevState) => {
          return [...prevState, newSess];
        });
        console.log(newSessions);
        return newSessions;
      } else {
        if (!checkMode(s.mode.value)) {
          return toast.error(
            `${s.mode.value} is not a valid Mode. Please enter "Zoom" or "In-Person" only. (case-sensitive)`
          );
        } else {
          return toast.error("Some other error occured");
        }
      }
    }
    if (props.action === "edit") {
      if (!checkMode(s.mode.value) && s.mode.value.length > 0) {
        return toast.error(
          `${s.mode.value} is not a valid Mode. Please enter "Zoom" or "In-Person" only. (case-sensitive)`
        );
      } else {
        props.onSubmit(e, service);
      }
    }
  };
  const serviceCheck = (service) => {
    if (service.slice(-5) === "Sched") {
      return (
        <>
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
        </>
      );
    } else if (service.slice(-5) === "Calen") {
      return (
        <>
          <input type="text" placeholder="Subject" name="subject" />
          {/* <input type="text" placeholder="dayTime" name="course" /> */}
          <input type="text" placeholder="Mode" name="mode" />
          <input type="datetime-local" placeholder="Date" name="date" />
          {/* <input type="date" placeholder="Date" name="date" /> */}
        </>
      );
    }
  };

  // BUG in timestamp input

  // console.log(serviceCheck(props.service));

  return (
    <>
      <div>
        <h1>EDITOR</h1>
        {props.value ? <h2>{props.value}</h2> : null}
        <form onSubmit={submitHandler} className="form-basic">
          {serviceCheck(props.service)}
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}
