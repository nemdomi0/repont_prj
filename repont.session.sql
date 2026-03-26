
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
    machine_name VARCHAR(100),
    location VARCHAR(100),
    installation_time DATETIME
);
INSERT INTO machines (id, machine_name, location, installation_time) VALUES
('1a0', 'Alpha', 'Location A', '2023-01-01 00:00:00'),
('1a1', 'Beta', 'Location B', '2023-02-01 00:00:00'),
('1a2', 'Gamma', 'Location C', '2023-03-01 00:00:00'),
('1a3', 'Delta', 'Location D', '2023-04-01 00:00:00'),
('1a4', 'Epsilon', 'Location E', '2023-05-01 00:00:00'),
('1a5', 'Zeta', 'Location F', '2023-06-01 00:00:00'),
('1a6', 'Eta', 'Location G', '2023-07-01 00:00:00'),
('1a7', 'Theta', 'Location H', '2023-08-01 00:00:00'),
('1a8', 'Iota', 'Location I', '2023-09-01 00:00:00'),
('1a9', 'Kappa', 'Location J', '2023-10-01 00:00:00');


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
WHERE id > 100101;


-- @block
CREATE INDEX idx_product ON recycling(product);
CREATE INDEX idx_machine ON recycling(machine);
CREATE INDEX idx_event_time ON recycling(event_time);
CREATE INDEX idx_full ON recycling(product, machine, event_time);

