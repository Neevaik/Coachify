-- Fonction de création d'une entrée settings à la création d'un nouvel user
CREATE or REPLACE FUNCTION create_settings_trigger() RETURNS trigger AS $$
BEGIN
    INSERT INTO COACHIFY.Settings (user_id, notification, theme, voice_coach) VALUES
    (NEW.user_id,True, True, True);
	RAISE NOTICE 'Created settings for user_id : %', NEW.user_id;
    RETURN NEW;
END; $$ LANGUAGE plpgsql;

-- Procédure de déclenchement 
CREATE OR REPLACE TRIGGER create_settings_on_new_user AFTER INSERT ON COACHIFY.User FOR EACH ROW
EXECUTE PROCEDURE create_settings_trigger();