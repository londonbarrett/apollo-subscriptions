CREATE TABLE channel(
 id serial PRIMARY KEY,
 name VARCHAR (255) UNIQUE NOT NULL
);

CREATE TABLE message(
  id serial PRIMARY KEY,
  text TEXT NOT NULL
);

CREATE TABLE message_channel(
  message integer NOT NULL,
  channel integer NOT NULL,
  PRIMARY KEY (message, channel),
  CONSTRAINT message_channel_message_fkey FOREIGN KEY (message)
    REFERENCES message (id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT message_channel_channel_fkey FOREIGN KEY (channel)
    REFERENCES channel (id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION
);
