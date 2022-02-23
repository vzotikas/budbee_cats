import { useEffect, useState } from 'react';
import Pins from './Pins';
import Navbar from './Navbar';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortTerm, setSortTerm] = useState('');
  const [pin, setPin] = useState(null);
  const [pins, setPins] = useState(null);
  document.cookie = 'SameSite';
  return (
    <>
      <Navbar
        className="sticky top-0 "
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortTerm={sortTerm}
        setSortTerm={setSortTerm}
        pin={pin}
        setPin={setPin}
      />
      <Pins
        className="relative"
        sortTerm={sortTerm}
        searchTerm={searchTerm}
        pin={pin}
        setPin={setPin}
        pins={pins}
        setPins={setPins}
      />
    </>
  );
}

export default Home;
