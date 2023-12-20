import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { Dog, ActiveComponent } from "../types";

export const getFilteredDogs = ({
  allDogs,
  favorited,
  unFavorited,
  activeComponent,
}: {
  allDogs: Dog[];
  favorited: Dog[];
  unFavorited: Dog[];
  activeComponent: ActiveComponent;
}): Dog[] => {
  switch (activeComponent) {
    case "favorited":
      return favorited;
    case "unfavorited":
      return unFavorited;
    default:
      return allDogs;
  }
};

export function FunctionalApp() {
  const [activeComponent, setIsActiveComponent] =
    useState<ActiveComponent>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allDogs, setAllDogs] = useState<Dog[]>([]);

  const favoritedDogs = allDogs.filter((dog) => dog.isFavorite);
  const notFavoritedDogs = allDogs.filter((dog) => !dog.isFavorite);

  const refetch = () => {
    setIsLoading(true);
    Requests.getAllDogs()
      .then(setAllDogs)
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    refetch();
  }, []);

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
      <FunctionalSection
        favoritedDogs={favoritedDogs}
        notFavoritedDogs={notFavoritedDogs}
        handleActiveComponent={setIsActiveComponent}
      >
        {!showSomeDogs && <FunctionalCreateDogForm handleNewDog={setAllDogs} />}
        {showSomeDogs && (
          <FunctionalDogs
            dogs={filteredDogs}
            deleteDog={deleteDog}
            handleDogs={setAllDogs}
            favoriteDog={favoriteDog}
            unFavoriteDog={unFavoriteDog}
            isLoading={isLoading}
            loadingHandler={setIsLoading}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
