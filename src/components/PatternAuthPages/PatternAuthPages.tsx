import { JSX } from "react";
import { SideBar } from "@components/SideBar/SideBar";

type PatternAuthPagesProps = React.PropsWithChildren<{
  isLoading: boolean;
}>;

export function PatternAuthPages({ children, isLoading }: PatternAuthPagesProps): JSX.Element {
  return (
    <>
      <div className="ml-45 mr-20 py-15">
        {children}
      </div>
      <SideBar isLoading={ isLoading }/>
    </>
  );
}