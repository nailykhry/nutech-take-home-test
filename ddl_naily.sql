-- Database: `nutech`

-- Table `banners`
CREATE TABLE `banners` (
    `id` int(11) NOT NULL,
    `banner_name` varchar(255) NOT NULL,
    `banner_image` varchar(255) NOT NULL,
    `description` varchar(255) NOT NULL
);

INSERT INTO
    `banners` (
        `id`,
        `banner_name`,
        `banner_image`,
        `description`
    )
VALUES (
        1,
        'Banner 1',
        'https://nutech-integrasi.app/dummy.jpg',
        'Lerem Ipsum Dolor sit amet'
    ),
    (
        2,
        'Banner 2',
        'https://nutech-integrasi.app/dummy.jpg',
        'Lerem Ipsum Dolor sit amet'
    ),
    (
        3,
        'Banner 3',
        'https://nutech-integrasi.app/dummy.jpg',
        'Lerem Ipsum Dolor sit amet'
    ),
    (
        4,
        'Banner 4',
        'https://nutech-integrasi.app/dummy.jpg',
        'Lerem Ipsum Dolor sit amet'
    ),
    (
        5,
        'Banner 5',
        'https://nutech-integrasi.app/dummy.jpg',
        'Lerem Ipsum Dolor sit amet'
    ),
    (
        6,
        'Banner 6',
        'https://nutech-integrasi.app/dummy.jpg',
        'Lerem Ipsum Dolor sit amet'
    );

-- --------------------------------------------------------

-- Table `members`

CREATE TABLE `members` (
    `id` int(11) NOT NULL,
    `email` varchar(255) NOT NULL,
    `first_name` varchar(255) NOT NULL,
    `last_name` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `profile_image` varchar(255) DEFAULT NULL
);

-- Table `services`
CREATE TABLE `services` (
    `id` int(11) NOT NULL,
    `service_code` varchar(15) NOT NULL,
    `service_name` varchar(255) NOT NULL,
    `service_icon` varchar(255) NOT NULL,
    `service_tariff` int(11) NOT NULL
);

INSERT INTO
    `services` (
        `id`,
        `service_code`,
        `service_name`,
        `service_icon`,
        `service_tariff`
    )
VALUES (
        1,
        'PAJAK',
        'Pajak PBB',
        'https://nutech-integrasi.app/dummy.jpg',
        40000
    ),
    (
        2,
        'PLN',
        'Listrik',
        'https://nutech-integrasi.app/dummy.jpg',
        10000
    ),
    (
        3,
        'PDAM',
        'PDAM Berlangganan',
        'https://nutech-integrasi.app/dummy.jpg',
        40000
    ),
    (
        4,
        'PULSA',
        'Pulsa',
        'https://nutech-integrasi.app/dummy.jpg',
        40000
    ),
    (
        5,
        'PGN',
        'PGN Berlangganan',
        'https://nutech-integrasi.app/dummy.jpg',
        50000
    ),
    (
        6,
        'MUSIK',
        'Musik Berlangganan',
        'https://nutech-integrasi.app/dummy.jpg',
        50000
    ),
    (
        7,
        'TV',
        'TV Berlangganan',
        'https://nutech-integrasi.app/dummy.jpg',
        50000
    ),
    (
        8,
        'PAKET_DATA',
        'Paket data',
        'https://nutech-integrasi.app/dummy.jpg',
        50000
    ),
    (
        9,
        'VOUCHER_GAME',
        'Voucher Game',
        'https://nutech-integrasi.app/dummy.jpg',
        100000
    ),
    (
        10,
        'VOUCHER_MAKANAN',
        'Voucher Makanan',
        'https://nutech-integrasi.app/dummy.jpg',
        100000
    ),
    (
        11,
        'QURBAN',
        'Qurban',
        'https://nutech-integrasi.app/dummy.jpg',
        200000
    ),
    (
        12,
        'ZAKAT',
        'Zakat',
        'https://nutech-integrasi.app/dummy.jpg',
        300000
    );

-- Table `transactions`
CREATE TABLE `transactions` (
    `id` int(11) NOT NULL,
    `invoice_number` varchar(15) NOT NULL,
    `email` varchar(255) NOT NULL,
    `transaction_type` varchar(15) NOT NULL,
    `description` varchar(255) NOT NULL,
    `total_amount` int(11) NOT NULL,
    `created_on` datetime DEFAULT current_timestamp()
);

-- Table `wallets`
CREATE TABLE `wallets` (
    `id` int(11) NOT NULL,
    `email` varchar(255) NOT NULL,
    `balance` int(11) NOT NULL
);
-- Indexes table `banners`
ALTER TABLE `banners` ADD PRIMARY KEY (`id`);
-- Indexes table `members`
ALTER TABLE `members`
ADD PRIMARY KEY (`id`),
ADD UNIQUE KEY `email` (`email`);
-- Indexes table `services`
ALTER TABLE `services` ADD PRIMARY KEY (`id`);
-- Indexes table `transactions`
ALTER TABLE `transactions`
ADD PRIMARY KEY (`id`),
ADD UNIQUE KEY `invoice_number` (`invoice_number`),
ADD KEY `fk_transaction_member_email` (`email`);

-- Indexes table `wallets`
ALTER TABLE `wallets`
ADD PRIMARY KEY (`id`),
ADD KEY `fk_wallets_member_email` (`email`);

ALTER TABLE `banners`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 7;

ALTER TABLE `members` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `services`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 13;

ALTER TABLE `transactions`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `wallets` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `transactions`
ADD CONSTRAINT `fk_transaction_member_email` FOREIGN KEY (`email`) REFERENCES `members` (`email`) ON DELETE CASCADE;

ALTER TABLE `wallets`
ADD CONSTRAINT `fk_wallets_member_email` FOREIGN KEY (`email`) REFERENCES `members` (`email`) ON DELETE CASCADE;