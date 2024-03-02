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

-- Table Exercise
INSERT INTO COACHIFY.Exercise (name, description, video_link, GIF_link, level) VALUES
('Squat', 'Exercice de musculation pour les jambes et les fessiers', 'example', 'example', 2),
('Pompe', 'Exercice de musculation pour le haut du corps', 'example', 'example', 1),
('Fente avant', 'Exercice de musculation pour les jambes et les fessiers', 'example', 'example', 2),
('Crunch', 'Exercice de musculation pour les abdominaux', 'example', 'example', 1),
('Dips', 'Exercice de musculation pour les triceps', 'example', 'example', 2);

-- Table Muscle
INSERT INTO COACHIFY.Muscle (muscle_name, muscle_group, function) VALUES
('Quadriceps', 'Jambes', 'Extension du genou'),
('Ischio-jambiers', 'Jambes', 'Flexion du genou'),
('Fessiers', 'Jambes', 'Extension, abduction, rotation externe de la hanche'),
('Pectoraux', 'Dos', 'Adduction, flexion du bras'),
('Dos', 'Dos', 'Extension, flexion latérale du tronc'),
('Épaules', 'Épaules', 'Abduction, flexion, rotation externe du bras'),
('Biceps', 'Bras', 'Flexion du coude'),
('Triceps', 'Bras', 'Extension du coude'),
('Abdominaux', 'Tronc', 'Flexion du tronc');

-- Table Targets
INSERT INTO COACHIFY.Targets (exercise_id, muscle_name) VALUES
(1, 'Quadriceps'),
(1, 'Ischio-jambiers'),
(1, 'Fessiers'),
(2, 'Pectoraux'),
(2, 'Triceps'),
(3, 'Fessiers'),
(3, 'Quadriceps'),
(4, 'Abdominaux'),
(5, 'Triceps'),
(5, 'Pectoraux');

