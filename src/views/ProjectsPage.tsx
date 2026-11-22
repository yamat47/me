import type { Language } from "@yamat47/pylon";
import { PageHeader, ProjectGrid } from "@yamat47/pylon";
import { projectsIn } from "../content/projects.ts";
import { TEXT } from "../content/text.ts";
import { Frame } from "./Frame.tsx";

/** The page of projects: every one of them, as a grid. */
export function ProjectsPage({ lang }: { lang: Language }) {
  const projects = projectsIn(lang);

  return (
    <Frame lang={lang} page="projects">
      <PageHeader title={TEXT[lang].titles.projects} count={projects.length} />
      <ProjectGrid projects={projects} />
    </Frame>
  );
}
