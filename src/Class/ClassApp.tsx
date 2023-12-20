import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { ActiveComponent, Dog } from "../types";
import { Requests } from "../api";
import { getFilteredDogs } from "../Functional/FunctionalApp";

type TState = {
  allDogs: Dog[];
  activeComponent: ActiveComponent;
  isLoading: boolean;
};

export class ClassApp extends Component {
  state: TState = {
    allDogs: [],
    activeComponent: "all",
    isLoading: false,
  };

  componentDidMount = () => {
    Requests.getAllDogs().then((res) => {
      return this.setState({ allDogs: res });
    });
  };

  componentDidUpdate(_: any, prevState: TState) {
    //I know there's an any here, but I'm not using it,
    //If I delete "_: any", I get an error, so I'm leaving it in

    const { allDogs, activeComponent } = this.state;

    const favoritedDogs = allDogs.filter((dog) => dog.isFavorite);
    const notFavoritedDogs = allDogs.filter((dog) => !dog.isFavorite);

    if (
      prevState.allDogs.length !== allDogs.length ||
      prevState.activeComponent !== activeComponent ||
      prevState.allDogs.filter((dog) => dog.isFavorite) !== favoritedDogs ||
      prevState.allDogs.filter((dog) => !dog.isFavorite) !== notFavoritedDogs
    ) {
      Requests.getAllDogs().then((res) => {
        this.setState({ dogData: res });
      });
    }
  }

  render() {
    const { allDogs, isLoading, activeComponent } = this.state;

    const favoritedDogs = allDogs.filter((dog) => dog.isFavorite);
    const notFavoritedDogs = allDogs.filter((dog) => !dog.isFavorite);

    const refetch = () => {
      this.setState({ isLoading: true });
      Requests.getAllDogs()
        .then((res) => this.setState({ allDogs: res }))
        .finally(() => {
          this.setState({ isLoading: false });
        });
    };
    const deleteDog = (id: number) => {
      Requests.deleteDog(id).then(refetch);
    };
    const favoriteDog = (id: number) => {
      Requests.updateDog(id, true).then(refetch);
    };
    const unFavoriteDog = (id: number) => {
      Requests.updateDog(id, false).then(refetch);
    };

    const filteredDogs = getFilteredDogs({
      allDogs: allDogs,
      favorited: favoritedDogs,
      unFavorited: notFavoritedDogs,
      activeComponent: activeComponent,
    });
    const showSomeDogs = activeComponent !== "create";

    return (
      <div className="App" style={{ backgroundColor: "skyblue" }}>
        <header>
          <h1>pup-e-picker (Functional)</h1>
        </header>
        <ClassSection
          favoritedDogs={favoritedDogs}
          notFavoritedDogs={notFavoritedDogs}
          handleActiveComponent={(active) => {
            this.setState({ activeComponent: active });
          }}
        >
          {!showSomeDogs && (
            <ClassCreateDogForm
              isLoading={isLoading}
              loadingHandler={(loading) =>
                this.setState({ isLoading: loading })
              }
              handleNewDog={(dogs) => this.setState({ allDogs: dogs })}
            />
          )}
          {showSomeDogs && (
            <ClassDogs
              dogs={filteredDogs}
              deleteDog={deleteDog}
              handleDogs={(dogs) => this.setState({ allDogs: dogs })}
              favoriteDog={favoriteDog}
              unFavoriteDog={unFavoriteDog}
              isLoading={isLoading}
              loadingHandler={(loading) =>
                this.setState({ isLoading: loading })
              }
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
