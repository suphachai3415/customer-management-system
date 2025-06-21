import React from "react";
import { useForm, Link } from "@inertiajs/react";
import {
    CContainer,
    CForm,
    CFormInput,
    CFormLabel,
    CInputGroup,
    CInputGroupText,
} from "@coreui/react";
import MainLayout from "@/Layouts/MainLayout";
import { FaUser, FaEnvelope, FaPhone, FaHome } from "react-icons/fa";



export default function Edit({ customer }) {
    const { data, setData, post, processing, errors } = useForm({
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        address: customer.address || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();


        post(route('customers.update.viaPost', customer.id), {
            preserveScroll: true,
            onSuccess: () => {
                console.log("อัปเดตสำเร็จ");
            },
            onError: () => {
                console.log("อัปเดตไม่สำเร็จ");
            },
        });
    };

    return (
        <MainLayout>
            <CContainer className="p-4">
                <h4>แก้ไขข้อมูลลูกค้า</h4>
                <CForm onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* ชื่อ */}
                    <div className="mb-3">
                        <CFormLabel>ชื่อ</CFormLabel>
                        <CInputGroup>
                            <CInputGroupText>
                                <FaUser />
                            </CInputGroupText>
                            <CFormInput
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                invalid={!!errors.name}
                            />
                        </CInputGroup>
                        {errors.name && (
                            <div className="text-danger">{errors.name}</div>
                        )}
                    </div>

                    {/* อีเมล */}
                    <div className="mb-3">
                        <CFormLabel>อีเมล</CFormLabel>
                        <CInputGroup>
                            <CInputGroupText>
                                <FaEnvelope />
                            </CInputGroupText>
                            <CFormInput
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                invalid={!!errors.email}
                            />
                        </CInputGroup>
                        {errors.email && (
                            <div className="text-danger">{errors.email}</div>
                        )}
                    </div>

                    {/* เบอร์โทร */}
                    <div className="mb-3">
                        <CFormLabel>เบอร์โทร</CFormLabel>
                        <CInputGroup>
                            <CInputGroupText>
                                <FaPhone />
                            </CInputGroupText>
                            <CFormInput
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                invalid={!!errors.phone}
                            />
                        </CInputGroup>
                        {errors.phone && (
                            <div className="text-danger">{errors.phone}</div>
                        )}
                    </div>

                    {/* ที่อยู่ */}
                    <div className="mb-3">
                        <CFormLabel>ที่อยู่</CFormLabel>
                        <CInputGroup>
                            <CInputGroupText>
                                <FaHome />
                            </CInputGroupText>
                            <CFormInput
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                invalid={!!errors.address}
                            />
                        </CInputGroup>
                        {errors.address && (
                            <div className="text-danger">{errors.address}</div>
                        )}
                    </div>

                    {/* ปุ่ม */}
                    <div className="d-flex justify-content-between">
                        <Link
                            href={route("customers.index")}
                            className="btn btn-outline-secondary"
                        >
                            ยกเลิก
                        </Link>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={processing}
                        >
                            บันทึก
                        </button>
                    </div>
                </CForm>
            </CContainer>
        </MainLayout>
    );
}
