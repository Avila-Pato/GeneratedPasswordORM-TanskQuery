import Cryptr from "cryptr";
// Descricion: de este archivo es para manejar la encriptacion de datos sensibles como contraseñas
// Cryptr para encriptar y desencriptar datos
// esto sirve para proteger datos sensibles como contraseñas

if (!process.env.CRYPTO_SECRET_KEY) {
  throw new Error("CRYPTO_SECRET environment variable is not set");
}


// Crea la isntacncia de un objeto Cryptr con la clave secreta para encriptart y desencrioptar datos
export const cryptr = new Cryptr(process.env.CRYPTO_SECRET_KEY);