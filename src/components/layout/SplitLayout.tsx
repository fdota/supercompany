import { ReactNode } from "react";
import Navigation from "./Navigation";

interface SplitLayoutProps {
  leftContent: ReactNode;
  rightContent: ReactNode;
}

const SplitLayout = ({ leftContent, rightContent }: SplitLayoutProps) => {
  return (
    <div className="split-screen">
      <div className="split-left">
        <Navigation />
        {leftContent}
      </div>
      <div className="split-right">
        {rightContent}
      </div>
    </div>
  );
};

export default SplitLayout;