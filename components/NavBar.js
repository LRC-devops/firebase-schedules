import Link from "next/link";

export default function NavBar() {
  const user = true;

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn btn-logo">LRC</button>
          </Link>
        </li>

        {user && (
          <>
            <li>
              <Link href="/admin">
                <button className="btn btn-login">Edit Schedules</button>
              </Link>
            </li>
          </>
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
