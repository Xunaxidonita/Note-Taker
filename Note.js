class Note {
  constructor(id, routeName, title, text) {
    this.id = id;
    this.routeName = routeName;
    this.title = title;
    this.text = text;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.routeName;
  }

  getTitle() {
    return this.title;
  }

  getEmail() {
    return this.text;
  }
}

module.exports = Note;
