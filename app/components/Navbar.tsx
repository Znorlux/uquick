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
    <nav className="sticky top-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border/40 h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo y nombre */}
          <Link
            href="/"
            className="flex items-center gap-x-3 hover:opacity-90 transition-opacity"
          >
            <Image
              src={redditMobile}
              alt="Reddit mobile icon"
              height={50}
              width={50}
              className="w-auto h-auto"
            />
            <span
              style={{
                fontFamily: "Madera W01 ExtraBold",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                background: "linear-gradient(45deg, #FF6F61, #FF8B66)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="text-2xl sm:text-3xl hidden sm:block"
            >
              uQuick
            </span>
          </Link>

          {/* Enlaces de navegación */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/chatbot"
              className="text-foreground/80 hover:text-foreground font-semibold transition-colors relative group"
            >
              QuickFox
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/communities"
              className="text-foreground/80 hover:text-foreground font-semibold transition-colors relative group"
            >
              Comunidades
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>

          {/* Controles de usuario */}
          <div className="flex items-center gap-x-4">
            <ThemeToggle />
            {user ? (
              <UserDropdown userImage={user.picture} />
            ) : (
              <div className="flex items-center gap-x-3">
                <Button
                  variant="outline"
                  asChild
                  className="hidden sm:inline-flex hover:bg-secondary/80"
                >
                  <RegisterLink>Registrarse</RegisterLink>
                </Button>
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-colors"
                >
                  <LoginLink>Ingresar</LoginLink>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
