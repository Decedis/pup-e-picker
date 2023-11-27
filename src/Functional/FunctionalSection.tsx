// you can use this type for react children if you so choose
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";

type TFunctionalSectionProps = {
  dogFormIsVisible: (input: boolean) => void;
  children: ReactNode;
};
export const FunctionalSection = ({
  dogFormIsVisible,
  children,
}: TFunctionalSectionProps) => {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div className={`selector active`} onClick={() => {}}>
            favorited ( 12 )
          </div>

          {/* This should display the unfavorited count */}
          <div className={`selector`} onClick={() => {}}>
            unfavorited ( 25 )
          </div>
          <div
            className={`selector`}
            onClick={() => {
              setIsFormVisible(!isFormVisible);
              dogFormIsVisible(!isFormVisible);
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
