import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    red: {
      basic: string;
      lighter: string;
    };
    black: {
      veryDark: string;
      darker: string;
      lighter: string;
    };
    white: {
      darker: string;
      lighter: string;
    };
  }
}
