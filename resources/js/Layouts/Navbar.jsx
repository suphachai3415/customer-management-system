import React from "react";
import {
    CNavbar,
    CContainer,
    CNavbarBrand,
    CNavbarNav,
    CNavItem,
    CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBell } from "@coreui/icons";
import UserAvatar from "../components/UserAvatar";


export default function Navbar() {
    return (
        <CNavbar
            expand="lg"
            colorScheme="light"
            className="bg-white shadow-sm fixed-top px-4"
            style={{ height: "64px", zIndex: 1030 }}
        >
            <CContainer fluid>
                {/* ✅ โลโก้ */}
                <CNavbarBrand className="d-flex align-items-center gap-3">
                    <img src="../assets/MCS.png" alt="Logo" height="36" />
                    <div
                        className="fw-bold fs-5"
                        style={{
                            background:
                                "linear-gradient(90deg, #4e73df, #a97adf)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        <img src="../assets/MCS.png" alt="Logo" height="36" />
                    </div>
                </CNavbarBrand>

                {/* ขวา */}
                <CNavbarNav className="ms-auto d-flex align-items-center gap-3">
                    {/* 🔔 */}
                    <CNavItem className="position-relative">
                        <CIcon icon={cilBell} size="lg" className="text-dark" />
                        <span className="position-absolute top-0 start-100 translate-middle p-1 bg-primary border border-light rounded-circle"></span>
                    </CNavItem>

                    {/* Avatar */}
                    <CNavItem>
                        <UserAvatar name="Nia" />
                    </CNavItem>
                </CNavbarNav>
            </CContainer>
        </CNavbar>
    );
}
