module.exports = {
  pageInsertStr: `
    INSERT INTO pages
    (id, name, has_sub_pages, active, position, created_at)
    VALUES
    ($1, $2, $3, $4, $5, $6);
  `,

  subPageInsertStr: `
    INSERT INTO sub_pages
    (id, page_id, name, active, photo_url, position, created_at)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7);
  `,

  itemInsertStr: `
    INSERT INTO items
    (id, parent_id, active, item_type, content, photo_url, position, created_at)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8);
  `
};
