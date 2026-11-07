import {
  createShellMetadata,
  createShellPage,
  generateShellStaticParams,
} from "../_shell-page";

export const generateStaticParams = generateShellStaticParams;
export const generateMetadata = createShellMetadata("Build", "/build");
export default createShellPage("Build");
