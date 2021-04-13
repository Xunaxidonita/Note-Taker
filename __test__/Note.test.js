const Note = require("../Note.js");

test("creates a Note object", () => {
  const testNote = new Note(
    "testtitle",
    "Test Title",
    "something inside here",
    "Freddy"
  );
  expect(testNote.routeName).toEqual(expect.any(String));
  expect(testNote.routeName).toEqual("testtitle");
  expect(testNote.title).toEqual(expect.any(String));
  expect(testNote.title).toEqual("Test Title");
  expect(testNote.text).toEqual(expect.any(String));
  expect(testNote.text).toEqual("something inside here");
});
