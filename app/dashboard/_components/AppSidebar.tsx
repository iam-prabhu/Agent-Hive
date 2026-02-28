'use client'

import React, { useContext, useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import {
  Database,
  Gem,
  Headphones,
  LayoutDashboard,
  UserIcon,
  WalletCards,
} from "lucide-react";
import { useAuth, UserAvatar } from "@clerk/nextjs";
import Link from "next/link";
import { UserDetailContext } from "@/context/UserDetailContext";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { is } from "date-fns/locale";


const MenuOptions = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "AI Agents",
    url: "/dashboard/my-agents",
    icon: Headphones,
  },
  // {
  //   title: "Data",
  //   url: "#",
  //   icon: Database,
  // },
  {
    title: "Pricing",
    url: "/dashboard/pricing",
    icon: WalletCards,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: UserIcon,
  },
];

function AppSidebar() {
  const { open } = useSidebar();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const path = usePathname();

  const { has } = useAuth();
  const isPaidUser = has && has({ plan: 'unlimited_plan' })
  console.log("isPaidUser", isPaidUser)
  const convex = useConvex();
  const [totalRemainingCredits, setTotalRemainingCredits] = useState(0);
  useEffect(() => {
    if (!isPaidUser && userDetail?._id) {
      GetUserAgent();
    }
  }, [userDetail?._id, isPaidUser])


  const GetUserAgent = async () => {
    const result = await convex.query(api.agent.GetUserAgents, {
      userId: userDetail?._id
    })
    setTotalRemainingCredits(50 - Number(result?.length || 0))
    setUserDetail((prev: any) => ({ ...prev, remainingCredits: 50 - Number(result?.length || 0) }))
    console.log(result)
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex gap-2 items-center">
          <Image src={"/logo.svg"} alt="logo" width={35} height={35} />
          {open && <h2 className="font-bold text-xl">Agent Hive</h2>}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MenuOptions.map((menu, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild size={open ? 'lg' : 'default'} isActive={path == menu.url ? true : false}>
                    <Link href={menu.url}>
                      <menu.icon />
                      <span>{menu.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mb-10" >
        {!isPaidUser ?
          <div>
            <div className="flex gap-2 items-center">
              <Gem />
              {open && <h2>Remaining Credits :<span className="font-bold"> {totalRemainingCredits}/50</span></h2>}
            </div>
            {open && <Link href="/dashboard/pricing"><Button className="w-full mt-2">Upgrade to Unlimited</Button></Link>}
          </div> :
          <div>
            <h2>You can create unlimited Agents</h2>
          </div>}
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
