-- ล้างข้อมูลเดิม (ถ้าใช้ SQLite/MySQL ที่รองรับ)
DELETE FROM purchase_items;
DELETE FROM purchase_histories;
DELETE FROM products;
DELETE FROM customers;

-- เพิ่มลูกค้า
INSERT INTO customers (id, name, email, phone, address, created_at, updated_at) VALUES
(1, 'Nia', 'nia@example.com', '0812345678', 'กรุงเทพฯ', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Kan', 'kan@example.com', '0823456789', 'เชียงใหม่', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Beam', 'beam@example.com', '0834567890', 'ขอนแก่น', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- เพิ่มสินค้า
INSERT INTO products (id, name, price, stock, created_at, updated_at) VALUES
(1, 'Mouse Wireless', 500.00, 100, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Keyboard Mechanical', 1500.00, 50, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Laptop 14"', 25000.00, 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- เพิ่มคำสั่งซื้อ (purchase_histories)
INSERT INTO purchase_histories (id, customer_id, created_at, updated_at) VALUES
(1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Nia
(2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Kan
(4, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); -- Beam

-- เพิ่มรายการสินค้าในแต่ละคำสั่งซื้อ (purchase_items)
INSERT INTO purchase_items (purchase_history_id, product_id, quantity, price, created_at, updated_at) VALUES
-- Nia
(1, 1, 2, 500.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),    -- Mouse x2
(1, 2, 1, 1500.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),   -- Keyboard x1
(2, 3, 1, 25000.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),  -- Laptop x1
(2, 1, 1, 500.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),    -- Mouse x1

-- Kan
(3, 2, 1, 1500.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),   -- Keyboard x1
(3, 1, 2, 500.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),    -- Mouse x2
(3, 3, 1, 25000.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),  -- Laptop x1

-- Beam
(4, 1, 3, 500.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),    -- Mouse x3
(4, 2, 1, 1500.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),   -- Keyboard x1
(4, 3, 1, 25000.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);  -- Laptop x1
