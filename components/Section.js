import { sectionConfigObj } from "../utils/constants.js";

export default class Section {
  constructor(configs) {
    const config = new sectionConfigObj(configs);
    const { items, renderer, containerSelector } = sectionConfigObj;
    this._initialItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
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
