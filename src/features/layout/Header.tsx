import { LoggedInButton } from "../auth/LoggedInButton";
import NavMenu from "../navbar/NavMenu";
import Link from "next/link";

export type HeaderProps = {};

const Header = async (props: HeaderProps) => {
  return (
    <div className="flex items-center justify-between gap-4 p-10">
      <Link href="/">
        <h1 className="font-bold text-lg flex-1">Historio</h1>
      </Link>
      <NavMenu />
      <LoggedInButton />
    </div>
  );
};

export default Header;
