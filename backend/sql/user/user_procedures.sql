-- modification user
CREATE OR REPLACE FUNCTION update_user(
    IN p_user_id INT,
    IN p_name VARCHAR(20) DEFAULT NULL,
    IN p_email VARCHAR(50) DEFAULT NULL,
    IN p_password VARCHAR(30) DEFAULT NULL,
    IN p_birthdate DATE DEFAULT NULL,
    IN p_height INT DEFAULT NULL,
    IN p_activity INT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    -- Construction de la requête d'update
    EXECUTE 'UPDATE COACHIFY.User SET ' ||
            CASE WHEN p_name IS NOT NULL THEN 'name = $2, ' ELSE '' END ||
            CASE WHEN p_email IS NOT NULL THEN 'email = $3, ' ELSE '' END ||
            CASE WHEN p_password IS NOT NULL THEN 'password = $4, ' ELSE '' END ||
            CASE WHEN p_birthdate IS NOT NULL THEN 'birthdate = $5, ' ELSE '' END ||
            CASE WHEN p_height IS NOT NULL THEN 'height = $6, ' ELSE '' END ||
            CASE WHEN p_activity IS NOT NULL THEN 'activity = $7, ' ELSE '' END ||
            'WHERE user_id = $1'
    USING p_user_id, p_name, p_email, p_password, p_birthdate, p_height, p_activity;
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