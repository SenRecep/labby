import { encrypt, decrypt } from "@/helpers/crypto";
export class LocalStorageService {
  get(key: string, isDecrypt = true) {
    let data = localStorage.getItem(key);
    if (isDecrypt) data = decrypt(data);
    if (!data) return data;
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }
  set(key: string, value: any, isEncrypt = true) {
    value = JSON.stringify(value);
    if (isEncrypt) value = encrypt(value);
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
