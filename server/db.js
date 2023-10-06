/*
  for ie. putting downloaded shared components into DB
*/
require("dotenv").config();

async function db_build() {
  // create DB
  await require(`./build.js`).db();
}

async function db_insert(cmd) {
  // insert downloaded component into DB
  const [user, name] = cmd
    .split(`download:component:@`)[1]
    .split(`/`)
    .map((e) => e.trim());
  if (!user || !name || !user.length || !name.length) {
    return;
  }
  // console.dir({ user, name });

  const axios = require(`axios`);
  const sqlite3 = require("sqlite3");
  const db = new sqlite3.Database("openv0.sqlite", (err) => {
    if (err) {
      console.error("Error opening database:", err.message);
    } else {
      console.log("Connected to the database");
    }
  });
  const { Sequelize, DataTypes } = require("sequelize");
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "openv0.sqlite",
    logging: false, // quiet mode
  });

  const Component = sequelize.define(
    "Component",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      version: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      framework: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      components: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      icons: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      query: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      logs: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false },
  );

  let response
  try {
    response = await axios.post(
      `${process.env.OPENV0__API}/dev/components/download`,
      {
        user,
        name,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch(e) {
    console.dir(e.response.data)
    return;
  }

  const responseData = response.data;
  if (!responseData.status) {
    return;
  }
  console.dir(responseData,{depth:1});
  await Promise.all(
    responseData.versions.map(async (component_version) => {
      const newComponent = await Component.create({
        name: responseData.name,
        framework: responseData.framework,
        components: responseData.components,
        icons: responseData.icons,
        query: JSON.stringify({ from: `openv0.com` }),
        logs: JSON.stringify({ from: `openv0.com` }),

        description: component_version.description,
        version: component_version.version,
        code: component_version.code,
      });
      console.dir({
        stored: { component: { id: newComponent.toJSON().id } },
      });
    }),
  );
}

async function db_flush() {
  try {
    fs.unlinkSync(`./openv0.sqlite`);
  } catch (e) {
    console.log(e);
  }
  await db_build();
}

async function main() {
  try {
    const args = process.argv;
    const cmd = args[2];

    if (cmd === `build`) {
      await db_build();
    } else if (cmd.startsWith(`download:component:@`)) {
      await db_insert(cmd);
    } else if (cmd.startsWith(`flush`)) {
      await db_flush();
    }
  } catch (e) {
    console.log(e);
  }
}
main();
