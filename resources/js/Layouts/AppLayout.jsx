import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppLayout({ children }) {
    return (
        <div className="d-flex min-vh-100">
            <Sidebar />
            <div className="flex-grow-1">
                <Navbar />
                <main className="p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}
