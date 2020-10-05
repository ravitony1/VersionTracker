import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: "Menlo, monospace"
  },
  fontSizes: ["10px", "12px", "14px", "16px", "18px", "20px", "24px"],
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#33e"
  },
  spacing: (factor) => `${0.25 * factor}rem`
});

export default theme;
