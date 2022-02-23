export const feedQuery = `*[_type == "pins"] {
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
  const query = `*[_type == "pins" && name match '${searchTerm}*' || breed match '${searchTerm}*' || details match '${searchTerm}*'] {
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
