import { JSX } from "react";
import { SideBar } from "@components/PageComponents/SideBar/SideBar";

interface User {
  id: string;
  name: string;
  email: string;
}

type PatternAuthPagesProps = React.PropsWithChildren<{
  isLoading: boolean,
  user: User
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
