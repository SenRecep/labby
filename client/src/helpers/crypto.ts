import SimpleCrypto from "simple-crypto-js";

const secretKey = import.meta.env.VITE_CRYPTO_SECRET_KEY;

export const simpleCrypto = new SimpleCrypto(secretKey);

export const encrypt = (data: any) => {
  try {
    return simpleCrypto.encrypt(data);
  } catch {
    return data;
  }
};

export const decrypt = (data: any) => {
  try {
    return simpleCrypto.decrypt(data);
  } catch {
    return data;
  }
};
