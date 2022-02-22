import { IoMdCloseCircleOutline } from 'react-icons/io';
import Modal from 'react-modal';
import EditPin from './EditPin';
import CreatePin from './CreatePin';

function ModalWindow({ modalIsOpen, setIsOpen, pin, usage }) {
  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      background: '#1d1d1d',
      width: '50rem',
      maxWidth: 'calc(100vw - 2rem)',
      maxHeight: 'calc(100vh - 2rem)',
      boxShadow: '0 0 30px 0 rgba(0, 0, 0, 0.25)',
      border: 'none',
      position: 'relative',
    },
    overlay: {
      position: 'fixed',
      zIndex: 10000,
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(70, 70, 70, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  return (
    <Modal
      style={customStyles}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="bg-mainColor border-4 rounded-3xl border-gray-300 mt-36 m-10 p-4 "
      contentLabel="Add / Edit Cats"
    >
      <button
        onClick={closeModal}
        type="button"
        className="p-1 w-6 h-6 bg-green rounded-full cursor-pointer outline-none hover:shadow-md hover:bg-white transition-all duration-500 ease-in-out"
      >
        <IoMdCloseCircleOutline className="text-white align-middle rounded-full hover:text-black transition-all duration-500 ease-in-out" />
      </button>
      {usage === 'edit' ? (
        <EditPin closeModal={closeModal} pin={pin} />
      ) : (
        <CreatePin closeModal={closeModal} pin={pin} />
      )}
    </Modal>
  );
}

export default ModalWindow;
