import React from "react";
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardTitle,
} from "@coreui/react";
import MainLayout from "../Layouts/MainLayout";
import { CIcon } from "@coreui/icons-react";
import { cilUser, cilDollar } from "@coreui/icons";

export default function Dashboard() {
  return (
    <MainLayout>
      <CContainer fluid className="px-4 py-4">
        <h4 className="mb-4 fw-bold text-dark">ภาพรวมระบบ</h4>
        <CRow>
          {/* Card: ลูกค้าทั้งหมด */}
          <CCol xs={12} md={6} xl={4} className="mb-4">
            <CCard className="shadow-sm border-0 rounded-4">
              <CCardBody>
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex justify-content-center align-items-center" style={{ width: 48, height: 48 }}>
                    <CIcon icon={cilUser} size="lg" />
                  </div>
                  <div>
                    <CCardTitle className="fw-semibold text-muted mb-1">ลูกค้าทั้งหมด</CCardTitle>
                    <h2 className="m-0 text-primary fw-bold">120</h2>
                  </div>
                </div>
              </CCardBody>
            </CCard>
          </CCol>

          {/* Card: ยอดขายวันนี้ */}
          <CCol xs={12} md={6} xl={4} className="mb-4">
            <CCard className="shadow-sm border-0 rounded-4">
              <CCardBody>
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-success bg-opacity-10 text-success rounded-circle d-flex justify-content-center align-items-center" style={{ width: 48, height: 48 }}>
                    <CIcon icon={cilDollar} size="lg" />
                  </div>
                  <div>
                    <CCardTitle className="fw-semibold text-muted mb-1">ยอดขายวันนี้</CCardTitle>
                    <h2 className="m-0 text-success fw-bold">฿23,500</h2>
                  </div>
                </div>
                <p className="mt-3 mb-1 text-muted">ยินดีต้อนรับเข้าสู่ระบบ</p>
                <p className="mb-0 font-sans">Hello, ระบบจัดการลูกค้า (CRM) ของคุณพร้อมใช้งานแล้วนะคะ 🎉</p>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </MainLayout>
  );
}
