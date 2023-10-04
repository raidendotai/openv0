async function components() {
  // framework x component lib dumps
  await Promise.all(
    [`react`, `next`, `svelte`]
      .map((framework) => {
        return [`flowbite`, `nextui`, `shadcn`].map((component_library) => {
          return `./build/components/${framework}/${component_library}.js`;
        });
      })
      .flat()
      .map(async (build_module) => {
        try {
          await require(build_module).build();
        } catch (e) {
          console.dir({ skip: build_module });
        }
      }),
  );
}

async function allowed_imports() {
  // list available packages from webapps-starters node_modules folder
  // append the imports from libraries? (ie. in components/lib, not in node_modules)
  await Promise.all(
    [`react`, `next`, `svelte`]
      .map((framework) => {
        return [`flowbite`, `nextui`, `shadcn`].map((component_library) => {
          return `./build/allowed_imports/${framework}/${component_library}.js`;
        });
      })
      .flat()
      .map(async (build_module) => {
        try {
          await require(build_module).build();
        } catch (e) {
          console.dir({ skip: build_module });
        }
      }),
  );
}

async function db() {
  const sqlite3 = require("sqlite3").verbose();
  const db = new sqlite3.Database("openv0.sqlite");
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS components (
        id INTEGER PRIMARY KEY,
        name TEXT,
        version TEXT,
        description TEXT,
        framework TEXT,
        components TEXT,
        icons TEXT,
        code TEXT,
        query TEXT,
        logs TEXT
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS fails (
        id INTEGER PRIMARY KEY,
        query TEXT,
        timestamp INTEGER,
        logs TEXT
      )
    `);

    console.log("Tables created successfully");
  });

  // Close the database connection
  db.close((err) => {
    if (err) {
      console.error("Error closing database:", err.message);
    } else {
      console.log("Database connection closed");
    }
  });
}

module.exports = {
  components,
  allowed_imports,
  db,
};
