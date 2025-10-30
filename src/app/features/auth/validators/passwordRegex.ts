import {ValidatorFn, AbstractControl,ValidationErrors} from '@angular/forms';

export function StrongPasswordValidator():ValidatorFn{
    return (control:AbstractControl):ValidationErrors|null=>{
    const password=control.value;
    const strongPassword=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    

    return password && strongPassword.test(password) ?null:{'passwordNotStrong':true};

}
}
