import { useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { FiEdit3 } from 'react-icons/fi';
import { client, urlFor } from '../client';
import ModalWindow from './ModalWindow';

function Pin({ pin, setPinsUpdated }) {
  const [postHovered, setPostHovered] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const deletePin = async (id) => {
    await client.delete(id).then(() => {
      setPinsUpdated(true);
    });
  };

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="m-4">
      <div className="items-start justify-center">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-mainColor rounded-lg blur opacity-10 group-hover:opacity-30 transition duration-500 group-hover:duration-500 animate-tilt"></div>
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
      <ModalWindow
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        pin={pin}
        usage="edit"
      />
    </div>
  );
}

export default Pin;
