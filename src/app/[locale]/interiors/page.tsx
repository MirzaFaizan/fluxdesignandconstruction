import {
  createShellMetadata,
  createShellPage,
  generateShellStaticParams,
} from "../_shell-page";

export const generateStaticParams = generateShellStaticParams;
export const generateMetadata = createShellMetadata("Interiors", "/interiors");
export default createShellPage("Interiors");
