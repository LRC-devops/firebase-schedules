import { doc } from "firebase/firestore";
import { useState } from "react";
import Modal from "../components/Modal";
import TableRow from "../components/TableRow";

export default function Table(props) {
  return props.posts
    ? props.posts.map((post) => (
        <TableRow
          post={post}
          key={doc.id}
          triggerModal={props.triggerModal}
          dataId={doc.id}
        />
      ))
    : null;
}
