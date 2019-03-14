CREATE TABLE channel(
 channel_id serial PRIMARY KEY,
 channel_name VARCHAR (255) UNIQUE NOT NULL
);

CREATE TABLE message(
  message_id serial PRIMARY KEY,
  message_text TEXT NOT NULL
);

CREATE TABLE message_channel(
  message_id integer NOT NULL,
  channel_id integer NOT NULL,
  PRIMARY KEY (message_id, channel_id),
  CONSTRAINT message_channel_message_id_fkey FOREIGN KEY (message_id)
    REFERENCES message (message_id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT message_channel_channel_id_fkey FOREIGN KEY (channel_id)
    REFERENCES channel (channel_id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION
);
