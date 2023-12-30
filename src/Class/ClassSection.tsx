// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ActiveComponent, Dog } from "../types";

type ClassProps = {
  favoritedDogs: Dog[];
  notFavoritedDogs: Dog[];
  setActiveComponent: (input: ActiveComponent) => void;
  activeComponent: ActiveComponent;
  children: ReactNode;
};
type ClassState = {
  activeComponent: ActiveComponent;
};

export class ClassSection extends Component<ClassProps, ClassState> {
  state: ClassState = {
    activeComponent: "all",
  };

  render() {
    const { favoritedDogs, notFavoritedDogs, children } = this.props;
    const { activeComponent } = this.state;

    const componentSwitcher = (target: ActiveComponent) => {
      this.setState((lastVal) => ({
        activeComponent: lastVal.activeComponent === target ? "all" : target,
      }));
    };
    const activeStyle = (target: ActiveComponent) => {
      return activeComponent === target ? `selector active` : `selector`;
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
                componentSwitcher("favorited");
              }}
            >
              favorited ( {favoritedDogs.length} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={activeStyle("unfavorited")}
              onClick={() => {
                componentSwitcher("unfavorited");
              }}
            >
              unfavorited ( {notFavoritedDogs.length} )
            </div>
            <div
              className={activeStyle("create")}
              onClick={() => {
                componentSwitcher("create");
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
