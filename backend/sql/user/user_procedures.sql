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