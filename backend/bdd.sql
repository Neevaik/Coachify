DROP SCHEMA IF EXISTS COACHIFY CASCADE;
CREATE SCHEMA COACHIFY;

CREATE TABLE IF NOT EXISTS COACHIFY.User(
        user_id SERIAL NOT NULL,
        name VARCHAR(20) NOT NULL,
        email VARCHAR(30) NOT NULL,
        password VARCHAR(30) NOT NULL,
        age INT NOT NULL,
        height INT NOT NULL,
        activity INT NOT NULL, -- activité sportive notée entre 1 et 5 
        PRIMARY KEY(user_id));

CREATE TABLE IF NOT EXISTS COACHIFY.Weight(
        weight_id SERIAL NOT NULL,
        user_id SERIAL NOT NULL,
        weight_value FLOAT NOT NULL,
        date DATE NOT NULL,
        PRIMARY KEY(weight_id, user_id),
        FOREIGN KEY (user_id) REFERENCES COACHIFY.User(user_id) ON DELETE RESTRICT ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS COACHIFY.Objective(
        objective_id SERIAL NOT NULL,
        user_id SERIAL NOT NULL,
        objective_description VARCHAR(30) NOT NULL,
        weight_goal FLOAT NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        PRIMARY KEY(objective_id, user_id),
        FOREIGN KEY(user_id) REFERENCES COACHIFY.User(user_id) ON DELETE RESTRICT ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS COACHIFY.Program(
        training_program_id SERIAL NOT NULL,
        name VARCHAR(20) NOT NULL,
        type VARCHAR(50) NOT NULL,
        duration INT NOT NULL, -- durée en jours
        description VARCHAR NOT NULL,
        objective VARCHAR(30) NOT NULL, 
        AI_generated BOOLEAN NOT NULL,
        PRIMARY KEY(training_program_id));

CREATE TABLE IF NOT EXISTS COACHIFY.Follows_program(
        user_id SERIAL NOT NULL,
        training_program_id SERIAL NOT NULL,
        PRIMARY KEY(user_id, training_program_id),
        FOREIGN KEY(user_id) REFERENCES COACHIFY.User(user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
        FOREIGN KEY(training_program_id) REFERENCES COACHIFY.Program(training_program_id) ON DELETE RESTRICT ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS COACHIFY.Workout_session(
        session_id SERIAL NOT NULL,
        training_program_id SERIAL NOT NULL,
        duration INT NOT NULL,
        location VARCHAR(20) NOT NULL, -- en salle, maison, extérieur
        description VARCHAR NOT NULL,
        PRIMARY KEY(session_id),
        FOREIGN KEY(training_program_id) REFERENCES COACHIFY.Program(training_program_id) ON DELETE RESTRICT ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS COACHIFY.Performs(
        performance_id SERIAL NOT NULL,
        user_id SERIAL NOT NULL,
        session_id SERIAL NOT NULL,
        date DATE NOT NULL,
        feeling INT NOT NULL,
        calories INT NOT NULL,
        PRIMARY KEY(performance_id, user_id, session_id),
        FOREIGN KEY(user_id) REFERENCES COACHIFY.User(user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
        FOREIGN KEY(session_id) REFERENCES COACHIFY.Workout_session(session_id) ON DELETE RESTRICT ON UPDATE CASCADE);


CREATE TABLE IF NOT EXISTS COACHIFY.Exercise(
        exercise_id SERIAL NOT NULL,
        name VARCHAR(30) NOT NULL,
        description VARCHAR NOT NULL,
        video_link VARCHAR NOT NULL,
        GIF_link VARCHAR NOT NULL,
        level INT NOT NULL,
        PRIMARY KEY(exercise_id));

CREATE TABLE IF NOT EXISTS COACHIFY.Contains(
        session_id INT NOT NULL,
        exercise_id INT NOT NULL,
        reps INT,
        duration INT,
        PRIMARY KEY (session_id, exercise_id),
        FOREIGN KEY(session_id) REFERENCES COACHIFY.Workout_session(session_id) ON DELETE RESTRICT ON UPDATE CASCADE,
        FOREIGN KEY(exercise_id) REFERENCES COACHIFY.Exercise(exercise_id) ON DELETE RESTRICT ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS COACHIFY.Muscle(
        muscle_name VARCHAR(40) NOT NULL,
        PRIMARY KEY(muscle_name));

CREATE TABLE IF NOT EXISTS COACHIFY.Targets(
        exercise_id SERIAL NOT NULL,
        muscle_name VARCHAR(40) NOT NULL,
        PRIMARY KEY(exercise_id, muscle_name),
        FOREIGN KEY(exercise_id) REFERENCES COACHIFY.Exercise(exercise_id) ON DELETE RESTRICT ON UPDATE CASCADE,
        FOREIGN KEY(muscle_name) REFERENCES COACHIFY.Muscle(muscle_name) ON DELETE RESTRICT ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS COACHIFY.Equipment(
        equipment_id SERIAL NOT NULL,
        name VARCHAR(30) NOT NULL,
        PRIMARY KEY(equipment_id));

CREATE TABLE IF NOT EXISTS COACHIFY.Requires(
        exercise_id SERIAL NOT NULL,
        equipment_id SERIAL NOT NULL,
        PRIMARY KEY(exercise_id, equipment_id),
        FOREIGN KEY(exercise_id) REFERENCES COACHIFY.Exercise(exercise_id) ON DELETE RESTRICT ON UPDATE CASCADE,
        FOREIGN KEY(equipment_id) REFERENCES COACHIFY.Equipment(equipment_id) ON DELETE RESTRICT ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS COACHIFY.Conversation(
        conversation_id SERIAL NOT NULL,
        user_id SERIAL NOT NULL,
        PRIMARY KEY(conversation_id, user_id),
        FOREIGN KEY(user_id) REFERENCES COACHIFY.User(user_id) ON DELETE RESTRICT ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS COACHIFY.Message(
        message_id SERIAL NOT NULL,
        conversation_id SERIAL NOT NULL,
        user_id SERIAL NOT NULL,
        content VARCHAR NOT NULL,
        author BOOLEAN NOT NULL, -- False pour modèle, True pour utilisateur
        timestamp TIMESTAMP NOT NULL,
        PRIMARY KEY (message_id, conversation_id, user_id),
        FOREIGN KEY(conversation_id, user_id) REFERENCES COACHIFY.Conversation(conversation_id, user_id) ON DELETE RESTRICT ON UPDATE CASCADE);


INSERT INTO COACHIFY.User VALUES(DEFAULT, 'Paul', 'monicploc@gmail.com', 'password', 40, 180, 3);