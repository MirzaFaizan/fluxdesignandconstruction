import {
  createShellMetadata,
  createShellPage,
  generateShellStaticParams,
} from "../_shell-page";

export const generateStaticParams = generateShellStaticParams;
export const generateMetadata = createShellMetadata("Studio", "/studio");
export default createShellPage("Studio");
