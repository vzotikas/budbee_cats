import Pins from './Pins';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import { feedQuery, searchQuery } from '../utils/data';
import { client } from '../client';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortTerm, setSortTerm] = useState('');
  const [pins, setPins] = useState(null);
  const [pinsUpdated, setPinsUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setPins(data?.sort((a, b) => (a[sortTerm] > b[sortTerm] ? 1 : -1)));
        setPinsUpdated(false);
        setLoading(false);
      });
    }
  }, [searchTerm, sortTerm, pinsUpdated]);

  return (
    <>
      <Navbar
        className="sticky top-0 "
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortTerm={sortTerm}
        setSortTerm={setSortTerm}
        pins={pins}
        setPins={setPins}
        pinsUpdated={pinsUpdated}
        setPinsUpdated={setPinsUpdated}
      />
      <Pins
        className="relative"
        sortTerm={sortTerm}
        searchTerm={searchTerm}
        pins={pins}
        setPins={setPins}
        pinsUpdated={pinsUpdated}
        setPinsUpdated={setPinsUpdated}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
}

export default Home;
