export default function Editor(props) {
  let optionUpdate = props.isCancelled;
  const updateOption = () => {
    return !optionUpdate;
  };
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
        {/* FIXME Cant get the select value to update onChange. When I try to useState, it triggers an infinite loop somehow and I get stuck. Does the entire component really need to rerender (must use useState) in order to update the select value? */}
        <select
          name="isCancel"
          defaultValue={optionUpdate}
          onChange={updateOption}
        >
          <option value={true}>Is Cancelled</option>
          <option value={false} selected>
            Is NOT Cancelled
          </option>
        </select>
        <button>Submit</button>
      </form>
    </div>
  );
}
