import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import {
    CContainer,
    CCard,
    CCardHeader,
    CCardBody,
    CTable,
    CTableHead,
    CTableBody,
    CTableRow,
    CTableHeaderCell,
    CTableDataCell,
} from "@coreui/react";
import PageHeader from "@/Components/PageHeader";

export default function PurchaseHistory({ customer, purchases }) {
    const totalAll = purchases.reduce((sum, purchase) => {
        return sum + purchase.items.reduce((s, i) => s + i.quantity * i.price, 0);
    }, 0);

    return (
        <MainLayout>
            <CContainer fluid className="p-4">
                <PageHeader
                    title={`ประวัติการซื้อของ ${customer.name}`}
                    breadcrumbs={[
                        { label: "ลูกค้า", href: "/customers" },
                        { label: `ประวัติ: ${customer.name}` },
                    ]}
                />

                {purchases.length > 0 && (
                    <div className="text-end text-success fw-bold fs-5 mb-3">
                        🧾 ยอดรวมทั้งหมด: {totalAll.toLocaleString()} บาท
                    </div>
                )}

                <CCard className="shadow-sm border-0 mt-3">
                    <CCardHeader className="bg-light fw-bold fs-5">
                        รายการคำสั่งซื้อทั้งหมด
                    </CCardHeader>
                    <CCardBody>
                        {purchases.length === 0 ? (
                            <div className="text-center text-muted py-4">
                                🙁 ยังไม่มีคำสั่งซื้อจากลูกค้ารายนี้
                            </div>
                        ) : (
                            purchases.map((purchase) => {
                                const purchaseTotal = purchase.items.reduce(
                                    (sum, item) => sum + item.quantity * item.price,
                                    0
                                );

                                return (
                                    <div key={purchase.id} className="mb-4 border-bottom pb-3">
                                        <h6 className="fw-semibold mb-2 text-primary">
                                            📦 คำสั่งซื้อ #{purchase.id} — วันที่{" "}
                                            {new Date(purchase.created_at).toLocaleDateString("th-TH", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </h6>

                                        <CTable striped responsive bordered small hover>
                                            <CTableHead color="secondary">
                                                <CTableRow className="text-center">
                                                    <CTableHeaderCell>#</CTableHeaderCell>
                                                    <CTableHeaderCell>สินค้า</CTableHeaderCell>
                                                    <CTableHeaderCell>จำนวน</CTableHeaderCell>
                                                    <CTableHeaderCell>ราคา/หน่วย (บาท)</CTableHeaderCell>
                                                </CTableRow>
                                            </CTableHead>
                                            <CTableBody>
                                                {purchase.items.map((item, idx) => (
                                                    <CTableRow key={item.id}>
                                                        <CTableDataCell className="text-center">
                                                            {idx + 1}
                                                        </CTableDataCell>
                                                        <CTableDataCell>{item.product?.name ?? '-'}</CTableDataCell>
                                                        <CTableDataCell className="text-center">
                                                            {item.quantity}
                                                        </CTableDataCell>
                                                        <CTableDataCell className="text-end">
                                                            {item.price.toLocaleString()}
                                                        </CTableDataCell>
                                                    </CTableRow>
                                                ))}
                                            </CTableBody>
                                        </CTable>

                                        <div className="text-end mt-2 fw-semibold text-dark">
                                            💳 รวมคำสั่งซื้อ: {purchaseTotal.toLocaleString()} บาท
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </CCardBody>
                </CCard>
            </CContainer>
        </MainLayout>
    );
}
