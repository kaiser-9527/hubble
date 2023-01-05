export const isMac = () => /macintosh|mac os x/i.test(navigator.userAgent);

export const hasMiddleSpace = (tar: string) => /\s./.test(tar.trim());
