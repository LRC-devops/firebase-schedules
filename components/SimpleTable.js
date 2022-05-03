import { db, sessionToJSON } from "../lib/firebase";
import { useCallback } from "react";

const SimpleTable = () => {
  // const dataOut = [];
  // const dataMap = (doc) => {
  //   dataOut.push(
  //     <tr>
  //       <td>{doc.host}</td>
  //       <td>{doc.course}</td>
  //       <td>{doc.dayTime}</td>
  //       <td>{doc.mode}</td>
  //     </tr>
  //   );
  //   return dataOut;
  // };
  // db.collection("agSched")
  //   .get()
  //   .then((snapshot) => {
  //     snapshot.docs.forEach((doc) => {
  //       dataMap(doc);
  //       // console.log(doc);
  //     });
  //   });

  // const tableRows = [];

  // const tableRowGenFn = (doc) => {
  //   tableRows.push(
  //     <tr key={doc.id}>
  //       <td>{doc.data().host}</td>
  //     </tr>
  //   );
  // };

  // async function getData() {
  //   const tableDataOut = [];
  //   const tableGen = (doc) => {
  //     const dataIn = doc.data();

  //     tableDataOut.push({
  //       host: dataIn.host,
  //       course: dataIn.course,
  //       dayTime: dataIn.dayTime,
  //       mode: dataIn.mode,
  //       docId: dataIn.docId,
  //     });
  //     return tableDataOut;
  //   };

  //   console.log("tableDataOut", tableDataOut);
  //   await db
  //     .collection("agSched")
  //     .get()
  //     .then((snapshot) => {
  //       snapshot.docs.forEach((doc) => {
  //         tableGen(doc);
  //       });
  //     });
  //   return {
  //     props: tableDataOut,
  //   };
  // }
  // const tableData = [];
  // const dataGen = (doc) => {
  //   tableData.push(
  //     `<tr key={${doc.id}}>
  //       <td>{${doc.data().host}}</td>
  //       <td>{${doc.data().dayTime}}</td>
  //       <td>{${doc.data().course}}</td>
  //       <td>{${doc.data().mode}}</td>
  //     </tr>`
  //   );
  // };
  // let dataOutputTable = {};
  // const dataOutput = db
  //   .collection("agSched")
  //   .get()
  //   .then((snapshot) => {
  //     snapshot.docs.forEach((doc) => {
  //       dataGen(doc);
  //     });
  //   });

  // BUG no DOM manipulation available???
  // const tableBody = document.querySelector("#table-body");

  // const renderTable = (doc) => {
  //   let tr = document.createElement("tr");
  //   let host = document.createElement("td");
  //   let dayTime = document.createElement("td");
  //   let course = document.createElement("td");
  //   let mode = document.createElement("td");

  //   tr.setAttribute("data-id", doc.id);

  //   host.textContent = doc.data().host;
  //   dayTime.textContent = doc.data().dayTime;
  //   course.textContent = doc.data().course;
  //   mode.textContent = doc.data().mode;

  //   tr.appendChild(host);
  //   tr.appendChild(dayTime);
  //   tr.appendChild(course);
  //   tr.appendChild(mode);

  //   tableBody.appendChild(tr);
  // };

  // db.collection("agSched")
  //   .get()
  //   .then((snapshot) => {
  //     snapshot.docs.forEach((doc) => {
  //       renderTable(doc);
  //     });
  //   });

  async function getDataFromServer(context) {
    const postsQuery = db.collection("agSched").orderBy("createdAt", "desc");
    // return postsQuery;
    const posts = (await postsQuery.get()).docs.map(sessionToJSON);
    // const docIds = {await postsQuery.get(doc.id)}
    return {
      props: { posts },
    };
  }

  // console.log("dataOutputTable", dataOutputTable);
  // console.log("tableData", tableData);
  // console.log("tableData[0]", tableData[0]);
  // console.log(dataOutputTable[0]);

  // console.log("tableRows", tableRows);
  // console.log("before for each statement");
  // tableDataOut.forEach((s) => {
  //   console.log("for each tableDataOut", s);
  // });

  // console.log("tableDataOut[0]", tableDataOut.course);
  return (
    <>
      {/* <p>{tableDataOut}</p> */}

      {/* {tableDataOut.forEach((s) => {
        <p>s.host</p>;
      })} */}
      <h1>Table Data</h1>
      <table>
        <tbody id="table-body"></tbody>
      </table>
    </>
  );
};

export default SimpleTable;
