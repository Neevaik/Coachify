-- Table User
INSERT INTO COACHIFY.User (name, email, password, birthdate, height, activity, gender) VALUES
  ('Alice', 'alice@example.com', 'password123', '1990-01-01', 170, 3, 'F'),
  ('Bob', 'bob@example.com', 'password456', '1985-05-15', 185, 4, 'M'),
  ('Charlie', 'charlie@example.com', 'password789', '1995-12-31', 165, 2, 'F'),
  ('Diana', 'diana@example.com', 'password012', '2000-08-22', 175, 5, 'F'),
  ('Ethan', 'ethan@example.com', 'password345', '1992-03-07', 190, 1, 'M');

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
INSERT INTO COACHIFY.Exercise (name, description, video_link, GIF_link, level, type, MET) VALUES
('Squat', 'Exercice de musculation pour les jambes et les fessiers', 'example', 'example', 2, 'reps', 10),
('Pompe', 'Exercice de musculation pour le haut du corps', 'example', 'example', 1,  'reps',10),
('Fente avant', 'Exercice de musculation pour les jambes et les fessiers', 'example', 'example', 2, 'reps',10),
('Crunch', 'Exercice de musculation pour les abdominaux', 'example', 'example', 1, 'reps',10),
('Dips', 'Exercice de musculation pour les triceps', 'example', 'example', 2, 'reps',10);

-- Table Muscle
INSERT INTO COACHIFY.Muscle (muscle_name, muscle_group, function) VALUES
('Quadriceps', 'Jambes', 'Extension du genou'),
('Ischio-jambiers', 'Jambes', 'Flexion du genou'),
('Fessiers', 'Jambes', 'Extension, abduction, rotation externe de la hanche'),
('Pectoraux', 'Dos', 'Adduction, flexion du bras'),
('Dos', 'Dos', 'Extension, flexion laterale du tronc'),
('epaules', 'epaules', 'Abduction, flexion, rotation externe du bras'),
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

-- Table Conversation
INSERT INTO COACHIFY.Conversation (user_id, date_created, subject) VALUES
(1, '2024-03-02 17:10:00', 'Question sur la frequence des entraînements'),
(2, '2024-03-02 17:20:00', 'Question sur les abdominaux'),
(1, '2024-03-02 17:51:00', 'Question sur les performances');

-- Table Message
INSERT INTO COACHIFY.Message (conversation_id, user_id, content, author, timestamp) VALUES
(1, 1, 'Salut TrainerBot ! J''ai une question concernant mon entrainement. A quelle frequence dois-je les realiser ?', 'user', '2024-03-02 17:10:00'),
(1, 1, 'Comme precise lors de la creation de votre programme, la frequence ideale pour vos entraînements est de 3 a 5 fois par semaine.', 'model', '2024-03-02 17:10:12'),
(1, 1, 'Merci beaucoup !', 'user', '2024-03-02 17:10:41'),
(2, 2, 'Comment faire des abdominaux ?', 'user', '2024-03-02 17:20:00'),
(2, 2, 'Allongez vous sur le dos sur un tapis de yoga, pliez vos genoux ecartes a largeur des epaules. Gardez votre dos plat sur le sol tout en contractant vos muscles abdominaux.', 'model', '2024-03-02 17:20:16'),
(2, 2, 'Super, merci !', 'user', '2024-03-02 17:20:53'),
(3, 1, 'Que penses-tu de mes performances aujourd''hui ?', 'user', '2024-03-02 17:51:00');


-- Table Program
--    Programme 1: Débutant
INSERT INTO COACHIFY.Program (name, period, description,  AI_generated) VALUES
('Débutant', 30, 'Programme de musculation pour débutants', True);
INSERT INTO COACHIFY.Program_objectives (training_program_id, objective) VALUES
(1, 'To gain muscle');

