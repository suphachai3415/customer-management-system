import React, { useState, useEffect, useRef } from "react";
import { router } from "@inertiajs/react";
import { usePage, Link } from "@inertiajs/react";
// ใช้ usePage กับ Link
import { CContainer, CRow, CCol, CButton, CTooltip } from "@coreui/react";
import MainLayout from "../../Layouts/MainLayout";
import { FaUserPlus, FaPen, FaTrash, FaFileInvoice } from "react-icons/fa";
import ExportDropdown from "@/Components/ExportDropdown";
import PageHeader from "@/Components/ExportDropdown";
import { Toaster, toast } from "react-hot-toast";

export default function Index() {
    // 1. ดึงทั้ง customers และ filters มาจาก page.props
    const { customers, filters, flash } = usePage().props;

    const [search, setSearch] = useState(filters.search || "");
    const [suggestions, setSuggestions] = useState([]);
    const debouncer = useRef(null);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    useEffect(() => {
        if (debouncer.current) clearTimeout(debouncer.current);
        if (!search) {
            setSuggestions([]);
            return;
        }
        debouncer.current = setTimeout(() => {
            fetch(`/customers/autocomplete?q=${encodeURIComponent(search)}`)
                .then((r) => r.json())
                .then((data) => setSuggestions(data))
                .catch(() => setSuggestions([]));
        }, 300);
    }, [search]);

    function handleSubmit(e) {
        e.preventDefault();
        setSuggestions([]);
        router.get(
            "/customers",
            { search },
            {
                preserveState: true,
                replace: true,
                onSuccess: () => setSearch(""), // เคลียร์ input เมื่อโหลดเสร็จ
            }
        );
    }

    function selectSuggestion(name) {
        setSuggestions([]);
        router.get(
            "/customers",
            { search: name },
            {
                preserveState: true,
                replace: true,
                onSuccess: () => setSearch(""), // เคลียร์ input เมื่อโหลดเสร็จ
            }
        );
    }

    return (
        <MainLayout>
            <Toaster position="top-center" />
            <CContainer fluid className="p-4">
                <CRow className="mb-4 align-items-center justify-content-between">
                    <CCol>
                        <PageHeader
                            title="Customer"
                            breadcrumbs={[
                                { label: "ลูกค้า", href: "/customers" },
                            ]}
                        />
                    </CCol>
                    <CCol xs="auto">
                        <div className="d-flex align-items-center gap-2">
                            <ExportDropdown />
                            <Link
                                href={route("customers.create")}
                                style={{ textDecoration: "none" }}
                            >
                                <CButton
                                    color="primary"
                                    className="rounded-pill px-3 d-flex align-items-center gap-2"
                                >
                                    <FaUserPlus />
                                    Add customer
                                </CButton>
                            </Link>
                        </div>
                    </CCol>
                </CRow>

                {/* Search Form */}
                <form
                    onSubmit={handleSubmit}
                    className="position-relative mb-3"
                >
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name or phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="btn btn-outline-primary mt-2"
                    >
                        Search
                    </button>
                    {suggestions.length > 0 && (
                        <ul
                            className="list-group position-absolute w-100"
                            style={{ zIndex: 1000 }}
                        >
                            {suggestions.map((s) => (
                                <li
                                    key={s.id}
                                    className="list-group-item list-group-item-action"
                                    onClick={() => selectSuggestion(s.name)}
                                >
                                    {s.name} — {s.phone}
                                </li>
                            ))}
                        </ul>
                    )}
                </form>

                {/* Table */}
                <div
                    className="table-responsive rounded shadow-sm p-3 bg-white"
                    style={{ maxHeight: "60vh", overflowY: "auto" }}
                >
                    <table className="table table-hover table-sm mb-0">
                        <thead className="bg-light">
                            <tr className="text-center">
                                <th>#</th>
                                <th>ชื่อ</th>
                                <th>อีเมล</th>
                                <th>เบอร์โทร</th>
                                <th>ที่อยู่</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.data.length > 0 ? (
                                customers.data.map((c, i) => (
                                    <tr
                                        key={c.id}
                                        className="align-middle text-center"
                                    >
                                        <td>
                                            {(customers.current_page - 1) *
                                                customers.per_page +
                                                i +
                                                1}
                                        </td>
                                        <td className="text-start">{c.name}</td>
                                        <td className="text-start">
                                            {c.email}
                                        </td>
                                        <td>{c.phone}</td>
                                        <td className="text-start">
                                            {c.address}
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center gap-2 justify-content-center">
                                                <CTooltip
                                                    content="Edit"
                                                    placement="top"
                                                >
                                                    <Link
                                                        href={route(
                                                            "customers.edit",
                                                            c.id
                                                        )}
                                                        className="btn btn-sm btn-light border border-secondary-subtle rounded-circle text-primary"
                                                        style={{
                                                            width: "32px",
                                                            height: "32px",
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                    >
                                                        <FaPen size={14} />
                                                    </Link>
                                                </CTooltip>
                                                <CTooltip
                                                    content="Delete"
                                                    placement="top"
                                                >
                                                    <button
                                                        className="btn btn-sm btn-light border border-secondary-subtle rounded-circle text-danger"
                                                        style={{
                                                            width: "32px",
                                                            height: "32px",
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                        onClick={() => {
                                                            if (
                                                                confirm(
                                                                    "ลบใช่หรือไม่?"
                                                                )
                                                            ) {
                                                                router.post(
                                                                    route(
                                                                        "customers.delete.viaPost",
                                                                        {
                                                                            id: c.id,
                                                                        }
                                                                    ),
                                                                    {},
                                                                    {
                                                                        onSuccess:
                                                                            () =>
                                                                                toast.success(
                                                                                    "ลบลูกค้าเรียบร้อยแล้ว"
                                                                                ),
                                                                    }
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <FaTrash size={14} />
                                                    </button>
                                                </CTooltip>

                                                <CTooltip
                                                    content="View purchases"
                                                    placement="top"
                                                >
                                                    <Link
                                                        href={route(
                                                            "customers.purchases",
                                                            c.id
                                                        )}
                                                        className="btn btn-sm btn-light border border-secondary-subtle rounded-circle text-secondary"
                                                        style={{
                                                            width: "32px",
                                                            height: "32px",
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                    >
                                                        <FaFileInvoice
                                                            size={14}
                                                        />
                                                    </Link>
                                                </CTooltip>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center text-muted py-4"
                                    >
                                        🙁 ไม่มีข้อมูลลูกค้าในระบบ
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </CContainer>
        </MainLayout>
    );
}
