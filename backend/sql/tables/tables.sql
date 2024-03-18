DROP SCHEMA IF EXISTS COACHIFY CASCADE;
CREATE SCHEMA COACHIFY;

CREATE TYPE objective_type AS ENUM ('To stay in shape', 'To gain muscle', 'To tone up','To lose weight');
CREATE TYPE author_type AS ENUM('model', 'user');
CREATE TYPE theme_type AS ENUM('light', 'dark');
CREATE TYPE location_type AS ENUM('at home', 'outdoors', 'in the gym');
CREATE TYPE exercise_type AS ENUM('reps', 'secs');
CREATE TYPE session_phase AS ENUM('warm-up', 'session core', 'stretching');
CREATE TYPE gender_type AS ENUM('M', 'F');


CREATE TABLE IF NOT EXISTS COACHIFY.User(
        user_id SERIAL NOT NULL,
        name VARCHAR(20) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(30) NOT NULL CHECK(LENGTH(password) >= 6), -- longueur minimale de 6 caractères
        birthdate DATE NOT NULL,
        height INT NOT NULL,
        activity INT NOT NULL CHECK(activity >= 1 AND activity <=5), -- activité sportive notée entre 1 et 5
        gender gender_type NOT NULL,
        PRIMARY KEY(user_id));

CREATE TABLE IF NOT EXISTS COACHIFY.Weight(
        weight_id SERIAL NOT NULL,
        user_id SERIAL NOT NULL,
        weight_value FLOAT NOT NULL,
        date DATE NOT NULL,
        PRIMARY KEY(weight_id, user_id),
        FOREIGN KEY (user_id) REFERENCES COACHIFY.User(user_id) ON DELETE CASCADE ON UPDATE CASCADE);


