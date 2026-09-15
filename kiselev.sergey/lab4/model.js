export class ClothingItem {
  #id;
  #name;
  #size;
  #colors;

  constructor(id, name, size, colors = []) {
    this.#id = id;
    this.#name = name;
    this.#size = size;
    this.#colors = [...colors];
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get size() {
    return this.#size;
  }

  get colors() {
    return [...this.#colors];
  }

  get colorsCount() {
    return this.#colors.length;
  }

  addColor(color) {
    if (!this.#colors.includes(color)) {
      this.#colors.push(color);
    }
  }

  removeColor(color) {
    this.#colors = this.#colors.filter((c) => c !== color);
  }

  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      size: this.#size,
      colors: this.#colors,
    };
  }
}

export function groupItemsBySize(items) {
  return items.reduce((acc, item) => {
    const key = item.size;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
}

export function getUniqueColors(items) {
  const all = items.flatMap((item) => item.colors);
  return [...new Set(all)];
}

export function findItemsByColor(items, color) {
  return items.filter((item) => item.colors.includes(color));
}

export function groupItemsByColorCount(items) {
  return items.reduce((acc, item) => {
    const key = item.colorsCount;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
}

export function findItemsAboveColorCount(items, n) {
  return items.filter((item) => item.colorsCount > n);
}