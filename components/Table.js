import { doc } from "firebase/firestore";
// import { useState } from "react";
// import Modal from "../components/Modal";
import TableRow from "../components/TableRow";

export default function Table(props) {
<<<<<<< HEAD
  const { action } = props;

  console.log(props.posts);
  const posts = props.posts;

  console.log(posts);
  const mapped = posts.map((session) => console.log(session.course));

  // return mapped;

  // if (action === "filteredAgSched") {
  //   return (
  //     <table key={String(Math.random())}>
  //       {posts.map((session) => (
  //         <tbody key={String(Math.random())}>
  //           <tr key={session.course}>
  //             <th colSpan={3}>{session[0].course}</th>
  //           </tr>
  //           {session.map((post) => (
  //             <TableRow
  //               key={doc.id}
  //               post={post}
  //               triggerModal={props.triggerModal}
  //               dataId={doc.id}
  //               isDeleted={props.isDeleted}
  //               triggerEdit={props.triggerEdit}
  //               radioHandler={props.radioHandler}
  //               action={action}
  //             />
  //           ))}
  //         </tbody>
  //       ))}
  //     </table>
  //   );
  // } else {
  //   return posts.map((post) => (
  //     <TableRow
  //       key={doc.id}
  //       post={post}
  //       triggerModal={props.triggerModal}
  //       dataId={doc.id}
  //       isDeleted={props.isDeleted}
  //       triggerEdit={props.triggerEdit}
  //       radioHandler={props.radioHandler}
  //       action={props.action}
  //     />
  //   ));
  // }
=======
  const { posts, action } = props;

  // return mapped;

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
>>>>>>> parent of e983a67 (clean up hooks and page naming for test deploy)
}
