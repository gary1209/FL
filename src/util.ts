const m = 'Assertion failed';
export const assert = (c: boolean, s?: string) => {
  if (!c) throw new Error(s === undefined ? m : `${m}: ${s}`);
};

export const die = (msg?: string) => { throw new Error(msg); };
