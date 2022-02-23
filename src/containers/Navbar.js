import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import logo from '../images/logo.png';
import Modal from 'react-modal';
import ModalWindow from '../components/ModalWindow';

Modal.setAppElement('#root');

function Navbar({ searchTerm, setSearchTerm, setSortTerm }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="sticky top-0 items-center flex justify-center z-50 bg-mainColor">
      <div className="flex w-full flex-col md:flex-row items-center justify-between h-hull">
        <div className="flex p-4 ">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="flex items-center w-40 m-2 "
              onClick={() => window.location.reload(false)}
              // onClick={(() => setSearchTerm(''), window.location.reload(false))}
            />
          </Link>
        </div>
        <div className="flex flex-row items-center justify-end p-2">
          <div
            className=" flex flex-row px-2 rounded-md text-green"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            <div className="flex p-1 items-center ">Sort by</div>
            <select
              className="p-1 items-center rounded-md text-green  "
              onChange={(e) => setSortTerm(e.target.value)}
            >
              <option value="">None</option>
              <option value="name">Name</option>
              <option value="breed">Breed</option>
            </select>
          </div>
          <div className="flex items-center px-2 rounded-md bg-white border-none">
            <IoMdSearch fontSize={21} />
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              value={searchTerm}
              className="p-1 w-full bg-white outline-none"
            ></input>
          </div>
          <div className="flex px-2">
            <button
              onClick={(e) => {
                openModal();
              }}
              className="bg-green text-white hover:bg-white hover:text-green rounded-lg w-8 h-8 flex justify-center items-center transition-all duration-500 ease-in-out"
            >
              <IoMdAdd />
            </button>
            <ModalWindow
              modalIsOpen={modalIsOpen}
              setIsOpen={setIsOpen}
              usage="create"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
