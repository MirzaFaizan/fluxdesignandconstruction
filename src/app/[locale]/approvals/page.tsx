import {
  createShellMetadata,
  createShellPage,
  generateShellStaticParams,
} from "../_shell-page";

export const generateStaticParams = generateShellStaticParams;
export const generateMetadata = createShellMetadata("Approvals", "/approvals");
export default createShellPage("Approvals");
