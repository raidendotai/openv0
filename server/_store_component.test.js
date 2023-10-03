/*
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('openv0.db', (err) => {
  if (err) { console.error('Error opening database:', err.message); }
  else {   console.log('Connected to the database'); }
});
const { Sequelize , DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'openv0.db',
  logging: false, // quiet mode
});

const Component = sequelize.define('Component', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  version: {
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
} , { timestamps: false } );

const Fail = sequelize.define('Fail', {
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
    allowNull: true, // Adjust allowNull as needed
  },
});

Fail.sync()
Component.sync();

async function db_test(){
  const componentData = {
    name: 'ExampleComponent',
    version: `${Date.now()}`,
    framework: 'react',
    components: 'nextui',
    icons: 'lucide',
    code: '__CODE_HERE__',
    query: '__QUERY_JSON_STRING__',
    logs: '__LOGS_JSON_STRING__',
  };


  // Create the component in the database
  const newComponent = await Component.create(componentData);
  console.log('Component created:', newComponent.toJSON());


  const allComponents = await Component.findAll();
  const reactComponents = await Component.findAll({
    where: {
      framework: 'react',
    },
  });

  console.log('all components:', allComponents.map((c) => c.toJSON()));
  console.log('react components:', reactComponents.map((c) => c.toJSON()));
}
// db_test()
*/

// *-------------------------------------------------------
async function test() {
  const store_component = require(
    `./modules/multipass/passes/store-component/index.js`,
  );

  const stream = {
    // used to stream updates to frontend ; if not needed pass this instead
    write: (e) => {
      true;
    },
  };

  const execution_multipass_logs = require(
    `./_multipass_output_example_1696273466131.json`,
  );

  console.dir(execution_multipass_logs, { depth: null });

  const store_response = await store_component.run({
    stream,
    stream: stream,
    query: {
      description: `a simple paragraph`,
      framework: `react`,
      components: `shadcn`,
      icons: `lucide`,
    },
    pipeline: execution_multipass_logs,
  });
  console.dir({ store_response });
}
test();
