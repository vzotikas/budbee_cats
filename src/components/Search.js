import { useEffect, useState } from 'react';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

function Search({ searchTerm }) {
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
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  });

  return (
    <div>
      {loading ?? <Spinner message="Searching for cats..." />}
      {pins && <MasonryLayout pins={pins} />}

      {pins?.length === 0 && searchTerm !== '' && (
        <div className="mt-10 text-center text-xl">No cats found!</div>
      )}
    </div>
  );
}
export default Search;
