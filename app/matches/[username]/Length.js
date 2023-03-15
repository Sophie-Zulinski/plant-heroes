'use client';
import dateFormat, { masks } from 'dateformat';
import Image from 'next/image';
import Link from 'next/link';

export default function Length(props) {
  const usersrole = props.users.filter((user) => user.role !== props.user.role);

  const usersdistrict = usersrole.filter(
    (user) => user.district === props.user.district,
  );

  const length = usersdistrict.length;
  console.log('props.user.role)', props.user.role);
  console.log('usersrole', usersrole);
  console.log('usersdistrict', usersdistrict.length);
  console.log('length', length);
  return <div>{usersrole.length}</div>;
}
