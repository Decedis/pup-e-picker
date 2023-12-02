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

  useEffect(() => {
    Requests.getAllDogs().then((res) => {
      return setDogData(res);
    });
    // console.log("dogData: ", dogData);
  }, [dogData.length]);

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
          <FunctionalDogs dogs={favoritedDogs} handleDogs={setDogData} />
        ) : isActive === "unfavorited" ? (
          <FunctionalDogs dogs={notFavoritedDogs} handleDogs={setDogData} />
        ) : isActive === "create" ? (
          <FunctionalCreateDogForm />
        ) : (
          <FunctionalDogs dogs={dogData} handleDogs={setDogData} />
        )}
      </FunctionalSection>
    </div>
  );
}
