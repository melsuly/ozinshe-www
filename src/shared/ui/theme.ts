import { colorsTuple, MantineProviderProps } from "@mantine/core"

export const theme: MantineProviderProps["theme"] = {
  colors: {
    primaryColor: colorsTuple("#141414"),
    gray: [
      "#f7f7f7",
      "#eaeaea",
      "#e5ddd9",
      "#D1D5DB",
      "#9CA3AF",
      "#6B7280",
      "#4B5563",
      "#374151",
      "#1F2937",
      "#111827",
    ],
  },

  primaryColor: "primaryColor",

  white: "#fff",
  black: "#111827",

  fontFamily: "Inter, sans-serif",

  headings: {
    fontFamily: "Inter, sans-serif",
    fontWeight: "bold",
  },
}
