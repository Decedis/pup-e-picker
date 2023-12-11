import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog } from "../types";
import { Requests } from "../api";

type TState = {
  dogData: Dog[];
  isActive: "favorited" | "unfavorited" | "create" | "all";
};
export class ClassApp extends Component {
  state: TState = {
    dogData: [],
    isActive: "all",
  };

  componentDidMount = () => {
    Requests.getAllDogs().then((res) => {
      return this.setState({ dogData: res });
    });
  };

  componentDidUpdate(_: any, prevState: TState) {
    //I know there's an any here, but I'm not using it,
    //If I delete "_: any", I get an error, so I'm leaving it in

    const { dogData, isActive } = this.state;

    const favoritedDogs = dogData.filter((dog) => dog.isFavorite);
    const notFavoritedDogs = dogData.filter((dog) => !dog.isFavorite);

    if (
      prevState.dogData.length !== dogData.length ||
      prevState.isActive !== isActive ||
      prevState.dogData.filter((dog) => dog.isFavorite) !== favoritedDogs ||
      prevState.dogData.filter((dog) => !dog.isFavorite) !== notFavoritedDogs
    ) {
      Requests.getAllDogs().then((res) => {
        this.setState({ dogData: res });
      });
    }
  }

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
        >
          {isActive === "favorited" ? (
            <ClassDogs
              dogs={favoritedDogs}
              handleDogs={(data) => this.setState({ dogData: data })}
            />
          ) : isActive === "unfavorited" ? (
            <ClassDogs
              dogs={notFavoritedDogs}
              handleDogs={(data) => this.setState({ dogData: data })}
            />
          ) : isActive === "create" ? (
            <ClassCreateDogForm
              handleNewDog={(value) => {
                this.setState(value);
              }}
            />
          ) : (
            <ClassDogs
              dogs={dogData}
              handleDogs={(data) => this.setState({ dogData: data })}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
