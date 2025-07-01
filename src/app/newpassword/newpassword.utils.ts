export function validatePassword(password: string): boolean {
    if (typeof password !== 'string') {
      return false;
    }
  
    // On définit toutes les variables à false
    let hasUppercase = false;
    let hasLowercase = false;
    let hasNumber = false;
    let hasSpecialChar = false;
  
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
  
      if (char >= 65 && char <= 90) {
        hasUppercase = true;
      } else if (char >= 97 && char <= 122) {
        hasLowercase = true;
      } else if (char >= 48 && char <= 57) {
        hasNumber = true;
      } else if ([64, 35, 36, 37].includes(char)) {
        hasSpecialChar = true;
      } else {
        // caractère non autorisé
        return false;
      }
    }
  
    // On vérifie que tous les types sont présents
    return hasLowercase && hasNumber && hasSpecialChar && hasUppercase;
  }