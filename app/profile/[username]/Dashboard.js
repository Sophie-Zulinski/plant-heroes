'use client';
import dateFormat, { masks } from 'dateformat';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProfilePlantsitter(props) {
  const [users, setUser] = useState(props);

  const [district, setDistrict] = useState(props.user.district);

  const [price, setPrice] = useState(0);
  const [plants, setPlants] = useState('0');
  const [experience, setExperience] = useState('0');
  const [startDate, setStartDate] = useState('1111-11-11');
  const [endDate, setEndDate] = useState('1111-11-11');
  const [description, setDescription] = useState('-');
  const [error, setError] = useState();
  const router = useRouter();
  const [role, setRole] = useState(props.user.role);
  function handleRole(x) {
    setRole(x.target.value);
  }

  function handleDistrict(x) {
    setDistrict(x.target.value);
  }

  function handlePrice(x) {
    setPrice(parseInt(x.target.value));
  }

  function handleExperience(x) {
    setExperience(x.target.value);
  }

  function handleDescription(x) {
    setDescription(x.target.value);
  }
  function handleStartDate(x) {
    setStartDate(x.target.value);
  }

  function handleEndDate(x) {
    setEndDate(x.target.value);
  }

  function handlePlants(x) {
    setPlants(x.target.value);
  }

  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file',
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'my-uploads');

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/dtz9u2nae/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    ).then((r) => r.json());

    setImageSrc(data.secure_url);

    setUploadData(data);
  }

  return (
    <>
      <img
        className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
        src={props.user.img}
        alt={props.user.username}
      />

      <h1> Welcome to Plant Heroes, {props.user.username}!</h1>
      <h2>Your current data: </h2>
      <p>Role: {props.user.role} </p>
      <p>District: {props.user.district} </p>
      <p>Price: {props.user.price},- € </p>
      <p>Experience: {props.user.experience} years </p>

      {role === 'Plantowner' ? <p>Plants: {props.user.plants} plants </p> : ''}
      <p>Description: {props.user.description} </p>

      <a
        className="bg-primary rounded-lg p-3"
        href={`/profile/${props.user.username}/update`}
      >
        Change profile infos
      </a>
    </>
  );
}
