// you can use this type for react children if you so choose
import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";

type TFunctionalSectionProps = {
  favoritedDogs: Dog[];
  notFavoritedDogs: Dog[];
  //dogFormIsVisible: (input: boolean) => void;
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
  }, [isActive, handleActive]);
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
            className={`selector active`}
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
            className={`selector`}
            onClick={() => {
              setIsActive((lastVal) =>
                lastVal === "unfavorited" ? "all" : "unfavorited"
              );
            }}
          >
            unfavorited ( {notFavoritedDogs.length} )
          </div>
          <div
            className={`selector`}
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
