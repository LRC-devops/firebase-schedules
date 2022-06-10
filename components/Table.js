import { doc } from "firebase/firestore";
import TableRow from "../components/TableRow";

export default function Table(props) {
  const { posts, action } = props;

  // console.log(posts);

  if (action === "filteredAgSched") {
    return (
      <table key={String(Math.random())}>
        {posts.map((session) => (
          <tbody key={String(Math.random())}>
            <tr key={session.course}>
              <th colSpan={3}>{session[0].course}</th>
            </tr>
            {session.map((post) => (
              <TableRow
                key={doc.id}
                post={post}
                triggerModal={props.triggerModal}
                dataId={doc.id}
                isDeleted={props.isDeleted}
                triggerEdit={props.triggerEdit}
                radioHandler={props.radioHandler}
                action={action}
              />
            ))}
          </tbody>
        ))}
      </table>
    );
  } else {
    return posts.map((post) => (
      <TableRow
        key={doc.id}
        post={post}
        triggerModal={props.triggerModal}
        dataId={doc.id}
        isDeleted={props.isDeleted}
        triggerEdit={props.triggerEdit}
        radioHandler={props.radioHandler}
        action={props.action}
      />
    ));
  }
}
