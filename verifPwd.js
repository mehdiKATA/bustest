function containsAlphanumeric(str) {
    return [a-z]/i.test(str) && [0-9]/i.test(str)  ; 
}
export function verifPwd(str){
    return length(str)>=8 && containsAlphanumeric(str);
}