import { addSession, useEditSession } from "../lib/hooks";
import { SessionsContext } from "../lib/context";
import { useContext, useReducer, useState } from "react";
import toast from "react-hot-toast";
import { FormInput, FormButton } from "./FormComponents";
import GlassCard from "../components/GlassCard";

export default function Editor(props) {
  const { setNewSessions, newSessions } = useContext(SessionsContext);
  const { service, serviceType, sessionRef } = props;

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
      return check;
    };

    if (props.action === `add`) {
      if (!checkLength(dataArr)) {
        return toast.error("session data is incomplete");
      } else if (checkMode(s.mode.value)) {
        const newSess = addSession(e, service, serviceType);

        setNewSessions((prevState) => {
          return [...prevState, newSess];
        });
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
        props.onClose();
      }
    }
  };

  return (
    <>
      <GlassCard>
        <div>
          <h1>{props.action} sessions</h1>
          {props.value ? <h2>{props.value}</h2> : null}
          <form onSubmit={submitHandler} className="form-basic">
            {serviceType === "sched" && (
              <>
                <FormInput
                  type="text"
                  placeholder={
                    props.action === "edit"
                      ? `${sessionRef.subject}`
                      : "Subject"
                  }
                  name="subject"
                />
                <FormInput
                  type="text"
                  placeholder={sessionRef ? `${sessionRef.course}` : "Course"}
                  name="course"
                />
                <FormInput
                  type="text"
                  placeholder={
                    sessionRef ? `${sessionRef.dayTime}` : "Day/Time"
                  }
                  name="dayTime"
                />
                <FormInput
                  type="text"
                  placeholder={sessionRef ? `${sessionRef.host}` : "Host"}
                  name="host"
                />
                <FormInput
                  type="text"
                  placeholder={sessionRef ? `${sessionRef.link}` : "Link"}
                  name="link"
                />
                <FormInput
                  type="text"
                  placeholder={sessionRef ? `${sessionRef.mode}` : "Mode"}
                  name="mode"
                />
              </>
            )}{" "}
            {serviceType === "calendar" && (
              <>
                <FormInput
                  type="text"
                  placeholder={sessionRef ? `${sessionRef.subject}` : "Subject"}
                  name="subject"
                />
                <FormInput
                  type="text"
                  placeholder={sessionRef ? `${sessionRef.mode}` : "Mode"}
                  name="mode"
                />
                <FormInput
                  type="datetime-local"
                  placeholder={sessionRef ? `${sessionRef.date}` : "date"}
                  name="date"
                />
              </>
            )}
            <FormButton>Submit</FormButton>
          </form>
        </div>
      </GlassCard>
    </>
  );
}
