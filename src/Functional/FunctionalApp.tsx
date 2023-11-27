import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { Dog } from "../types";

export function FunctionalApp() {
  const [isActive, setIsActive] = useState<
    "favorited" | "unfavorited" | "create" | "all"
  >("all");
  const [dogData, setDogData] = useState<Dog[]>([]);
  const favoritedDogs = dogData.filter((dog) => dog.isFavorite);
  const notFavoritedDogs = dogData.filter((dog) => !dog.isFavorite);

  console.log("isActive", isActive);

  useEffect(() => {
    Requests.getAllDogs().then((dogData) => {
      return setDogData(dogData);
    });
  }, []);
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        favoritedDogs={favoritedDogs}
        notFavoritedDogs={notFavoritedDogs}
        handleActive={setIsActive}
      >
        {isActive === "favorited" ? (
          <FunctionalDogs dogs={favoritedDogs} />
        ) : isActive === "unfavorited" ? (
          <FunctionalDogs dogs={notFavoritedDogs} />
        ) : isActive === "create" ? (
          <FunctionalCreateDogForm />
        ) : (
          <FunctionalDogs dogs={dogData} />
        )}
      </FunctionalSection>
    </div>
  );
}
