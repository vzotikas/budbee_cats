export const feedQuery = `*[_type == 'pin'] {
  image{
    asset->{
      url
    }
  },
      _id,
      name,
      details,
      breed,
      date,
    }`;

export const searchQuery = (searchTerm) => {
  const query = `*[_type == 'pin' && name match '${searchTerm}*' || breed match '${searchTerm}*' || details match '${searchTerm}*'] {
        image{
          asset->{
            url
          }
        },
            _id,
            name,
            details,
            breed,
            date,
          }`;
  return query;
};
