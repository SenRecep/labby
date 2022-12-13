export class LocalStorageService {
  #isObject(variable: any) {
    return (
      typeof variable === "object" &&
      !Array.isArray(variable) &&
      variable !== null
    );
  }
  get(key: string) {
    const data = localStorage.getItem(key);
    if (!data) return data;
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }
  set(key: string, value: any) {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  }
  remove(key: string) {
    localStorage.removeItem(key);
  }
  removeKeys(keys: string[]) {
    keys.forEach((key) => this.remove(key));
  }
  clear() {
    localStorage.clear();
  }
}

const instance = new LocalStorageService();

export default instance;
