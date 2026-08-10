import { appSettings } from "../store/slices/settings.slice"
import { TypedSelectorHook } from "./store.hook"

export const useAccent = (): string => {
  const settings = TypedSelectorHook(appSettings)
  return settings?.accent || "#ff8216"
}
