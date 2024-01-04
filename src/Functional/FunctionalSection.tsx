// you can use this type for react children if you so choose
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";
import { ActiveComponent } from "../types";

type TFunctionalSectionProps = {
  favoritedDogs: Dog[];
  notFavoritedDogs: Dog[];
  setActiveComponent: Dispatch<SetStateAction<ActiveComponent>>;
  activeComponent: ActiveComponent;
  children: ReactNode;
};

export const FunctionalSection = ({
  favoritedDogs,
  notFavoritedDogs,
  setActiveComponent,
  activeComponent,
  children,
}: TFunctionalSectionProps) => {
  const toggleActiveComponent = (target: ActiveComponent) => {
    setActiveComponent((lastVal) => (lastVal === target ? "all" : target));
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
        <Link to={"/class"} className="btn">
          Change to Class
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
};
