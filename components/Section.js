export default class Section {
  constructor({ items, renderer, containerSelector }) {
    this._renderer = renderer; // assign renderer to this
    this._initialItems = items; // assign initial items to this
    this._container = document.querySelector(containerSelector);
    console.log(this._container);
    console.log(this._initialItems);
    console.log(this._renderer);
  }

  renderItems() {
    this._initialItems.forEach((item) => {
      this._renderer(item); // call renderer() and pass item to it
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}
