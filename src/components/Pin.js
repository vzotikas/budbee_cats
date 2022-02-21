import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash } from 'react-icons/fi';
import { FiEdit3 } from 'react-icons/fi';

import { client, urlFor } from '../client';
import EditPinModal from './EditPinModal';

function Pin({ pin }) {
  const [postHovered, setPostHovered] = useState(false);

  const navigate = useNavigate();

  const deletePin = async (id) => {
    await client.delete(id).then(() => {
      navigate(`/`);
    });
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="m-4">
      <div className="items-start justify-center">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-mainColor rounded-lg blur opacity-10 group-hover:opacity-30 transition duration-500 group-hover:duration-500 animate-tilt"></div>
          {/* <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-500 group-hover:duration-500 animate-tilt"></div> */}
          <div
            onMouseEnter={() => setPostHovered(true)}
            onMouseLeave={() => setPostHovered(false)}
            className=" bg-white p-2 relative cursor-pointer w-auto rounded-lg overflow-hidden"
          >
            <img
              className="w-full"
              alt="cat-pin"
              src={urlFor(pin.image).width(250).url()}
            />

            {postHovered && (
              <div
                className="flex flex-row justify-between"
                style={{ height: '100%' }}
              >
                {/* <a
                  onClick={(e) => e.stopPropagation()}
                  href={`${image?.asset?.url}?dl=`}
                  download
                  className="absolute top-2 left-2"
                >
                  <MdDownloadForOffline className="bg-green w-8 h-8 opacity-70 hover:opacity-100 text-white font-bold px-1 py-1 text-base rounded-3xl hover:shadow-md outline-none" />
                </a> */}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(pin._id);
                  }}
                  className="absolute top-4 left-4"
                >
                  <FiTrash className="bg-red-500 w-8 h-8 opacity-70 hover:opacity-100 text-white font-bold px-1 py-1 text-base rounded-3xl hover:shadow-md outline-none" />
                </button>
                <button
                  className="absolute top-4 right-4"
                  type="button"
                  onClick={(e) => {
                    // e.stopPropagation();
                    openModal();
                  }}
                >
                  <FiEdit3 className="bg-black w-8 h-8 opacity-70 hover:opacity-100 text-white font-bold px-1 py-1 text-base rounded-3xl hover:shadow-md outline-none" />
                </button>
              </div>
            )}
            <div className="flex flex-col gap-2 mt-2 items-left p-5">
              <div>
                <span className="font-semibold text-green">Name: </span>
                {pin.name}
              </div>
              <div>
                <span className="font-semibold text-green">Breed: </span>
                {pin.breed}
              </div>
              <div>
                <span className="font-semibold text-green">Birthday: </span>
                {pin.date}
              </div>
              <div className="font-semibold text-green">Details:</div>
              <div>{pin.details}</div>
            </div>
          </div>
        </div>
      </div>
      <EditPinModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} pin={pin} />
    </div>
  );
}

export default Pin;
