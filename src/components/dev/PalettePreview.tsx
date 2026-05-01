import { darkModePalette } from "@/styles/themes/dark"

const { colors } = darkModePalette

type Swatch = { name: string; value: string }
type Group = { label: string; swatches: Swatch[] }

const groups: Group[] = [
  {
    label: "Base",
    swatches: [
      { name: "background", value: colors.background },
      { name: "surface", value: colors.surface },
      { name: "surfaceElevated", value: colors.surfaceElevated },
    ],
  },
  {
    label: "Primary",
    swatches: Object.entries(colors.primary).map(([k, v]) => ({ name: k, value: v })),
  },
  {
    label: "Secondary",
    swatches: Object.entries(colors.secondary).map(([k, v]) => ({ name: k, value: v })),
  },
  {
    label: "Accent",
    swatches: Object.entries(colors.accent).map(([k, v]) => ({ name: k, value: v })),
  },
  {
    label: "Danger",
    swatches: Object.entries(colors.danger).map(([k, v]) => ({ name: k, value: v })),
  },
  {
    label: "Text",
    swatches: Object.entries(colors.text).map(([k, v]) => ({ name: k, value: v })),
  },
  {
    label: "Glow",
    swatches: Object.entries(colors.glow).map(([k, v]) => ({ name: k, value: v })),
  },
]

function ColorSwatch({ name, value }: Swatch) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="w-20 h-14 rounded-lg border border-white/8"
        style={{ backgroundColor: value }}
      />
      <span className="text-text-secondary text-xs">{name}</span>
      <span className="text-text-muted text-[0.65rem]">{value}</span>
    </div>
  )
}

function PalettePreview() {
  return (
    <div className="min-h-screen bg-background px-8 py-10">
      <h1 className="text-text-primary text-2xl font-semibold mb-1">{darkModePalette.name}</h1>
      <p className="text-text-muted text-sm mb-10">Color palette — {darkModePalette.mode} mode</p>

      <div className="flex flex-col gap-10">
        {groups.map(({ label, swatches }) => (
          <div key={label}>
            <p className="text-text-secondary text-xs uppercase tracking-widest mb-4">{label}</p>
            <div className="flex flex-wrap gap-4">
              {swatches.map((s) => (
                <ColorSwatch key={s.name} {...s} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PalettePreview
