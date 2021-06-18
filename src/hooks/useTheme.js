import { createMuiTheme } from "@material-ui/core";
import { useSelector } from "react-redux";

export const useTheme = () => {
  const { theme } = useSelector((state) => state.theme);
  return createMuiTheme({
    palette: {
      type: theme,
      primary: {
        main: "#154D4F",
      },
      secondary: {
        main: "#DB0C64",
      },
    },
  });
};
