import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h2>no pets found</h2>
      ) : (
        <div>
          {pets.map((pet) => (
            <Pet
              name={pet.name}
              animal={pet.animal}
              breed={pet.breed}
              images={pet.images}
              location={`${pet.city}, ${pet.state}`}
              id={pet.id}
              key={pet.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Results;
