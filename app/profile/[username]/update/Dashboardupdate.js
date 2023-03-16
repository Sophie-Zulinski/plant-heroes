'use client';
import dateFormat, { masks } from 'dateformat';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProfilePlantsitter(props) {
  const [users, setUser] = useState(props);

  const [district, setDistrict] = useState(props.user.district);

  const [price, setPrice] = useState(1);
  const [plants, setPlants] = useState('1');
  const [experience, setExperience] = useState('1');
  const [startDate, setStartDate] = useState('1111-11-11');
  const [endDate, setEndDate] = useState('1111-11-11');
  const [description, setDescription] = useState('no description');
  const [error, setError] = useState();
  const router = useRouter();
  const [role, setRole] = useState('');
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
      <>
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
          src={props.user.img}
          alt={props.user.username}
        />

        <h2>Update your data:</h2>
      </>

      <label>
        <input
          type="radio"
          name="radio-2"
          value="Plantsitter"
          className="radio radio-primary m-1.5 "
          onClick={handleRole}
        />{' '}
        I have a watering can and want to become a plant hero
      </label>
      {console.log('role', role)}

      <div className="flex flex-row space-x-4">
        <label>
          <input
            type="radio"
            name="radio-2"
            value="Plantowner"
            className="radio radio-primary  m-1.5 "
            onClick={handleRole}
          />
          I have a plant and need a plant hero
        </label>
      </div>
      <div className="divider" />
      <>
        {role === 'Plantsitter' ? (
          <>
            <div>Upload your profile image</div>
            <div className="flex flex-col space-x-4">
              <form
                method="post"
                onChange={handleOnChange}
                onSubmit={handleOnSubmit}
              >
                <p>
                  <input type="file" name="file" />
                </p>

                <img src={imageSrc} alt={imageSrc} />

                {imageSrc && !uploadData && (
                  <p>
                    <button>Upload Files</button>
                  </p>
                )}
                {console.log('imageSrc', imageSrc)}
                {/*{uploadData && (
            <code>
              <pre>{JSON.stringify(uploadData, null, 2)}</pre>
            </code>
          )}*/}
              </form>
              <div className="divider" />
            </div>
            <p>
              District*: {props.user.district}{' '}
              <select name="discrict" onClick={handleDistrict}>
                <option value="1010 Vienna">1010 Vienna</option>
                <option value="1020 Vienna">1020 Vienna</option>
                <option value="1030 Vienna">1030 Vienna</option>
                <option value="1040 Vienna">1040 Vienna</option>
              </select>
            </p>
            <>
              <p>
                Price:{' '}
                <input
                  type="number"
                  min="1"
                  max="30"
                  placeholder={props.user.price}
                  onChange={handlePrice}
                />{' '}
                ,- €
              </p>
              <p>
                Experience:{' '}
                <input
                  type="number"
                  placeholder={props.user.experience}
                  min="1"
                  max="10"
                  onChange={handleExperience}
                />{' '}
                years
              </p>
              <p>
                Description:{' '}
                <input
                  placeholder={props.user.description}
                  onChange={handleDescription}
                />
              </p>
            </>
          </>
        ) : (
          ''
        )}
        {role === 'Plantowner' ? (
          <>
            {' '}
            <div>Upload a picture of your favourite plant</div>
            <div className="flex flex-col space-x-4">
              <form
                method="post"
                onChange={handleOnChange}
                onSubmit={handleOnSubmit}
              >
                <p>
                  <input type="file" name="file" />
                </p>

                <img src={imageSrc} alt={imageSrc} />

                {imageSrc && !uploadData && (
                  <p>
                    <button>Upload Files</button>
                  </p>
                )}
                {console.log('imageSrc', imageSrc)}
                {/*{uploadData && (
            <code>
              <pre>{JSON.stringify(uploadData, null, 2)}</pre>
            </code>
          )}*/}
              </form>
              <div className="divider" />
            </div>
            <p>
              District*: {props.user.district}{' '}
              <select name="discrict" onClick={handleDistrict}>
                <option value="1010 Vienna">1010 Vienna</option>
                <option value="1020 Vienna">1020 Vienna</option>
                <option value="1030 Vienna">1030 Vienna</option>
                <option value="1040 Vienna">1040 Vienna</option>
              </select>
            </p>
            <p>
              Plants:{' '}
              <input
                type="number"
                min="1"
                max="30"
                placeholder={props.user.plants}
                onChange={handlePlants}
              />{' '}
              plants
            </p>
            <p>
              Price:{' '}
              <input
                type="number"
                min="1"
                max="30"
                placeholder={props.user.price}
                onChange={handlePrice}
              />{' '}
              ,- €
            </p>
            <p>
              Description:{' '}
              <input
                placeholder={props.user.description}
                onChange={handleDescription}
              />
            </p>
          </>
        ) : (
          ''
        )}

        <a
          className="bg-primary rounded-lg p-3"
          onClick={async () => {
            const response = await fetch(`/api/users/${props.user.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: props.user.username,
                district: district,
                price: price,
                experience: experience,
                description: description,
                plants: plants,
                role: role,
                startDate: startDate,
                endDate: endDate,
                img: imageSrc ? imageSrc : props.user.img,
              }),
            });
            console.log('PROPS', props.user.id);
            console.log('response', response);
            const data = await response.json();
            console.log('data', data);
            if (data.error) {
              setError(data.error);
              return;
            }

            router.refresh();

            setUser([data.user]);
          }}
          href={`/profile/${props.user.username}`}
        >
          Update Profile
        </a>
      </>
    </>
  );
}
