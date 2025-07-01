import { validatePassword } from "./newpassword.utils";

describe('validateNewPassword', () => {
    
    it('should return false if password not contain number', () => {
        const result = validatePassword('abcedsq@');
        expect(result).toBeFalse();
    });
    it('should return false if password not contain a majuscule', () => {
        const result = validatePassword('abcedsq@');
        expect(result).toBeFalse();
    });
    it('should return false if password not contain a special charactere', () => {
        const result = validatePassword('Abcedsq2');
        expect(result).toBeFalse();
    });

    it('should return true if valid password', () => {
        const result = validatePassword('Password@1');
        expect(result).toBeTrue();
    })
})