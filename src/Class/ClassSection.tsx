// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ActiveComponent, Dog } from "../types";

type TClassSectionProps = {
  favoritedDogs: Dog[];
  notFavoritedDogs: Dog[];
  setActiveComponent: (input: ActiveComponent) => void;
  activeComponent: ActiveComponent;
  children: ReactNode;
};

export class ClassSection extends Component<TClassSectionProps, {}> {
  render() {
    const {
      favoritedDogs,
      notFavoritedDogs,
      setActiveComponent,
      activeComponent,
      children,
    } = this.props;

    const toggleActiveComponent = (target: ActiveComponent) => {
      if (target === activeComponent) {
        setActiveComponent("all");
      } else {
        setActiveComponent(target);
      }
    };
    const getActiveStyle = (newActiveComponent: ActiveComponent) => {
      return activeComponent === newActiveComponent
        ? `selector active`
        : `selector`;
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
              className={getActiveStyle("favorited")}
              onClick={() => {
                toggleActiveComponent("favorited");
              }}
            >
              favorited ( {favoritedDogs.length} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={getActiveStyle("unfavorited")}
              onClick={() => {
                toggleActiveComponent("unfavorited");
              }}
            >
              unfavorited ( {notFavoritedDogs.length} )
            </div>
            <div
              className={getActiveStyle("create")}
              onClick={() => {
                toggleActiveComponent("create");
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
