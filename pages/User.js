import UiCard from "../components/UiCard";
import ScheduleBtns from "../components/ScheduleBtns";
import Table from "../components/Table";
import { SessionContext } from "../lib/context";
import { useContext, useState } from "react";

const User = (props) => {
  const btnClickHandler = (e) => {
    const btnName = e.target.innerHTML;
  };
  // const {}useContext(SessionContext)
  const posts = props.posts;
  return (
    <main>
      <div className="flex-col">
        <div className="flex">
          <div className="table--box">
            <h1>Guided Study Groups</h1>
            <div>
              <UiCard />
              <ScheduleBtns posts={posts} btnClickHandler={btnClickHandler} />
              {/* <Table key={String(Math.random())} posts={posts} /> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default User;
