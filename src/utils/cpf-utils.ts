
export function isValidCpf(cpf: string): boolean {
    if (!cpf) return false;

    const apenasDigitos: string = cpf.replace(/\D/g, "");

    if (apenasDigitos.length !== 11) return false;
    if (/^(\d)\1+$/.test(apenasDigitos)) return false;

    const digitos: number[] = apenasDigitos.split("").map(Number);

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += digitos[i] * (10 - i);
    }

    let firstCheck = (soma * 10) % 11;
    if (firstCheck === 10) firstCheck = 0;
    if (firstCheck !== digitos[9]) return false;


    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += digitos[i] * (11 - i);
    }

    let secondCheck = (soma * 10) % 11;
    if (secondCheck === 10) secondCheck = 0;
    if (secondCheck !== digitos[10]) return false;

    return true;
}
