import { Rings } from 'react-loader-spinner';

function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full ">
      <Rings color="#59c0a1" height={50} width={50} className="m-5" />
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;
