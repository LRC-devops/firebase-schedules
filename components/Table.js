import { doc } from "firebase/firestore";
import { useState } from "react";
import Modal from "../components/Modal";
import TableRow from "../components/TableRow";

export default function Table(props) {
  // return props.posts
  //   ? props.posts.map((post) => (
  //       <TableRow
  //         post={post}
  //         key={doc.id}
  //         triggerModal={props.triggerModal}
  //         dataId={doc.id}
  //         isDeleted={props.isDeleted}
  //         triggerEdit={props.triggerEdit}
  //         radioHandler={props.radioHandler}
  //       />
  //     ))
  //   : null;

  return (
    <table key={String(Math.random())}>
      <tbody key={String(Math.random())}>
        {props.posts.map((post) => (
          <TableRow
            key={doc.id}
            post={post}
            triggerModal={props.triggerModal}
            dataId={doc.id}
            isDeleted={props.isDeleted}
            triggerEdit={props.triggerEdit}
            radioHandler={props.radioHandler}
          />
        ))}
      </tbody>
    </table>
  );
}
