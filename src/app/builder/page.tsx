import { WorkspaceBuilder } from "@/components/workspace/WorkspaceBuilder";

export const metadata = {
  title: "3D workspace builder",
  description: "Select items and place them in a 3D Bali workspace.",
};

export default function BuilderPage() {
  return <WorkspaceBuilder />;
}
