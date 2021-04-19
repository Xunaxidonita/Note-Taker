const notes = require("../../api/notes");

test("reads notes from file", async () => {
  await notes(null, {
    json: (collection) => {
      expect(collection.length).toEqual(2);
    },
  });
});
