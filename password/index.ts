type PasswordSettings = {
    minLength: number;
    maxLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSymbols: boolean;
};

const defaultSettings: PasswordSettings = {
    minLength: 10,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: true
};

export const validatePassword = (password: string, settings?: PasswordSettings): {
    valid: boolean;
    errors: string[];
} => {
    const { minLength, maxLength, requireUppercase, requireLowercase, requireNumbers, requireSymbols } = {
        ...defaultSettings,
        ...settings
    };
    const errors: string[] = [];

    if (password.length === 0 || password.indexOf(' ') !== -1) {
        errors.push('Password cannot be empty or contain spaces');
        return { valid: false, errors };
    }

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    if (password.length < minLength) {
        errors.push(`Password must be at least ${minLength} characters long`);
    }

    if (password.length > maxLength) {
        errors.push(`Password must be less than ${maxLength} characters long`);
    }

    if (requireUppercase && !hasUppercase) {
        errors.push('Password must contain at least one uppercase letter');
    }

    if (requireLowercase && !hasLowercase) {
        errors.push('Password must contain at least one lowercase letter');
    }

    if (requireNumbers && !hasNumbers) {
        errors.push('Password must contain at least one number');
    }

    if (requireSymbols && !hasSymbols) {
        errors.push('Password must contain at least one special character');
    }

    return {
        valid: errors.length === 0,
        errors
    };
}
