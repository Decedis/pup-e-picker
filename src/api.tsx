import toast from "react-hot-toast";
import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: (): Promise<Dog[]> => {
    return fetch(baseUrl + "/dogs").then((res) => res.json());
  },
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: async (dog: Omit<Dog, "id" | "isFavorite">) => {
    const res = await fetch(baseUrl + "/dogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    });
    return await res.json();
  },

  // should delete a dog from the database
  deleteDog: (id: number) => {
    return fetch(baseUrl + "/dogs/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  },

  updateDog: (id: number, newIsFav: boolean) => {
    //function to update "fav" value of dogs
    return fetch(baseUrl + "/dogs/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isFavorite: newIsFav,
      }),
    });
    //TODO bug: can unFav, but not reFav
    //Page does not rerender
    //Rerender needs to be triggered automatically through local data
    //Local data is blocking future updates through local static data
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
