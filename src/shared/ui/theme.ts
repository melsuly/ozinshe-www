import { MantineProviderProps } from "@mantine/core"

export const theme: MantineProviderProps["theme"] = {
  colors: {
    gray: [
      "#F9FAFB",
      "#F3F4F6",
      "#E5E7EB",
      "#D1D5DB",
      "#9CA3AF",
      "#6B7280",
      "#4B5563",
      "#374151",
      "#1F2937",
      "#111827",
    ],
  },

  primaryColor: "violet",

  white: "#fff",
  black: "#111827",

  fontFamily: "Inter, sans-serif",

  headings: {
    fontFamily: "Inter, sans-serif",
    fontWeight: "bold",
  },
}
