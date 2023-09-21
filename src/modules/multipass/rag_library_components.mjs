import shadcn_db from "../../library/shadcn_dump.json" assert { type: "json" };

async function run(query) {
  return shadcn_db.filter((e) =>
    query.library_components
      .map((e) => e.toLowerCase())
      .includes(e.name.toLowerCase()),
  );
}

export { run };
