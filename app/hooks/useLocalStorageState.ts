import { useEffect, useState } from "react";

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue);

  // 読み込み（client mount 後）
  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState(JSON.parse(stored));
      }
    } catch {
      // 失敗しても何もしない
    }
  }, [key]);

  // 書き込み
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // quota超過などは無視
    }
  }, [key, state]);

  return [state, setState] as const;
}
