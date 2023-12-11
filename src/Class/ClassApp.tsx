import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog } from "../types";

type TState = {
  dogData: Dog[];
  isActive: "favorited" | "unfavorited" | "create" | "all";
};
export class ClassApp extends Component {
  state: TState = {
    dogData: [],
    isActive: "all",
  };
  render() {
    const { dogData, isActive } = this.state;

    const favoritedDogs = dogData.filter((dog) => dog.isFavorite);
    const notFavoritedDogs = dogData.filter((dog) => !dog.isFavorite);

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          favoritedDogs={favoritedDogs}
          notFavoritedDogs={notFavoritedDogs}
          handleActive={(active) => {
            this.setState({ isActive: active });
          }}
        />

        {isActive === "favorited" ? (
          <ClassDogs dogs={favoritedDogs} handleDogs={setDogData} />
        ) : isActive === "unfavorited" ? (
          <ClassDogs dogs={notFavoritedDogs} handleDogs={setDogData} />
        ) : isActive === "create" ? (
          <ClassCreateDogForm
            handleNewDog={(value) => {
              setDogData(value);
            }}
          />
        ) : (
          <ClassDogs dogs={dogData} handleDogs={setDogData} />
        )}
        <ClassDogs />
        <ClassCreateDogForm />
      </div>
    );
  }
}
