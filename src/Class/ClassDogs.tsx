import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";
import { Requests } from "../api";

// Right now these dogs are constant, but in reality we should be getting these from our server
type Props = {
  dogs: Dog[];
  handleDogs: (input: Dog[]) => void;
  deleteDog: (input: number) => void;
  favoriteDog: (input: number) => void;
  unFavoriteDog: (input: number) => void;
  isLoading: boolean;
  loadingHandler: (input: boolean) => void;
};

export class ClassDogs extends Component<Props> {
  render() {
    const {
      dogs,
      handleDogs,
      deleteDog,
      favoriteDog,
      unFavoriteDog,
      isLoading,
      loadingHandler,
    } = this.props;

    this.componentDidMount = () => {
      loadingHandler(true);
      Requests.getAllDogs()
        .then(handleDogs)
        .finally(() => {
          loadingHandler(false);
        });
    };

    return (
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
    );
  }
}
