import { db } from "../lib/firebase";
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

  async function getData() {
    const tableDataOut = [];
    const tableGen = (doc) => {
      const dataIn = doc.data();

      tableDataOut.push({
        host: dataIn.host,
        course: dataIn.course,
        dayTime: dataIn.dayTime,
        mode: dataIn.mode,
        docId: dataIn.docId,
      });
      return tableDataOut;
    };

    console.log("tableDataOut", tableDataOut);
    await db
      .collection("agSched")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          tableGen(doc);
        });
      });
    return {
      props: tableDataOut,
    };
  }
  let dataOutputTable = {};
  const dataOutput = db
    .collection("agSched")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        dataOutputTable = `<tr key={doc.id}>
        <td>{doc.data().host}</td>
        <td>{doc.data().dayTime}</td>
        <td>{doc.data().course}</td>
        <td>{doc.data().mode}</td>
      </tr>`;
      });
    });

  console.log(dataOutputTable);
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
        <tbody>
          {/* {tableDataOut.map((s) => (
            <tr key={s.docId}>
              <td>{s.host}</td>
              <td>{s.course}</td>
              <td>{s.dayTime}</td>
              <td>{s.mode}</td>
            </tr>
          ))} */}
          {/* {tableDataOut[0].host} */}
        </tbody>
      </table>
    </>
  );
};

export default SimpleTable;
