import { JSX } from "react";
import { SideBar } from "@components/SideBar/SideBar";

type PatternAuthPagesProps = React.PropsWithChildren<{
  isLoading: boolean,
  user: any
}>;

export function PatternAuthPages({ children, isLoading, user }: PatternAuthPagesProps): JSX.Element {
  return (
    <>
      <div className="ml-55 mr-5 py-15">
        { children }
      </div>
      <SideBar isLoading={ isLoading } user={ user } />
    </>
  );
}