-- modification user
CREATE OR REPLACE PROCEDURE update_user(
    IN p_user_id INT, 
    IN p_name VARCHAR(20), 
    IN p_email VARCHAR(50),
    IN p_password VARCHAR(30),
    IN p_birthdate DATE,
    IN p_height INT,
    IN p_activity INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE COACHIFY.User
    SET 
        name = p_name,
        email = p_email,
        password = p_password,
        birthdate = p_birthdate,
        height = p_height,
        activity = p_activity
    WHERE user_id = p_user_id;
END;
$$;

-- suppression user
CREATE OR REPLACE PROCEDURE delete_user(
    IN p_user_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM COACHIFY.User
    WHERE user_id = p_user_id;
END;
$$;