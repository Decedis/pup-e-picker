import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

export const FunctionalDogs = ({
  dogs,

  deleteDog,
  favoriteDog,
  unFavoriteDog,
  isLoading,
}: {
  dogs: Dog[];

  deleteDog: (input: number) => void;
  favoriteDog: (input: number) => void;
  unFavoriteDog: (input: number) => void;
  isLoading: boolean;
}): JSX.Element => {
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
