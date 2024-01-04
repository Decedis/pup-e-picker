import { dogPictures } from "../dog-pictures";
import { useState } from "react";
import { Dog } from "../types";
import toast from "react-hot-toast";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;
const defaultDog = {
  name: "",
  description: "",
  image: defaultSelectedImage,
  isFavorite: false,
};

export const FunctionalCreateDogForm = ({
  isLoading,
  postDog,
}: {
  isLoading: boolean;
  postDog: (input: Omit<Dog, "id">) => Promise<unknown>;
}) => {
  const [newDog, setNewDog] = useState<Omit<Dog, "id">>(defaultDog);

  const shouldDisable =
    isLoading || newDog.description === "" || newDog.name === "";

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        postDog({ ...newDog })
          .then(() => {
            setNewDog(defaultDog);
            return toast.success("Dog has been created");
          })
          .catch(() => {
            return toast.error("Dog could not be created");
          });
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
        disabled={shouldDisable}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={shouldDisable} />
    </form>
  );
};
