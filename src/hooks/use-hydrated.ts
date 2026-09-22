import { useEffect, useState } from "react";
import { useStudio } from "@/lib/store";

export function useHydrated() {
  const hydrated = useStudio((s) => s.hydrated);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started) return;
    setStarted(true);
    void Promise.resolve(useStudio.persist.rehydrate()).finally(() => {
      useStudio.getState().setHydrated();
    });
  }, [started]);

  return hydrated;
}
