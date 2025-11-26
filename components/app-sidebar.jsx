// components/app-sidebar.jsx
"use client";

import * as React from "react";
import {
  IconBook,
  IconChartBar,
  IconDashboard,
  IconHelp,
  IconSettings,
  IconUsers,
  IconVideo,
  IconInnerShadowTop, 
  IconSearch, 
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const getNavItems = (role) => {
  const baseItems = [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
  ];

  if (role === 'learner') {
    return [
      ...baseItems,
      {
        title: "My Courses",
        url: "#",
        icon: IconBook,
      },
      {
        title: "Progress",
        url: "#",
        icon: IconChartBar,
      },
      {
        title: "Find Help",
        url: "#",
        icon: IconHelp,
      },
    ];
  } else {
    return [
      ...baseItems,
      {
        title: "Sessions",
        url: "#",
        icon: IconVideo,
      },
      {
        title: "Learners",
        url: "#",
        icon: IconUsers,
      },
      {
        title: "Schedule",
        url: "#",
        icon: IconChartBar,
      },
    ];
  }
};

export function AppSidebar({
  user,
  ...props
}) {
  const navItems = getNavItems(user?.role);
  const sidebarData = {
    user: user || {
      name: "User",
      email: "user@example.com",
      avatar: "/avatars/default.jpg",
    },
    navMain: navItems,
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: IconSettings,
      },
      {
        title: "Get Help",
        url: "#",
        icon: IconHelp,
      },
      {
        title: "Search",
        url: "#",
        icon: IconSearch,
      },
    ],
    documents: [
      {
        name: "My Courses",
        url: "#",
        icon: IconBook,
      },
      {
        name: "Progress",
        url: "#",
        icon: IconChartBar,
      },
      {
        name: "Resources",
        url: "#",
        icon: IconBook,
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">LearnSync</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
        <NavDocuments items={sidebarData.documents} />
        <NavSecondary items={sidebarData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
    </Sidebar>
  );
}