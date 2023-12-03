import { useEffect, useState } from "react";
import { DogCard } from "../Shared/DogCard";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

export const FunctionalDogs = ({
  dogs,
  handleDogs,
}: {
  dogs: Dog[];
  handleDogs: (input: Dog[]) => void;
}): JSX.Element => {
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
              Requests.deleteDog(dog.id).catch((err) => console.log(err));
              handleDogs(dogs.filter((dog) => dog.id));
            }}
            onHeartClick={() => {
              toast("Dog has been favorited");
              Requests.updateDog(dog.id, false)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
            }}
            onEmptyHeartClick={() => {
              toast("Dog has been unfavorited");
              Requests.updateDog(dog.id, true)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
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
