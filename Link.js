export class Link {
  id;
  name;
  value;

  /**
   * @param {number} id
   * @param {string} name
   * @param {number} value
   */
  constructor(id, name, value) {
    this.id = id;
    this.name = name;
    this.value = value;
  }
}
