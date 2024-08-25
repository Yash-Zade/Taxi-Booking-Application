
INSERT INTO app_user (name, email, password)
VALUES
    ('Amit Sharma', 'amit.sharma@example.in', 'password1'),
    ('Neha Verma', 'neha.verma@example.in', 'password2'),
    ('Rohit Singh', 'rohit.singh@example.in', 'password3'),
    ('Priya Gupta', 'priya.gupta@example.in', 'password4'),
    ('Vikram Rao', 'vikram.rao@example.in', 'password5'),
    ('Kavita Iyer', 'kavita.iyer@example.in', 'password6'),
    ('Sandeep Mehta', 'sandeep.mehta@example.in', 'password7'),
    ('Anjali Nair', 'anjali.nair@example.in', 'password8'),
    ('Manoj Joshi', 'manoj.joshi@example.in', 'password9'),
    ('Sneha Desai', 'sneha.desai@example.in', 'password10'),
    ('Ravi Kumar', 'ravi.kumar@example.in', 'password11'),
    ('Pooja Sharma', 'pooja.sharma@example.in', 'password12'),
    ('Arjun Patel', 'arjun.patel@example.in', 'password13'),
    ('Megha Reddy', 'megha.reddy@example.in', 'password14'),
    ('Suresh Choudhary', 'suresh.choudhary@example.in', 'password15'),
    ('Anita Kapoor', 'anita.kapoor@example.in', 'password16'),
    ('Rajesh Thakur', 'rajesh.thakur@example.in', 'password17'),
    ('Vidya Menon', 'vidya.menon@example.in', 'password18'),
    ('Nikhil Jain', 'nikhil.jain@example.in', 'password19'),
    ('Ritu Bansal', 'ritu.bansal@example.in', 'password20');

INSERT INTO user_roles (user_id, roles)
VALUES
    (1, 'RIDER'),
    (2, 'DRIVER'),
    (2, 'RIDER'),
    (3, 'DRIVER'),
    (3, 'RIDER'),
    (4, 'DRIVER'),
    (4, 'RIDER'),
    (5, 'DRIVER'),
    (5, 'RIDER'),
    (6, 'DRIVER'),
    (6, 'RIDER'),
    (7, 'DRIVER'),
    (7, 'RIDER'),
    (8, 'DRIVER'),
    (8, 'RIDER'),
    (9, 'DRIVER'),
    (9, 'RIDER'),
    (10, 'DRIVER'),
    (10, 'RIDER'),
    (11, 'DRIVER'),
    (11, 'RIDER'),
    (12, 'DRIVER'),
    (12, 'RIDER'),
    (13, 'DRIVER'),
    (13, 'RIDER'),
    (14, 'DRIVER'),
    (14, 'RIDER'),
    (15, 'DRIVER'),
    (15, 'RIDER'),
    (16, 'DRIVER'),
    (16, 'RIDER'),
    (17, 'DRIVER'),
    (17, 'RIDER'),
    (18, 'DRIVER'),
    (18, 'RIDER'),
    (19, 'DRIVER'),
    (19, 'RIDER'),
    (20, 'DRIVER'),
    (20, 'RIDER');


INSERT INTO rider (id, user_id, rating)
VALUES
    (1, 1, 4.5);


INSERT INTO driver (user_id, rating, available, current_location)
VALUES
    (2, 4.2, TRUE, ST_GeomFromText('POINT(79.0882 21.1458)', 4326)),  -- Central Nagpur
    (3, 4.3, TRUE, ST_GeomFromText('POINT(79.0865 21.1376)', 4326)),  -- Near Futala Lake
    (4, 4.1, FALSE, ST_GeomFromText('POINT(79.0712 21.1449)', 4326)), -- Near Zero Mile
    (5, 4.4, TRUE, ST_GeomFromText('POINT(79.0555 21.1183)', 4326)),  -- Near Sitabuldi
    (6, 3.9, FALSE, ST_GeomFromText('POINT(79.0347 21.1304)', 4326)), -- Near Ambazari Lake
    (7, 4.5, TRUE, ST_GeomFromText('POINT(79.1045 21.1450)', 4326)),  -- Near Maharajbagh
    (8, 4.0, FALSE, ST_GeomFromText('POINT(79.0596 21.1587)', 4326)), -- Near Wadi
    (9, 4.6, TRUE, ST_GeomFromText('POINT(79.0860 21.1416)', 4326)),  -- Near Sadar
    (10, 4.1, TRUE, ST_GeomFromText('POINT(79.0977 21.1646)', 4326)), -- Near Seminary Hills
    (11, 4.7, FALSE, ST_GeomFromText('POINT(79.0733 21.1484)', 4326)),-- Near Nagpur Railway Station
    (12, 4.3, TRUE, ST_GeomFromText('POINT(79.0550 21.1252)', 4326)), -- Near Koradi
    (13, 4.2, FALSE, ST_GeomFromText('POINT(79.0362 21.1388)', 4326)),-- Near Khamla
    (14, 4.4, TRUE, ST_GeomFromText('POINT(79.0341 21.1605)', 4326)), -- Near Pardi
    (15, 4.0, TRUE, ST_GeomFromText('POINT(79.1014 21.1455)', 4326)), -- Near Mhalgi Nagar
    (16, 4.6, FALSE, ST_GeomFromText('POINT(79.0670 21.1463)', 4326)),-- Near Manish Nagar
    (17, 4.3, TRUE, ST_GeomFromText('POINT(79.0961 21.1640)', 4326)), -- Near Jafar Nagar
    (18, 4.2, FALSE, ST_GeomFromText('POINT(79.0659 21.1334)', 4326)),-- Near Ramdaspeth
    (19, 4.5, TRUE, ST_GeomFromText('POINT(79.0718 21.1582)', 4326)), -- Near Pratap Nagar
    (20, 4.1, TRUE, ST_GeomFromText('POINT(79.0710 21.1397)', 4326)); -- Near Bharat Nagar

INSERT INTO wallet (id, user_id, balance)
VALUES
    (1,1,100),
    (2,3,500);