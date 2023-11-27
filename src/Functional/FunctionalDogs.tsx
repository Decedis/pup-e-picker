import { useEffect, useState } from "react";
import { DogCard } from "../Shared/DogCard";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import { Requests } from "../api";

// Right now these dogs are constant, but in reality we should be getting these from our server

export const FunctionalDogs = (): JSX.Element => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  useEffect(() => {
    Requests.getAllDogs().then((dogs) => {
      return setDogs(dogs);
    });
  }, []);

  return dogs.length > 0 ? (
    <>
      {dogs.map((dog) => {
        return (
          <DogCard
            dog={{
              id: dog.id,
              image: dog.image,
              description: dog.description,
              isFavorite: dog.isFavorite,
              name: dog.name,
            }}
            key={dog.id}
            onTrashIconClick={() => {
              alert("clicked trash");
            }}
            onHeartClick={() => {
              alert("clicked heart");
            }}
            onEmptyHeartClick={() => {
              alert("clicked empty heart");
            }}
            isLoading={false}
          />
        );
      })}
    </>
  ) : (
    <h1>Loading...</h1>
  );
};
