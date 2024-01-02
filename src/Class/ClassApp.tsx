import { Component, SetStateAction } from "react";
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
    const postDog = (newDog: Omit<Dog, "id">) => {
      this.setState({ isLoading: true });
      return Requests.postDog(newDog)
        .then(refetch)
        .finally(() => {
          this.setState({ setIsLoading: false });
        });
    };
    const favoriteDog = (id: number) => {
      Requests.updateDog(id, { isFavorite: true }).then(refetch);
    };
    const unFavoriteDog = (id: number) => {
      Requests.updateDog(id, { isFavorite: false }).then(refetch);
    };

    const filteredDogs = getFilteredDogs({
      allDogs: allDogs,
      favorited: favoritedDogs,
      unFavorited: notFavoritedDogs,
      activeComponent: activeComponent,
    });
    const shouldShowDogs = activeComponent !== "create";

    return (
      <div className="App" style={{ backgroundColor: "skyblue" }}>
        <header>
          <h1>pup-e-picker (Functional)</h1>
        </header>
        <ClassSection
          favoritedDogs={favoritedDogs}
          notFavoritedDogs={notFavoritedDogs}
          setActiveComponent={(active: SetStateAction<ActiveComponent>) =>
            this.setState({
              activeComponent:
                typeof active === "function" ? active(activeComponent) : active,
            })
          }
          activeComponent={activeComponent}
        >
          {!shouldShowDogs && (
            <ClassCreateDogForm isLoading={isLoading} postDog={postDog} />
          )}
          {shouldShowDogs && (
            <ClassDogs
              dogs={filteredDogs}
              deleteDog={deleteDog}
              favoriteDog={favoriteDog}
              unFavoriteDog={unFavoriteDog}
              isLoading={isLoading}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
