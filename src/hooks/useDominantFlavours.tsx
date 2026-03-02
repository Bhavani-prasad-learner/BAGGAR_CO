import { useMemo } from "react";

export function useDominantFlavours(
  profile = {},
  { minScore = 2, maxItems = 5 } = {}
) {
  return useMemo(() => {
    if (!profile || typeof profile !== "object") return [];

    return Object.entries(profile)
      .filter(([_, value]) => value >= minScore)
      .sort((a, b) => b[1] - a[1]) // highest first
      .slice(0, maxItems)
      .map(([key, value]) => ({
        key,
        value,
        label: key.replace(/_/g, " "),
      }));
  }, [profile, minScore, maxItems]);
}
