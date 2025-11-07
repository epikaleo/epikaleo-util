export const EnvHelper = {
  bool(key: string, defaultValue: boolean): boolean {
    const value = process.env[key];
    if (value === undefined) {
      return defaultValue;
    }
    if (!['1', '0', 'true', 'false'].includes(value)) {
      throw new Error(`env:${key} is not a valid boolean value`);
    }
    return ['1', 'true'].includes(value);
  },
  string(key: string, defaultValue: string): string {
    const value = process.env[key];
    return value ?? defaultValue;
  },
  int(key: string, defaultValue: number): number {
    const value = process.env[key];
    if (value === undefined) {
      return defaultValue;
    }
    const intValue = parseInt(value, 10);
    if (isNaN(intValue)) {
      throw new Error(`env:${key} is not a valid integer value`);
    }
    return intValue;
  },
  enum(key: string, valid: string[], defaultValue: string): string {
    if (!valid.includes(defaultValue)) {
      throw new Error(`env:${key} does not have a valid default value.`);
    }
    const value = process.env[key];
    if (value === undefined) {
      return defaultValue;
    }
    if (!valid.includes(value)) {
      throw new Error(`env:${key} is not valid. Valid values are ${valid.join(', ')}`);
    }
    return value;
  },
  required: {
    string(key: string): string {
      const value = process.env[key];
      if (value === undefined) {
        throw new Error(`env:${key} is required but not set.`);
      }
      return value;
    },
    bool(key: string): boolean {
      const value = process.env[key];
      if (value === undefined) {
        throw new Error(`env:${key} is required but not set.`);
      }
      if (!['1', '0', 'true', 'false'].includes(value)) {
        throw new Error(`env:${key} is not a valid boolean value`);
      }
      return ['1', 'true'].includes(value);
    },
    int(key: string): number {
      const value = process.env[key];
      if (value === undefined) {
        throw new Error(`env:${key} is required but not set.`);
      }
      const intValue = parseInt(value, 10);
      if (isNaN(intValue)) {
        throw new Error(`env:${key} is not a valid integer value`);
      }
      return intValue;
    },
    enum(key: string, valid: string[]): string {
      const value = process.env[key];
      if (value === undefined) {
        throw new Error(`env:${key} is required but not set.`);
      }
      if (!valid.includes(value)) {
        throw new Error(`env:${key} is not valid. Valid values are ${valid.join(', ')}`);
      }
      return value;
    }
  }
}