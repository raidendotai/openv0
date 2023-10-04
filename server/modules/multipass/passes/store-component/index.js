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
const path = require("path");

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

const Fail = sequelize.define("Fail", {
  query: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  logs: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

async function run(req) {
  console.log("> init : " + __dirname.split(path.sep).slice(-2).join(`/`));

  await Fail.sync();
  await Component.sync();

  /*
  console.dir({
    __debug_store_component : {
      stage_design : req.pipeline.stages[`component-design-task`],
      stage_component : req.pipeline.stages[`component`],
    },
  },{depth:null})
  */

  let dbId = -1;

  if (req.pipeline.stages[`component`].success) {
    let description = ``;
    try {
      description =
        req.pipeline.stages[`component-design-task`].data.description.user;
    } catch (e) {
      false;
    }

    const newComponent = await Component.create({
      name: req.pipeline.stages[`component-design-task`].data.name,
      description: description,
      version: req.pipeline.stages[`component`].data.version,
      framework: req.query.framework,
      components: req.query.components,
      icons: req.query.icons,
      code: req.pipeline.stages[`component`].data.code,
      query: JSON.stringify(req.query),
      logs: JSON.stringify(req.pipeline),
    });
    dbId = newComponent.toJSON().id;
    console.dir({
      stored: { component: { id: dbId } },
    });
  } else {
    try {
      const failedComponent = await Fail.create({
        timestamp: Date.now(),
        query: JSON.stringify(req.query),
        logs: JSON.stringify(req.pipeline),
      });
      dbId = failedComponent.toJSON().id;
    } catch (e) {
      console.log(e);
    }
    console.dir({
      stored: { failure: { id: dbId } },
    });
  }

  return {
    type: `component-stored`,
    success: req.pipeline.stages[`component`].success,
    data: { id: dbId },
  };
}

module.exports = {
  run,
};
