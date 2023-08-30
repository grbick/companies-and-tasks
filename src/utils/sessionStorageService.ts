class SessionStorageService {
  get(key: string) {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  set(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear() {
    sessionStorage.clear();
  }
}

export const sessionStorageService = new SessionStorageService();
