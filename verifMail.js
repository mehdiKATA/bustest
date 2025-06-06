export function verifMail(str){
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(str);


}