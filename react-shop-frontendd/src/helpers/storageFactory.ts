export type StorageFactory = ReturnType<typeof storageFactory>;

export const storageFactory = (getStorage: () => Storage) => {
  const storage = getStorage();

  return {
    getItem: storage.getItem.bind(storage),
    setItem: storage.setItem.bind(storage),
    removeItem: storage.removeItem.bind(storage),
    clear: storage.clear.bind(storage),
    key: storage.key.bind(storage),
    get length() {
      return storage.length;
    },
  };
};
