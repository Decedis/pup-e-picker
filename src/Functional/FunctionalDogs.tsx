import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";
import { useEffect } from "react";

export const FunctionalDogs = ({
  dogs,
  handleDogs,
  deleteDog,
  favoriteDog,
  unFavoriteDog,
  isLoading,
  loadingHandler,
}: {
  dogs: Dog[];
  handleDogs: (input: Dog[]) => void;
  deleteDog: (input: number) => void;
  favoriteDog: (input: number) => void;
  unFavoriteDog: (input: number) => void;
  isLoading: boolean;
  loadingHandler: (input: boolean) => void;
}): JSX.Element => {
  useEffect(() => {
    loadingHandler(true);
    Requests.getAllDogs()
      .then(handleDogs)
      .finally(() => {
        loadingHandler(false);
      });
  }, []);

  return dogs.length > 0 || isLoading ? (
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
              deleteDog(dog.id);
            }}
            onHeartClick={() => {
              unFavoriteDog(dog.id);
            }}
            onEmptyHeartClick={() => {
              favoriteDog(dog.id);
            }}
            isLoading={isLoading}
          />
        );
      })}
    </>
  ) : (
    <h1>Loading...</h1>
  );
};
