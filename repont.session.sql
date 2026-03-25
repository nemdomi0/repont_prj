
-- @block
create TABLE PRODUCTS(
    id BIGINT  PRIMARY KEY AUTO_INCREMENT,
    type_number VARCHAR(100),
    product_name VARCHAR(100)
    );

INSERT INTO PRODUCTS (type_number, product_name) VALUES
(483729, 'pepsi'),
(105836, 'cola'),
(792451, 'tonic'),
(638204, 'traubi'),
(517962, 'water'),
(294075, 'juice'),
(860341, 'hell'),
(731508, 'burn'),
(609217, 'coffee'),
(374680, 'icetea');

--  @block
create TABLE MACHINES(
    id VARCHAR(100) PRIMARY KEY,
    machine_name VARCHAR(100)
);
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



--@block
DROP TABLE users;
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255)
);


-- @block
DELETE FROM recycling
WHERE id > 0;



-- @block
CREATE INDEX idx_product ON recycling(product);
CREATE INDEX idx_machine ON recycling(machine);
CREATE INDEX idx_event_time ON recycling(event_time);
CREATE INDEX idx_full ON recycling(product, machine, event_time);


-- @block
DROP TABLE cache;
DROP TABLE cache_locks;
DROP TABLE failed_jobs;
DROP TABLE jobs;
DROP TABLE job_batches;
DROP TABLE password_reset_tokens;




