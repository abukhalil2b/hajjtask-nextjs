"use client";

import ResponsiveNavLink from "@/components/ResponsiveNavLink";
import Dangerbutton from "@/components/ui/DangerButton";
import { useAuth } from "@/hooks/auth";
import __ from "@/util/__";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navigation = () => {
  const pathname = usePathname();

  const { logout, user } = useAuth();

  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen(!open);
  }
  return (
    <nav className="bg-[#032a38] border-b border-black">
      {/* <!-- Primary Navigation Menu --> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex gap-2">
            <img src="/logo.png" alt="logo" width="30" />
            {/* <!-- Hamburger --> */}
            <div className="-mr-2 flex items-center">
              <button
                onClick={toggleOpen}
                className="inline-flex items-center justify-center p-2 rounded-md text-[#ffb031] hover:text-gray-500 hover:bg-[#ffb031] focus:outline-none focus:bg-[#ffb031] focus:text-gray-500 transition duration-150 ease-in-out"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className={open ? "hidden" : "inline-flex"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={open ? "inline-flex" : "hidden"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="text-[#ffb031]">
            {user.name}
            <div className="text-[#ffb031] text-xs">{__(user.user_type)}</div>
          </div>
        </div>

        <div className={open ? "block" : "hidden"}>
          <div className="pt-2 pb-3 space-y-1 text-sm ">
            {/* {user.user_type == "super_admin" && (
              <ResponsiveNavLink
                href="route('super_admin.group.index')"
                active="request()->routeIs('super_admin.group.index')"
              >
                إدارة الوفود والمجموعات
              </ResponsiveNavLink>
            )}

            {user.user_type == "super_admin" && (
              <ResponsiveNavLink
                href="route('super_admin.day.index')"
                active="request()->routeIs('super_admin.day.index')"
              >
                إعداد جدول المهام
              </ResponsiveNavLink>
            )} */}

            {user.user_type == "super_admin" && (
              <ResponsiveNavLink
                href="/super_admin/user/orderby_task_count"
                active={pathname == "/super_admin/user/orderby_task_count"}
              >
                ترتيب الأعضاء حسب المهام
              </ResponsiveNavLink>
            )}

            {(user.user_type == "super_admin" || user.user_type == "admin") && (
              <ResponsiveNavLink
                href="/user/today/tasks"
                active={pathname == "/user/today/tasks"}
              >
                مهام كل الأعضاء لهذا اليوم
              </ResponsiveNavLink>
            )}

            {(user.user_type == "super_admin" || user.user_type == "admin") && (
              <ResponsiveNavLink
                href="/user/late/tasks"
                active={pathname == "/user/late/tasks"}
              >
                مهام كل الأعضاء المتأخرة
              </ResponsiveNavLink>
            )}

            {(user.user_type == "super_admin" || user.user_type == "admin") && (
              <ResponsiveNavLink
                href="/user/today/subtasks"
                active={pathname == "/user/today/subtasks"}
              >
                تعليقات كل الأعضاء لهذا اليوم
              </ResponsiveNavLink>
            )}

            {(user.user_type == "super_admin" || user.user_type == "admin") && (
              <ResponsiveNavLink
                href="/user/index"
                active={pathname == "/user/index"}
              >
                جدول مهام الأعضاء (إضافة مهمة)
              </ResponsiveNavLink>
            )}

            <ResponsiveNavLink
              href="/day/index"
              active={pathname == "/day/index"}
            >
              جدول مهامي (إضافة مهمة)
            </ResponsiveNavLink>

            <ResponsiveNavLink href="/" active={pathname == "/"}>
              الرئيسية
            </ResponsiveNavLink>
          </div>

          <div className="p-3 flex justify-between">
            <a
              href="/profile"
              className="inline-flex items-center px-4 py-2 border rounded text-orange-500 border-orange-500 hover:bg-orange-100"
            >
              الملف الشخصي
            </a>

            {/* <!-- Authentication --> */}

            {/* @csrf */}
            <Dangerbutton onClick={logout}>تسجيل الخروج</Dangerbutton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
