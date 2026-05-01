export const formatTime = (ms: number): string => {
  const m = Math.floor(ms / 60_000)
  const s = Math.floor((ms % 60_000) / 1000)
  return `${m}:${s.toString().padStart(2, "0")}`
}

export const formatRemaining = (ms: number): string => {
  const abs = Math.abs(ms)
  const m = Math.floor(abs / 60_000)
  const s = Math.floor((abs % 60_000) / 1000)
  const t = `${m}:${s.toString().padStart(2, "0")}`
  return ms >= 0 ? `+${t}` : `-${t}`
}
