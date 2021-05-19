export const isNotEmpty = (value: string | number): boolean => value !== "";

export const isNumberLessThan = (num: number) => (value: string): boolean =>
    Number(value) < num;

export const isNumberGreaterThan = (num: number) => (value: string): boolean =>
    Number(value) > num;

export const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
