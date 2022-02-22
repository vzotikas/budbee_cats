import { useState } from 'react';
import Feed from '../components/Feed';
import Navbar from '../components/Navbar';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortTerm, setSortTerm] = useState('name');

  return (
    <div className="flex flex-col h-screen overflow-auto">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortTerm={sortTerm}
        setSortTerm={setSortTerm}
      />
      <Feed sortTerm={sortTerm} searchTerm={searchTerm} />
    </div>
  );
}

export default Home;
