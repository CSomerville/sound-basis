const connection = require('./connection');

const deleteQueries = [
  `DROP TABLE IF EXISTS items CASCADE;`,
  `DROP TABLE IF EXISTS pages CASCADE;`,
  `DROP TABLE IF EXISTS sub_pages CASCADE;`,
  `DROP TABLE IF EXISTS admins CASCADE;`
];

const createQueries = [`
  CREATE TABLE items (
    id uuid PRIMARY KEY NOT NULL,
    parent_id uuid NOT NULL,
    active boolean DEFAULT FALSE,
    item_type text NOT NULL,
    content text,
    photo_url text,
    created_at timestamp with time zone DEFAULT NOW(),
    updated_at timestamp with time zone,
    position integer NOT NULL
  );`,`
  CREATE TABLE pages (
    id uuid PRIMARY KEY NOT NULL,
    name text NOT NULL,
    has_sub_pages boolean NOT NULL,
    active boolean DEFAULT FALSE,
    created_at timestamp with time zone DEFAULT NOW(),
    updated_at timestamp with time zone,
    position integer NOT NULL
  );`,`
  CREATE TABLE sub_pages (
    id uuid PRIMARY KEY NOT NULL,
    page_id uuid NOT NULL,
    name text NOT NULL,
    active boolean DEFAULT FALSE,
    photo_url text NOT NULL,
    created_at timestamp with time zone DEFAULT NOW(),
    updated_at timestamp with time zone,
    position integer NOT NULL
  );`, `
  CREATE TABLE admins (
    id uuid PRIMARY KEY NOT NULL,
    email text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    created_at timestamp with time zone DEFAULT NOW(),
    updated_at timestamp with time zone
  );
`];

const runDelete = t => 
  t.batch(deleteQueries.map(str =>
    t.none(str)
));

const runCreate = t =>
  t.batch(createQueries.map(str =>
    t.none(str)
));

module.exports = {
  runCreate: runCreate,
  runDelete: runDelete
};


   



