import React, { useState } from "react";
import { router, Link } from "@inertiajs/react";
import MainLayout from "../../Layouts/MainLayout";
import { CContainer, CRow, CCol, CForm, CFormInput, CButton } from "@coreui/react";

export default function CustomerCreate() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post("/customers", form);
  };

  return (
    <MainLayout>
      <CContainer className="py-4">
        <h4>เพิ่มลูกค้าใหม่</h4>
        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CCol>
              <CFormInput
                label="ชื่อ"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <CFormInput
                label="อีเมล"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <CFormInput
                label="เบอร์โทร"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <CFormInput
                label="ที่อยู่"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </CCol>
          </CRow>

          <div className="d-flex gap-2">
            <CButton type="submit" color="primary">
              บันทึก
            </CButton>
            <Link href="/customers" className="btn btn-secondary">
              ยกเลิก
            </Link>
          </div>
        </CForm>
      </CContainer>
    </MainLayout>
  );
}
