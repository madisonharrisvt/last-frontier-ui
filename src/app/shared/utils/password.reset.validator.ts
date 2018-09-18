import { FormGroup } from "@angular/forms";

export class PasswordResetValidator {
    static validate(passwordResetFormGroup: FormGroup) {
        let password = passwordResetFormGroup.controls.password.value;
        let confirmPassword = passwordResetFormGroup.controls.confirmPassword.value;
 
        if (confirmPassword.length <= 0) {
            return null;
        }
 
        if (confirmPassword !== password) {
            return {
                doesMatchPassword: true
            };
        }
 
        return null;
 
    }
}