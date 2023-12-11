// you can use this type for react children if you so choose
import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";

type TFunctionalSectionProps = {
  favoritedDogs: Dog[];
  notFavoritedDogs: Dog[];
  handleActive: (input: "favorited" | "unfavorited" | "create" | "all") => void;
  children: ReactNode;
};
export const FunctionalSection = ({
  favoritedDogs,
  notFavoritedDogs,
  handleActive,
  children,
}: TFunctionalSectionProps) => {
  const [isActive, setIsActive] = useState<
    "favorited" | "unfavorited" | "create" | "all"
  >("all");

  useEffect(() => {
    handleActive(isActive);
  }, [isActive]);

  const activeStyle = (target: "favorited" | "unfavorited" | "create") => {
    return isActive === target ? `selector active` : `selector`;
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
              setIsActive((lastVal) =>
                lastVal === "favorited" ? "all" : "favorited"
              );
            }}
          >
            favorited ( {favoritedDogs.length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={activeStyle("unfavorited")}
            onClick={() => {
              setIsActive((lastVal) =>
                lastVal === "unfavorited" ? "all" : "unfavorited"
              );
            }}
          >
            unfavorited ( {notFavoritedDogs.length} )
          </div>
          <div
            className={activeStyle("create")}
            onClick={() => {
              setIsActive((lastVal) =>
                lastVal === "create" ? "all" : "create"
              );
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
