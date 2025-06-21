import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { usePage } from "@inertiajs/react";
import { CAlert } from "@coreui/react"; // ✅ อย่าลืม import ถ้ายังไม่มี

export default function MainLayout({ children }) {
    const { flash } = usePage().props;

    return (
        <div>
            <Navbar />

            <div className="d-flex" style={{ minHeight: "100vh" }}>
                <Sidebar />
                <main
                    className="flex-grow-1 bg-light"
                    style={{
                        marginLeft: 260, // ตรงกับ Sidebar
                        padding: "55px 24px 30px", // top, left-right, bottom
                        minHeight: "100vh",
                        overflowX: "hidden",
                    }}
                >
                    {flash?.success && (
                        <CAlert color="success" className="rounded-3 shadow-sm">
                            ✅ {flash.success}
                        </CAlert>
                    )}
                    {flash?.error && (
                        <CAlert color="danger" className="rounded-3 shadow-sm">
                            ❌ {flash.error}
                        </CAlert>
                    )}

                    {children}
                </main>
            </div>
        </div>
    );
}
