
-- @block

create TABLE PRODUCTS(
    id BIGINT  PRIMARY KEY AUTO_INCREMENT,
    type_number VARCHAR(100),
    product_name VARCHAR(100)
    );

-- @block

create TABLE RECYCLING(
    id BIGINT PRIMARY KEY AUTO_INCREMENT ,
    machine VARCHAR(100),
    product BIGINT,
    event_type ENUM('success', 'error', 'warning'),
    event_time DATE
        CHECK (event_time BETWEEN '2025-01-01 00:00:00'
                      AND '2025-04-01 23:59:59'),
    Foreign Key (product) REFERENCES PRODUCTS(id),
    Foreign Key (machine) REFERENCES MACHINES(id)
 );

-- @block
DROP TABLE MACHINES

--  @block
create TABLE MACHINES(
    id VARCHAR(100) PRIMARY KEY,
    machine_name VARCHAR(100)
)

-- @block
INSERT INTO machines (id, machine_name) VALUES
('1a0', 'Alpha'),
('1a1', 'Beta'),
('1a2', 'Gamma'),
('1a3', 'Delta'),
('1a4', 'Epsilon'),
('1a5', 'Zeta'),
('1a6', 'Eta'),
('1a7', 'Theta'),
('1a8', 'Iota'),
('1a9', 'Kappa');

-- @block
ALTER TABLE recycling
DROP COLUMN machine_id;

-- @block
DELETE FROM recycling
WHERE id > 0;