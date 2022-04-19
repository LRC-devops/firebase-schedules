export default function Table({ posts }) {
  return posts
    ? posts.map((post) => <TableRow post={post} key={Math.random()} />)
    : null;
}

function TableRow({ post }) {
  return (
    <tr key={post.key}>
      <td>{post.host}</td>
      <td>{post.dayTime}</td>
      <td>{post.mode}</td>
    </tr>
  );
}
