import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function NavBar() {
  const { user } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn btn-logo">LRC</button>
          </Link>
        </li>

        {user && (
          <div className="push-left">
            <li>
              <Link href="/enter">
                {/* <button className="btn btn-login">Profile</button> */}
                <img src={user?.photoURL || "/hacker/png"} alt="user photo" />
              </Link>
            </li>
            {/* <li>
              <Link href="/enter">
                <button className="btn btn-login">Sign Out</button>
              </Link>
            </li> */}
          </div>
        )}

        {!user && (
          <li>
            <Link href="/enter">
              <button className="btn btn-login">Admin log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
