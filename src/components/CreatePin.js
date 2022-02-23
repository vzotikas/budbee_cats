import { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FiTrash } from 'react-icons/fi';
import { client } from '../client';
import Spinner from './Spinner';
import { FileUploader } from 'react-drag-drop-files';

function CreatePin({ closeModal, setPinsUpdated }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [details, setDetails] = useState('');
  const [breed, setBreed] = useState('');
  const [fields, setFields] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileTypes = ['JPEG', 'JPG', 'PNG', 'GIF'];

  const handleChange = async (file) => {
    const { type, name } = file[0];
    setLoading(true);
    await client.assets
      .upload('image', file[0], {
        contentType: type,
        filename: name,
      })
      .then((document) => {
        setImage(document);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Image upload error ', error);
      });
  };

  const savePin = () => {
    if (name && breed && details && date && image?._id) {
      const doc = {
        _type: 'pins',
        name,
        breed,
        details,
        date,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: image?._id,
          },
        },
      };
      client.create(doc).then(() => {
        setPinsUpdated(true);
        closeModal();
      });
    } else {
      setFields(true);
      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col rounded-3xl bg-mainColor justify-center items-center w-full">
      <div className="flex flex-col mt-2 justify-center items-center bg-mainColor border-2 border-dotted border-gray-300 w-3/4 h-40">
        {loading && <Spinner />}
        {!image ? (
          <FileUploader
            multiple={true}
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            type="file"
            hoverTitle="."
            children={
              <div className="flex flex-col justify-center items-center w-full h-full">
                <p className="flex justify-center items-center font-bold text-2xl text-white ">
                  <AiOutlineCloudUpload />
                </p>
                <p className="text-center flex text-lg text-white p-2">
                  Click to add or drag and drop an image here
                </p>
              </div>
            }
          />
        ) : (
          <div className="relative h-full">
            <img src={image?.url} alt="catphoto" className="h-full w-full" />
            <button
              type="button"
              className=" absolute bottom-2 right-2 p-1 rounded-full text-white bg-red-500 text-xl cursor-pointer outline-none hover:bg-white hover:text-black transition-all duration-500 ease-in-out"
              onClick={() => setImage(null)}
            >
              <FiTrash className="w-4 h-4 flex items-center" />
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col mt-5 text-white bg-mainColor w-full ">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add the cat's name"
          className="outline-none bg-mainColor text-green sm:text-lg border-b-2 border-gray-800 p-2"
        />
        <input
          type="text"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          placeholder="Add the cat's breed"
          className="outline-none bg-mainColor text-green text-base sm:text-lg border-b-2 border-gray-800 p-2"
        />
        <p className="outline-none bg-mainColor text-base sm:text-lg  p-2 text-gray-400">
          When was the cat born
        </p>
        <input
          type="date"
          vlaue={date}
          style={{ color: 'white', colorScheme: 'dark' }}
          onChange={(e) => setDate(e.target.value)}
          placeholder="When was the cat born"
          className="outline-none bg-mainColor text-green text-base sm:text-lg border-b-2 border-gray-800 p-2"
        />
        <input
          type="text"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Add some details"
          className="outline-none bg-mainColor text-green text-base sm:text-lg border-b-2 border-gray-800 p-2"
        />
        <div className="flex flex-row justify-end items-center mt-5">
          {fields && (
            <p className="text-green justify-start items-center pr-2 text-xl transition-all duration-150 ease-in">
              Please fill in all the fields.
            </p>
          )}
          <button
            type="button"
            onClick={savePin}
            className="bg-red-500 text-white cursor-pointer font-bold p-2 rounded-full w-28 outline-none hover:bg-white hover:text-black transition-all duration-500 ease-in-out"
          >
            Save Pin
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePin;
