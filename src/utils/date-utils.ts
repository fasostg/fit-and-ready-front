export function validateDate(value?: string): string | null {
    if (!value) return "Data não pode ser vazia.";

    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = value.match(regex);

    if (!match) return "Formato inválido. Use DD/MM/AAAA.";

    const day = Number(match[1]);
    const month = Number(match[2]) - 1;
    const year = Number(match[3]);

    const date = new Date(year, month, day);

    if (day < 1 || day > 31 || 
        month < 0 || month > 11 || 
        year < 2000 || year > 2100 || 
        date.getFullYear() !== year ||
        date.getMonth() !== month ||
        date.getDate() !== day
    ) {
        return "Data inválida.";
    }

    return null;
}

export function formatDate(value: string | undefined): string {
    if (!value) return "";

    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
}