--    Programme 2: Intermédiaire
INSERT INTO COACHIFY.Program (name, period, description,  AI_generated) VALUES
('Intermédiaire', 30, 'Programme de musculation pour intermédiaires', True);
INSERT INTO COACHIFY.Program_objectives (training_program_id, objective) VALUES
(2, 'To gain muscle');
--    Programme 3: Avancé
INSERT INTO COACHIFY.Program (name, period, description,  AI_generated) VALUES
('Avancé', 30, 'Programme de musculation pour confirmés', True);
INSERT INTO COACHIFY.Program_objectives (training_program_id, objective) VALUES
(3, 'To tone up');
-- Table Follows_program
INSERT INTO COACHIFY.Follows_program (user_id, training_program_id, start_date) VALUES
(1, 1, '2024-03-08'),  -- Alice - Débutant
(2, 2, '2024-03-08'),  -- Bob - Intermédiaire
(3, 3, '2024-03-08'),  -- Charlie - Avancé
(4, 1, '2024-03-01'),  -- Diana - Débutant
(5, 2, '2024-02-15');  -- Ethan - Intermédiaire

-- Table Workout_session

--    Séance 1 du programme Débutant 
INSERT INTO COACHIFY.Workout_session (training_program_id, duration, location, description, session_rank) VALUES
(1, 30, 'in the gym', 'Séance d''entraînement pour débutants', 1);

--    Séance 2 du programme Débutant
INSERT INTO COACHIFY.Workout_session (training_program_id, duration, location, description, session_rank) VALUES
(1, 30, 'in the gym', 'Séance d''entraînement pour débutants', 2);

--    Séance 1 du programme Intermédiaire
INSERT INTO COACHIFY.Workout_session (training_program_id, duration, location, description, session_rank) VALUES
(2, 45, 'in the gym', 'Séance d''entraînement pour intermédiaires', 1);

-- Table Contains (contenu des workout sessions)

--    Contenu de la séance 1 du programme Débutant 
INSERT INTO COACHIFY.Contains (session_id, exercise_id, exercise_rank, phase, value) VALUES
(1, 1, 1, 'warm-up', 10),  -- Squat
(1, 2, 2, 'session core', 12),  -- Pompe
(1, 3, 3, 'session core', 15),  -- Fente avant
(1, 4, 4, 'stretching', 10);  -- Crunch

--    Contenu de la séance 2 du programme Débutant (
INSERT INTO COACHIFY.Contains (session_id, exercise_id, exercise_rank, phase, value) VALUES
(2, 1, 1, 'warm-up', 12),  -- Squat
(2, 2, 2, 'session core', 15),  -- Pompe
(2, 3, 3, 'session core', 12),  -- Fente avant
(2, 5, 4, 'stretching', 10);  -- Dips

--    Contenu de la séance 1 du programme Intermédiaire
INSERT INTO COACHIFY.Contains (session_id, exercise_id, exercise_rank, phase, value) VALUES
(3, 1, 1, 'warm-up', 15),  
(3, 2, 2, 'session core', 12),
(3, 3, 3, 'session core', 10),
(3, 4, 4, 'stretching', 12);


-- Table Objectives

INSERT INTO COACHIFY.Objective (user_id, objective, objective_description, weight_goal, starting_date) VALUES

-- Alice (user_id 1)
(1, 'To gain muscle', 'Gagner 5 kg de masse musculaire', 75.0, CURRENT_DATE),

-- Bob (user_id 2)
(2, 'To stay in shape', 'Améliorer mon endurance cardio', 20, CURRENT_DATE),

-- Charlie (user_id 3)
(3,'To lose weight' , 'Perdre 3 kg de graisse corporelle', 67.0, CURRENT_DATE),

-- Diana (user_id 4)
(4, 'To tone up', 'Augmenter ma force musculaire', 20, CURRENT_DATE),

-- Ethan (user_id 5)
(5, 'To gain muscle', 'Développer mon endurance musculaire', 20, CURRENT_DATE),
(5, 'To tone up', 'Développer mon endurance musculaire', 20, CURRENT_DATE);
