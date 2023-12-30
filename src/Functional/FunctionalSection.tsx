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
  const componentSwitcher = (target: ActiveComponent) => {
    setActiveComponent((lastVal) => (lastVal === target ? "all" : target));
  };
  const activeStyle = (target: ActiveComponent) => {
    return activeComponent === target ? `selector active` : `selector`;
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
};
