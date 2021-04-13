class Note {
  constructor(routeName, title, text) {
    this.routeName = routeName;
    this.title = title;
    this.text = text;
  }

  getName() {
    return this.routeName;
  }

  getId() {
    return this.title;
  }

  getEmail() {
    return this.text;
  }
}

module.exports = Note;
