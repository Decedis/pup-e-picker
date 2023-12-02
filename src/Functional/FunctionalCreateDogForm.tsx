import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import { useState } from "react";
import { Dog } from "../types";
import toast from "react-hot-toast";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = () => {
  //create dog state
  const [newDog, setNewDog] = useState<Omit<Dog, "id">>({
    name: "",
    description: "",
    image: "",
    isFavorite: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //form value and form onChange to reflect the "dog" values.

  //disable form until response from server is made, or until refresh.

  //on submit, watch for server response
  //while there is no response, setIsLoading = true
  //upon a response from the server, setIsLoading = false
  //TODO these need to be set within the promise function.
  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        setIsLoading(true);
        Requests.postDog(newDog).finally(() => Requests.getAllDogs());
        setIsLoading(false);
        setNewDog({
          name: "",
          description: "",
          image: "",
          isFavorite: false,
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
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option
              value={pictureValue}
              key={pictureValue}
              defaultValue={defaultSelectedImage}
            >
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={isLoading} />
    </form>
  );
};
