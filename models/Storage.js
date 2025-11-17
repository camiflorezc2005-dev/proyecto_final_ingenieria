
export class Storage {
  static save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  static get(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }
  static push(key, item) {
    const arr = Storage.get(key);
    arr.push(item);
    Storage.save(key, arr);
  }
  static updateById(key, id, patch) {
    const arr = Storage.get(key);
    const idx = arr.findIndex(x => x.id === id);
    if (idx === -1) return false;
    arr[idx] = { ...arr[idx], ...patch };
    Storage.save(key, arr);
    return true;
  }
}
