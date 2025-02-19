import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import SignOutButton from "@/features/auth/components/sign-out-button";
import { getUser } from "@/features/auth/utils";
import { homePath, profilePath, signInPath, ticketsPath } from "@/path";
import { BookIcon, ChevronUpIcon, KanbanIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const links = [
  {
    title: "All tickets",
    url: homePath(),
    icon: KanbanIcon,
  },
  {
    title: "My tickets",
    url: ticketsPath(),
    icon: BookIcon,
    requiredAuth: true,
  },
];

export async function AppSidebar() {
  const user = await getUser();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => (
                <SidebarMenuItem key={link.title}>
                  <SidebarMenuButton asChild>
                    {link.requiredAuth && !user ? undefined : (
                      <Link href={link.url}>
                        <link.icon /> {link.title}
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2Icon />
                    {user?.name}
                    <ChevronUpIcon className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
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
              <SidebarMenuButton>
                <User2Icon />
                <Link className="w-full" href={signInPath()}>
                  Sign in
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
