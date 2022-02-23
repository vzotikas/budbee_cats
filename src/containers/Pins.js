import { useEffect, useState } from 'react';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from '../components/MasonryLayout';
import Spinner from '../components/Spinner';
import { client } from '../client';

function Feed({ sortTerm, searchTerm, pin, setPin, pins, setPins }) {
  // const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);
  document.cookie = 'SameSite';

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
        client.listen(feedQuery).subscribe((update) => {
          const pin = update.result;
          setPin(pin);
          console.log('------');
          console.log(pin);
          console.log('------');
          console.log(`${pin.name} commented: ${pin.breed}`);
        });
        setLoading(false);
      });
    }
    console.log('reloaded');
  }, [searchTerm, sortTerm, pin]);

  return (
    <div>
      {loading ? (
        <Spinner message="Loading cats..." />
      ) : (
        pins && <MasonryLayout pins={pins} />
      )}
      {/* // {pins?.length === 0 && ( */}
      {/* // <div className="mt-10 text-center text-xl">No cats available!</div> */}
      {/* // )} */}
    </div>
  );
}

export default Feed;
