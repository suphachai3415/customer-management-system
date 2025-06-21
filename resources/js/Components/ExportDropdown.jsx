import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FaDownload } from "react-icons/fa";

export default function ExportDropdown() {
  return (
    <Dropdown className="me-2"> {/* เว้นระยะด้านขวา */}
      <Dropdown.Toggle
        variant="light"
        id="dropdown-export"
        className="d-flex align-items-center gap-2 shadow-sm"
        style={{
          border: "1px solid #ddd",
          fontWeight: 500,
          borderRadius: "6px",        // ปรับความโค้ง
          padding: "4px 10px",         // ปรับให้เล็กลง
          fontSize: "0.875rem",        // ปรับขนาดตัวหนังสือ
          height: "36px",              // ลดความสูงโดยรวม
        }}
      >
        <FaDownload style={{ fontSize: "0.9rem" }} />
        Export
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href={route("customers.export.csv")}>CSV File</Dropdown.Item>
        <Dropdown.Item href={route("customers.export.excel")}>Excel File</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