CREATE TABLE IF NOT EXISTS COACHIFY.Objective(
        objective_id SERIAL NOT NULL,
        user_id SERIAL NOT NULL,
        objective objective_type NOT NULL,
        objective_description VARCHAR NOT NULL,
        location location_type NOT NULL, 
        weight_goal FLOAT NOT NULL,
        starting_date DATE NOT NULL,
        PRIMARY KEY(objective_id, user_id),
        FOREIGN KEY(user_id) REFERENCES COACHIFY.User(user_id) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS COACHIFY.Program(
        training_program_id SERIAL NOT NULL,
        name VARCHAR(20) NOT NULL,
        period INT NOT NULL, -- durée en jours
        description VARCHAR NOT NULL,
        AI_generated BOOLEAN NOT NULL,
        PRIMARY KEY(training_program_id));

CREATE TABLE IF NOT EXISTS COACHIFY.Program_objectives(
        training_program_id SERIAL NOT NULL,
        objective objective_type NOT NULL,
        PRIMARY KEY (training_program_id, objective),
        FOREIGN KEY (training_program_id) REFERENCES COACHIFY.Program(training_program_id) ON DELETE CASCADE ON UPDATE CASCADE);


CREATE TABLE IF NOT EXISTS COACHIFY.Follows_program(
        user_id SERIAL NOT NULL,
        training_program_id SERIAL NOT NULL,
        start_date DATE NOT NULL,
        PRIMARY KEY(user_id, training_program_id),
        FOREIGN KEY(user_id) REFERENCES COACHIFY.User(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY(training_program_id) REFERENCES COACHIFY.Program(training_program_id) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS COACHIFY.Workout_session(
        session_id SERIAL NOT NULL,
        title VARCHAR(30) NOT NULL,
        training_program_id SERIAL NOT NULL,
        session_rank INT NOT NULL,
        duration INT NOT NULL,  -- durée en minutes
        location location_type NOT NULL, -- en salle, maison, extérieur
        description VARCHAR NOT NULL,
        PRIMARY KEY(session_id),
        FOREIGN KEY(training_program_id) REFERENCES COACHIFY.Program(training_program_id) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS COACHIFY.Performs(
        performance_id SERIAL NOT NULL,
        user_id SERIAL NOT NULL,
        session_id SERIAL NOT NULL,
        date DATE NOT NULL,
        feeling INT NOT NULL CHECK(feeling >= 1 AND feeling <=5),
        calories FLOAT NOT NULL,
        PRIMARY KEY(performance_id, user_id, session_id),
        FOREIGN KEY(user_id) REFERENCES COACHIFY.User(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY(session_id) REFERENCES COACHIFY.Workout_session(session_id) ON DELETE CASCADE ON UPDATE CASCADE);


CREATE TABLE IF NOT EXISTS COACHIFY.Exercise(
        exercise_id SERIAL NOT NULL,
        name VARCHAR(30) NOT NULL UNIQUE,
        description VARCHAR NOT NULL,
        MET FLOAT NOT NULL, -- unité de mesure pour le calcul de la dépense énergetique Metabolic Equivalent of Task
        video_link VARCHAR NOT NULL,
        GIF_link VARCHAR NOT NULL,
        type exercise_type NOT NULL, -- "reps" pour les exercices à répétition ou "secs" pour les exercices à durée
        level INT NOT NULL CHECK(level >= 1 AND level <=5), -- niveau de difficulté de l'exercice compris entre 1 et 5
        PRIMARY KEY(exercise_id));

CREATE TABLE IF NOT EXISTS COACHIFY.Contains(
        session_id INT NOT NULL,
        exercise_id INT NOT NULL,
        exercise_rank INT NOT NULL, -- pour indiquer le rang de l'exercice (à faire en 1er, 2e, etc...)
        phase session_phase NOT NULL, -- la phase de la séance à laquelle cet exercice correspond (Echauffement, étirements finaux, coeur de séance)
        value INT NOT NULL,
        PRIMARY KEY (session_id, exercise_id),
        FOREIGN KEY(session_id) REFERENCES COACHIFY.Workout_session(session_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY(exercise_id) REFERENCES COACHIFY.Exercise(exercise_id) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS COACHIFY.Muscle(
        muscle_name VARCHAR(40) NOT NULL,
        muscle_group VARCHAR(40) NOT NULL,
        function VARCHAR NOT NULL,
        PRIMARY KEY(muscle_name));

CREATE TABLE IF NOT EXISTS COACHIFY.Targets(
        exercise_id SERIAL NOT NULL,
        muscle_name VARCHAR(40) NOT NULL,
        PRIMARY KEY(exercise_id, muscle_name),
        FOREIGN KEY(exercise_id) REFERENCES COACHIFY.Exercise(exercise_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY(muscle_name) REFERENCES COACHIFY.Muscle(muscle_name) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS COACHIFY.Equipment(
        equipment_id SERIAL NOT NULL,
        name VARCHAR(30) NOT NULL,
        PRIMARY KEY(equipment_id));

CREATE TABLE IF NOT EXISTS COACHIFY.Requires(
        exercise_id SERIAL NOT NULL,
        equipment_id SERIAL NOT NULL,
        PRIMARY KEY(exercise_id, equipment_id),
        FOREIGN KEY(exercise_id) REFERENCES COACHIFY.Exercise(exercise_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY(equipment_id) REFERENCES COACHIFY.Equipment(equipment_id) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS COACHIFY.Conversation(
        conversation_id SERIAL NOT NULL,
        user_id SERIAL NOT NULL,
        date_created DATE NOT NULL,
        subject VARCHAR(50),
        PRIMARY KEY(conversation_id, user_id),
        FOREIGN KEY(user_id) REFERENCES COACHIFY.User(user_id) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS COACHIFY.Message(
        message_id SERIAL NOT NULL,
        conversation_id SERIAL NOT NULL,
        user_id SERIAL NOT NULL,
        content VARCHAR NOT NULL,
        author author_type NOT NULL, -- False pour modèle, True pour utilisateur
        timestamp TIMESTAMP NOT NULL,
        PRIMARY KEY (message_id, conversation_id, user_id),
        FOREIGN KEY(conversation_id, user_id) REFERENCES COACHIFY.Conversation(conversation_id, user_id) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS COACHIFY.Settings(
        settings_id SERIAL NOT NULL,
        user_id SERIAL NOT NULL,
        notification BOOLEAN NOT NULL,
        theme theme_type NOT NULL,
        voice_coach BOOLEAN NOT NULL,
        PRIMARY KEY (settings_id),
        FOREIGN KEY (user_id) REFERENCES COACHIFY.User(user_id) ON DELETE CASCADE ON UPDATE CASCADE);