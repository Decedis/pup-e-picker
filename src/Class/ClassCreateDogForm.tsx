import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;

type ClassProps = {
  handleNewDog: (input: Dog[]) => void;
};

type ClassState = {
  newDog: Omit<Dog, "id">;
  isLoading: boolean;
};

export class ClassCreateDogForm extends Component<ClassProps, ClassState> {
  state: ClassState = {
    newDog: {
      name: "",
      description: "",
      image: defaultSelectedImage,
      isFavorite: false,
    },
    isLoading: false,
  };
  render() {
    const { handleNewDog } = this.props;
    const { newDog, isLoading } = this.state;

    const disableCondition =
      isLoading || newDog.description === "" || newDog.name === "";

    const submitActions = () => {
      this.setState({ isLoading: true });
      Requests.postDog(newDog).then(() => {
        Requests.getAllDogs().then((dogs) => {
          this.setState({ isLoading: false });
          this.setState({
            newDog: {
              name: "",
              description: "",
              image: defaultSelectedImage,
              isFavorite: false,
            },
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
            this.setState({
              newDog: {
                ...newDog,
                name: e.target.value,
              },
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
          onChange={(e) => {
            this.setState({
              newDog: {
                ...newDog,
                description: e.target.value,
              },
            });
          }}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          id=""
          value={newDog.image}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            this.setState({
              newDog: {
                ...newDog,
                image: e.target.value,
              },
            });
          }}
          disabled={disableCondition}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={disableCondition} />
      </form>
    );
  }
}
