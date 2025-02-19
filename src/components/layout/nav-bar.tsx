import SignOutButton from "@/features/auth/components/sign-out-button";
import { getUser } from "@/features/auth/utils";
import { ThemeToggle } from "@/features/theme/theme-toggle";
import {
  homePath,
  profilePath,
  signInPath,
  signUpPath,
  ticketsPath,
} from "@/path";
import { KanbanIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { buttonVariants } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

async function Navbar() {
  const user = await getUser();

  return (
    <nav className="sticky w-full top-0 z-50 bg-background border-b border-border py-3 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* <SidebarTrigger /> */}
          <Link
            href={homePath()}
            className={buttonVariants({ variant: "link", size: "spaceless" })}
          >
            <KanbanIcon />
            TicketBounty
          </Link>

          {user && (
            <Link
              href={ticketsPath()}
              className={buttonVariants({ variant: "link", size: "spaceless" })}
            >
              My Tickets
            </Link>
          )}
        </div>

        <div className="flex items-center gap-x-2">
          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="size-9">
                  <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
                  <AvatarFallback>{user?.name[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-(--radix-popper-anchor-width)"
              >
                <DropdownMenuItem>
                  <Link className="w-full" href={profilePath()}>
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SignOutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href={signInPath()}
                className={buttonVariants({
                  variant: "outline",
                })}
              >
                Sign In
              </Link>
              <Link
                href={signUpPath()}
                className={buttonVariants({ variant: "outline" })}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
