export default function Length(props) {
  const usersdistrict = props.users.filter(
    (user) => user.district === props.user.district,
  );

  const usersrole = usersdistrict.filter(
    (user) => user.role !== props.user.role,
  );

  return <div>{usersrole.length}</div>;
}
