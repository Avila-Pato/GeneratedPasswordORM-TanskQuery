
// configuracion de la generaciond ela cotnraseña
export interface PasswordConfig  {
    hasLowerCase?: boolean;
    hasUppercase?:boolean;
    hasNumbers?: boolean;
    hasSymbols?: boolean;
    length?: number;
}

export const generatedPassword =({
    hasLowerCase = true,
    hasUppercase = false,
    hasNumbers = false,
    hasSymbols = false,
    length = 8
}: PasswordConfig  = {}) => { 
// PropgeneratedPassword = {} tambien acepta un objeto vacio como argumento
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbersChars = '0123456789';
    const symbolsChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    
let charPool = "";
//  Si no se elige ningún tipo de carácter, se asegura de usar minúsculas como fallback:
if(hasUppercase) charPool += uppercaseChars;
if(hasLowerCase) charPool += lowercaseChars;
if(hasNumbers) charPool += numbersChars;
if(hasSymbols) charPool += symbolsChars;


if (charPool.length ===0) {
    charPool = lowercaseChars;
}

let password = "";
// Generar la contraseña aleatoria
// Usamos Math.random() para generar un índice aleatorio en el charPool
for(let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charPool.length);
    password += charPool[randomIndex];
}
return password;

}