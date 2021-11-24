INSERT INTO users (name, email, password)
VALUES ("Timothy Vallien", 'tim@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
("Helmer Rodriguez", 'Rodriguez@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
("Talon Gottlieb", 'Talon@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u')
("Jadyn Bosco", 'Bosco@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u')
("Alessia Zemlak", 'AlessiaZemlak@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u')
("Preston Auer", 'Preston@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u')
("Roberto Towne", 'Roberto@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u')


INSERT INTO proerties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'description', ' https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', ' https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 230,  2, 2, 4, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', 90876, true),
(2 'description', ' https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', ' https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 550,  3, 3, 6, 'Canada', '549 Henry Highway', 'Bohbatev ', 'Ontario', 98376, true),
(4, 'description', ' https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', ' https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 440,  2, 4, 6, 'Canada', ' 513 Powov Grove', 'Genwezuj', 'Manitoba', 36726, true),
(4, 'description', ' https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', ' https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 600,  0, 2, 5, 'Canada', '513 Powov Grove', 'Jaebvap', 'PEI', 74886, true),
(6, 'description', ' https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', ' https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 1200,  2, 2, 6, 'Canada', '834 Buwmi Road ', 'Vutgapha', 'Ontario', 54876, true),
(3, 'description', ' https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', ' https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 6700,  4, 3, 4, 'Canada', '834 Buwmi Road ', 'Rotunif ', 'Ontario', 90076, true),
(5, 'description', ' https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', ' https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 2830,  2, 4, 3, 'Canada', ' 1650 Hejto Center', 'Sotboske', 'Quebec', 12876, true)


INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES  (2018-09-11, 2018-09-26, 2 , 3),
(2017-04-18, 2017-09-25, 1 , 2),
(2012-05-04, 2013-09-22, 4 , 4),
(2011-10-15, 2012-09-23, 3 , 3),
(2020-01-09, 2021-09-22, 3 , 6),
(2014-02-15, 2015-09-21, 6 , 5),
(2019-06-21, 2020-09-26, 5 , 1)


INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 5, 10, 3, 'message'),
(2, 4, 1, 3, 'message'),
(7, 5, 2, 5, 'message'),
(3, 7, 2, 3, 'message'),
(4, 4, 1, 4, 'message'),
(5, 1, 3, 2, 'message'),
(4, 6, 5, 3, 'message')