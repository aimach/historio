import { LoggedInButton } from "../auth/LoggedInButton";

export type HeaderProps = {};

const Header = async (props: HeaderProps) => {
  return (
    <div className="flex items-center gap-4">
      <h1 className="font-bold text-lg flex-1">Historio</h1>
      <LoggedInButton />
    </div>
  );
};

export default Header;
