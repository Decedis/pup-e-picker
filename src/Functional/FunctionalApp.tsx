import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { Dog } from "../types";

export function FunctionalApp() {
  const [dogFormIsVisible, setDogFormIsVisible] = useState<boolean>(false);
  const [dogs, setDogs] = useState<Dog[]>([]);
  useEffect(() => {
    Requests.getAllDogs().then((dogs) => {
      return setDogs(dogs);
    });
  }, []);
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection dogFormIsVisible={setDogFormIsVisible}>
        {dogFormIsVisible ? (
          <FunctionalCreateDogForm />
        ) : (
          <FunctionalDogs dogs={dogs} />
        )}
      </FunctionalSection>
    </div>
  );
}
