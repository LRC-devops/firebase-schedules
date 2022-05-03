import { firestore, db } from "../lib/firebase";

export default function Editor(props) {
  // if (props.value) {
  //   console.log("props.value", true);
  // } else {
  //   console.log("props.value", false);
  // }

  // console.log(db.collection("agSched").doc(props.value).data());

  // console.log("props.value", props.value);
  return (
    <div>
      <h1>EDITOR</h1>
      {props.value ? <h2>{props.value}</h2> : null}
      <form onSubmit={props.onSubmit} className="form-basic">
        {/* <label htmlFor="course">Course</label> */}
        <input type="text" placeholder="Subject" name="subject" />
        <input type="text" placeholder="Course" name="course" />
        <input type="text" placeholder="Day/Time" name="dayTime" />
        <input type="text" placeholder="host" name="host" />
        <input type="text" placeholder="link" name="link" />
        <input type="text" placeholder="mode" name="mode" />
        <select name="isCancel" value={props.value}>
          <option value={true}>Is Cancelled</option>
          <option value={false}>Is Not Cancelled</option>
        </select>
        <button>Submit</button>
      </form>
    </div>
  );
}
