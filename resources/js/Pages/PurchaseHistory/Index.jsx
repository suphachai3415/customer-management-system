import React, { useState, useMemo } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { FaSearch } from "react-icons/fa";

export default function Index({ histories = [] }) {
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        const keyword = search.toLowerCase();
        return histories.filter((h) => {
            return (
                h.customer?.name?.toLowerCase().includes(keyword) ||
                h.product?.name?.toLowerCase().includes(keyword) ||
                h.purchased_at?.toLowerCase().includes(keyword)
            );
        });
    }, [search, histories]);

    return (
        <MainLayout>
            <div className="p-4">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                    ประวัติการซื้อทั้งหมด
                </h2>

                {/* Search Input */}
                <div className="relative w-full max-w-md mb-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ค้นหาลูกค้า, สินค้า หรือวันที่"
                        className="w-full pl-4 pr-10 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FaSearch
                        size={16}
                        className="absolute right-3 top-2.5 text-gray-400"
                    />
                </div>

                {/* Table with vertical scroll */}
                <div className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
                    <div className="overflow-y-auto max-h-[500px]">
                        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
                            <thead className="bg-gray-100 text-gray-800 sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-3 text-left">#</th>
                                    <th className="px-4 py-3 text-left">
                                        ลูกค้า
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        สินค้า
                                    </th>
                                    <th className="px-4 py-3 text-center">
                                        จำนวน
                                    </th>
                                    <th className="px-4 py-3 text-right">
                                        ราคารวม
                                    </th>
                                    <th className="px-4 py-3 text-center">
                                        วันที่ซื้อ
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center text-gray-400 py-4"
                                        >
                                            ไม่พบข้อมูลที่ตรงกับ "{search}"
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((h, i) => (
                                        <tr
                                            key={h.id}
                                            className="hover:bg-blue-50"
                                        >
                                            <td className="px-4 py-2">
                                                {i + 1}
                                            </td>
                                            <td className="px-4 py-2">
                                                {h.purchase_history?.customer
                                                    ?.name ?? "-"}
                                            </td>
                                            <td className="px-4 py-2">
                                                {h.product?.name}
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                {h.quantity}
                                            </td>
                                            <td className="px-4 py-2 text-right">
                                                ฿{" "}
                                                {Number(
                                                    h.price * h.quantity
                                                ).toFixed(2)}
                                            </td>

                                            <td className="px-4 py-2 text-center">
                                                {new Date(
                                                    h.created_at
                                                ).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
