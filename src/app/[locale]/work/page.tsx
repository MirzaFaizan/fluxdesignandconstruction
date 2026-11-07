import {
  createShellMetadata,
  createShellPage,
  generateShellStaticParams,
} from "../_shell-page";

export const generateStaticParams = generateShellStaticParams;
export const generateMetadata = createShellMetadata("Work", "/work");
export default createShellPage("Work");
