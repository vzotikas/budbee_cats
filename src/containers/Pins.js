import { useEffect, useState } from 'react';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from '../components/MasonryLayout';
import Spinner from '../components/Spinner';
import { client } from '../client';

function Pins({ pinsUpdated, setPinsUpdated, pins, setLoading, loading }) {
  // const [pins, setPins] = useState(null);

  return (
    <div>
      {loading ? (
        <Spinner message="Loading cats..." />
      ) : (
        pins && (
          <MasonryLayout
            pins={pins}
            pinsUpdated={pinsUpdated}
            setPinsUpdated={setPinsUpdated}
          />
        )
      )}
      {pins?.length === 0 && (
        <div className="mt-10 text-center text-xl">No cats available!</div>
      )}
    </div>
  );
}

export default Pins;
