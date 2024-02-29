-- Ajout d'un nouveau poids (p_weight_value) pour l'user (p_user_id) à la date (p_date)
CREATE OR REPLACE PROCEDURE insert_weight(
    IN p_user_id INT, 
    IN p_weight_value FLOAT, 
    IN p_date DATE
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO COACHIFY.Weight(user_id, weight_value, date)
    VALUES (p_user_id, p_weight_value, p_date);
END;
$$;


-- Modification d'un id poids (p_weight_id) avec un poids (p_new_weight_value) pour l'user (p_user_id)
CREATE OR REPLACE PROCEDURE update_weight(
    IN p_weight_id INT, 
    IN p_user_id INT, 
    IN p_new_weight_value FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE COACHIFY.Weight
    SET weight_value = p_new_weight_value
    WHERE weight_id = p_weight_id AND user_id = p_user_id;
END;
$$;


-- Suppression d'un id poids (p_weight_id) pour l'user (p_user_id)
CREATE OR REPLACE PROCEDURE delete_weight(
    IN p_weight_id INT, 
    IN p_user_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM COACHIFY.Weight
    WHERE weight_id = p_weight_id AND user_id = p_user_id;
END;
$$;
