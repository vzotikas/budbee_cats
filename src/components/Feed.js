import { useEffect, useState } from 'react';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { client } from '../client';

function Feed({ sortTerm, searchTerm }) {
  const [pins, setPins] = useState(null);
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
        setPins(data?.sort((a, b) => (a[sortTerm] > b[sortTerm] ? 1 : -1)));
        setLoading(false);
      });
    }
  }, [searchTerm, sortTerm]);

  return (
    <div>
      {loading && <Spinner message="Loading cats..." />}
      {pins && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && (
        <div className="mt-10 text-center text-xl">No cats available!</div>
      )}
    </div>
  );
}

export default Feed;
