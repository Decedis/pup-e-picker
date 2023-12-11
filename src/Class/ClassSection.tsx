// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";

type ClassProps = {
  favoritedDogs: Dog[];
  notFavoritedDogs: Dog[];
  handleActive: (input: "favorited" | "unfavorited" | "create" | "all") => void;
  children: ReactNode;
};
type ClassState = {
  isActive: "favorited" | "unfavorited" | "create" | "all";
};

export class ClassSection extends Component<ClassProps, ClassState> {
  state: ClassState = {
    isActive: "all",
  };
  render() {
    const { favoritedDogs, notFavoritedDogs, handleActive, children } =
      this.props;
    const { isActive } = this.state;
    const activeStyle = (target: "favorited" | "unfavorited" | "create") => {
      return isActive === target ? `selector active` : `selector`;
    };
    this.componentDidMount = () => {
      handleActive(isActive);
    };
    this.componentDidUpdate = (prevProps, prevState) => {
      if (
        prevState.isActive !== this.state.isActive ||
        prevProps.handleActive !== this.props.handleActive
      ) {
        handleActive(isActive);
      }
      handleActive(isActive);
    };
    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            {/* This should display the favorited count */}
            <div
              className={activeStyle("favorited")}
              onClick={() => {
                this.setState((lastVal) => ({
                  isActive:
                    lastVal.toString() === "favorited" ? "all" : "favorited",
                }));
              }}
            >
              favorited ( {favoritedDogs.length} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={activeStyle("unfavorited")}
              onClick={() => {
                this.setState((lastVal) => ({
                  isActive:
                    lastVal.toString() === "unfavorited"
                      ? "all"
                      : "unfavorited",
                }));
              }}
            >
              unfavorited ( {notFavoritedDogs.length} )
            </div>
            <div
              className={activeStyle("create")}
              onClick={() => {
                this.setState((lastVal) => ({
                  isActive: lastVal.toString() === "create" ? "all" : "create",
                }));
              }}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{children}</div>
      </section>
    );
  }
}
