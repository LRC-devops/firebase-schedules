export default function Editor(props) {
  return (
    <div>
      <h1>EDITOR</h1>
      <form onSubmit={props.submitHandler} className="form-basic">
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
