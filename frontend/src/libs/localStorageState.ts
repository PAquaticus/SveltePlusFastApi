export function localStorageState(key: string): readonly [string, (newValue: string) => void] {
  let value: string = localStorage.getItem(key);
  const setter: (newValue: string) => void = (newValue) => {
    value = newValue;
    localStorage.setItem(key, newValue);
  };
  return [value, setter] as const;
}
