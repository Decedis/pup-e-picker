import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import { useState } from "react";
import { Dog } from "../types";
import toast from "react-hot-toast";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  handleNewDog,
}: {
  handleNewDog: (input: Dog[]) => void;
}) => {
  //create dog state
  const [newDog, setNewDog] = useState<Omit<Dog, "id">>({
    name: "",
    description: "",
    image: defaultSelectedImage,
    isFavorite: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const disableCondition =
    isLoading || newDog.description === "" || newDog.name === "";

  const submitActions = () => {
    setIsLoading(true);
    Requests.postDog(newDog).then(() => {
      Requests.getAllDogs().then((dogs) => {
        setIsLoading(false);
        setNewDog({
          name: "",
          description: "",
          image: defaultSelectedImage,
          isFavorite: false,
        });

        return handleNewDog(dogs);
      });
    });
    toast("Dog has been created");
  };

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        submitActions();
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={isLoading}
        value={newDog.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewDog({
            ...newDog,
            name: e.target.value,
          })
        }
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={isLoading}
        value={newDog.description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setNewDog({ ...newDog, description: e.target.value })
        }
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        value={newDog.image}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setNewDog({ ...newDog, image: e.target.value })
        }
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}{" "}
      </select>{" "}
      <input type="submit" disabled={disableCondition} />{" "}
    </form>
  );
};
