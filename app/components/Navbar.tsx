import Link from "next/link";
import RedditText from "../../public/Uquick-L.png";
import redditMobile from "../../public/uquick-pet-logo.png";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserDropdown } from "./UserDropdown";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="h-[10vh] w-full flex items-center border-b px-5 lg:px-14 justify-between">
      <Link href="/" className="flex items-center gap-x-3">
        <Image
          src={redditMobile}
          alt="Reddit mobile icon"
          height={90}
          width={90}
        />
        <span
          style={{
            fontFamily: "Madera W01 ExtraBold",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
          }}
          className="text-[2.5rem]"
        >
          uQuick
        </span>
      </Link>

      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        {user ? (
          <UserDropdown userImage={user.picture} />
        ) : (
          <div className="flex items-center gap-x-4">
            <Button variant="secondary" asChild>
              <RegisterLink>Registrarse</RegisterLink>
            </Button>
            <Button asChild>
              <LoginLink>Ingresar</LoginLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
