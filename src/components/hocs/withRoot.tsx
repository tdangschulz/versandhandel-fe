import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ResponsiveAppBar from "../shareds/ResponsiveAppBar";
import { Box } from "@mui/material";
import theme from "../commons/theme";
import { LocaleContext } from "../../context/localContext";

export default function withRoot<P extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>
) {
  function WithRoot(props: P) {
    const { locale } = React.useContext(LocaleContext);

    return (
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ResponsiveAppBar></ResponsiveAppBar>

        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Component {...props} />
          </Box>
          {locale?.footer}
        </main>
      </ThemeProvider>
    );
  }

  return WithRoot;
}
