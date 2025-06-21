import React from "react";
import {
    CSidebar,
    CSidebarNav,
    CNavItem,
    CNavLink,
    CSidebarHeader,
} from "@coreui/react";
import { cilSpeedometer, cilPeople, cilCart, cilHistory } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { Link, usePage } from "@inertiajs/react";
import "../styles/sidebar.css";
import logo from "../assets/MCS.png";

export default function Sidebar() {
    const { url } = usePage();

    const menu = [
        { name: "แดชบอร์ด", icon: cilSpeedometer, href: "/dashboard" },
        { name: "ลูกค้า", icon: cilPeople, href: "/customers" },
        { name: "ประวัติการซื้อ", icon: cilHistory, href: "/purchase-history" },
       
    ];

    return (
        <CSidebar
            visible={true}
            unfoldable={true}
            className="bg-white shadow-sm"
            style={{ width: "260px" }}
        >
            <CSidebarHeader className="px-3 py-2 border-bottom text-center">
                <Link href="/dashboard">
                    <img
                        src={logo}
                        alt="Logo"
                        height="32"
                        style={{ maxWidth: "100%", objectFit: "contain" }}
                    />
                </Link>
            </CSidebarHeader>

            <CSidebarNav className="px-3 pt-4">
                {menu.map((item, index) => {
                    const isActive =
                        item.href === "/customers"
                            ? url === "/customers" || url === "/customers/create"
                            : url === item.href;

                    return (
                        <CNavItem key={index} className="mb-2">
                            <CNavLink
                                component={Link}
                                href={item.href}
                                className={`d-flex align-items-center gap-3 px-3 py-2 rounded-pill fw-medium sidebar-link ${
                                    isActive
                                        ? "active-menu"
                                        : "text-dark hover-bg-light"
                                }`}
                            >
                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{ width: 20, height: 20 }}
                                >
                                    <CIcon
                                        icon={item.icon}
                                        className={`${
                                            isActive
                                                ? "text-primary"
                                                : "text-secondary"
                                        }`}
                                        style={{ fontSize: "22px" }}
                                    />
                                </div>
                                <span
                                    className={`${
                                        isActive
                                            ? "text-primary fw-semibold"
                                            : ""
                                    }`}
                                >
                                    {item.name}
                                </span>
                            </CNavLink>
                        </CNavItem>
                    );
                })}
            </CSidebarNav>
        </CSidebar>
    );
}
