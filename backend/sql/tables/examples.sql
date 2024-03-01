-- Table User
INSERT INTO COACHIFY.User (name, email, password, birthdate, height, activity) VALUES
  ('Alice', 'alice@example.com', 'password123', '1990-01-01', 170, 3),
  ('Bob', 'bob@example.com', 'password456', '1985-05-15', 185, 4),
  ('Charlie', 'charlie@example.com', 'password789', '1995-12-31', 165, 2),
  ('Diana', 'diana@example.com', 'password012', '2000-08-22', 175, 5),
  ('Ethan', 'ethan@example.com', 'password345', '1992-03-07', 190, 1);

-- Table Weight
INSERT INTO COACHIFY.Weight (user_id, weight_value, date) VALUES
  (1, 65.0, '2023-11-14'),
  (1, 64.5, '2023-12-01'),
  (2, 78.0, '2023-11-14'),
  (2, 77.5, '2023-12-01'),
  (3, 58.0, '2023-11-14'),
  (3, 57.5, '2023-12-01'),
  (4, 70.0, '2023-11-14'),
  (4, 69.5, '2023-12-01'),
  (5, 85.0, '2023-11-14'),
  (5, 84.5, '2023-12-01');