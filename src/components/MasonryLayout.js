import Masonry from 'react-masonry-css';
import Pin from './Pin';

const breakpointObj = {
  default: 5,
  3000: 5,
  2000: 4,
  1200: 3,
  1000: 2,
  500: 1,
};

console.log();

function MasonryLayout({ pins }) {
  return (
    <Masonry className="flex" breakpointCols={breakpointObj}>
      {pins?.map((pin) => (
        <Pin key={pin._id} pin={pin} />
      ))}
    </Masonry>
  );
}

export default MasonryLayout;
