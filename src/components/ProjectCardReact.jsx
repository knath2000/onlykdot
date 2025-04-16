import React from 'react';

// Note: ProjectCardHover effect is an Astro component and cannot be directly used here.
// If a similar visual effect is desired on hover within the React component,
// it would need to be reimplemented using React-compatible techniques (e.g., CSS, Framer Motion).

import SampleAnimatedProjectCard from './SampleAnimatedProjectCard';
export default function ProjectCardReact({ project, onOpenModal }) {
  const { slug, data } = project;
  const { title, thumbnail, shortDesc, techStack = [], links = {}, gradient, borderColor } = data;

  // DEBUG: Log project data to verify isAnimated and other fields
  if (typeof window !== "undefined") {
    // Only log in browser
    // eslint-disable-next-line no-console
    console.log("ProjectCardReact project:", { slug, data });
  }

  // Render the special animated card for any project with isAnimated: true
  if (data.isAnimated || slug === "sample-animated-card" || title === "Flutter macOS Task Manager") {
    return (
      <SampleAnimatedProjectCard
        title={data.title}
        shortDesc={data.shortDesc}
        techStack={data.techStack}
        summary={project.body}
        thumbnail={
          typeof data.thumbnail === "string"
            ? (data.thumbnail.startsWith('/')
                ? data.thumbnail
                : `/src/assets/project-thumbnails/${data.thumbnail.replace(/^.*[\\/]/, '')}`)
            : (data.thumbnail && typeof data.thumbnail === "object" && data.thumbnail.src
                ? data.thumbnail.src
                : undefined)
        }
        links={data.links || {}}
        gradient={gradient}
        borderColor={borderColor}
        projectUrl={`/projects/${slug}`}
        onOpenModal={onOpenModal ? (e) => onOpenModal(e, project) : undefined}
      />
    );
  }

  const projectUrl = `/projects/${slug}`;

  // Mimic the Astro component's logic for wrapper element
  const CardWrapper = onOpenModal ? 'div' : 'a';
  const cardProps = onOpenModal
      ? { onClick: (e) => onOpenModal(e, project), style: { cursor: 'pointer' } }
      : projectUrl ? { href: projectUrl } : {};

  // Mimic Astro's class:list behavior for conditional classes
  const outerWrapperClasses = [
    "block",
    "transition-all duration-300 ease-in-out group hover:-translate-y-1",
    projectUrl ? "cursor-pointer" : "",
  ].filter(Boolean).join(" ");

  const innerWrapperClasses = [
    "border border-gray-700/50 rounded-lg overflow-hidden shadow-lg bg-gray-800/30",
    "group-hover:border-accent-blue/50 group-hover:shadow-accent-blue/10",
    "h-full flex flex-col",
  ].filter(Boolean).join(" ");

  return (
    <CardWrapper {...cardProps} className={outerWrapperClasses}>
      <div className={innerWrapperClasses}>
        {/* 1. Title Section */}
        <div className="p-4 md:p-6 pb-0">
          <h3 className="text-lg md:text-xl font-heading font-bold mb-2 group-hover:text-accent-blue transition-colors">
            {title}
          </h3>
        </div>

        {/* 2. Thumbnail Section */}
        <div className="relative aspect-video overflow-hidden">
          <img
            // Use the thumbnail path string directly. Handle null case.
            // NOTE: This bypasses Astro's image optimization for now.
            src={thumbnail ? `/src/assets/project-thumbnails/${thumbnail}` : '/placeholder.png'} // Construct path relative to public or use placeholder
            alt={`Thumbnail for ${title}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            // Set explicit width/height for aspect ratio to help CLS, even without full optimization yet
            width="800"
            height="450"
          />
          {/* Description Overlay */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm p-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            <p className="text-center text-sm text-white">{shortDesc}</p>
          </div>
        </div>

        {/* 3. Tags and Links Section */}
        <div className="p-4 md:p-6 mt-auto flex flex-col flex-grow">
          {techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {techStack.map((tag) => (
                <span key={tag} className="bg-accent-blue/10 text-accent-blue text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {(links.live || links.repo) && (
            <div className="mt-auto pt-4 border-t border-gray-700/50 flex gap-4">
              {links.live && (
                <a
                  href={links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} // Prevent card link navigation if link is clicked
                  className="text-accent-green border border-accent-green/50 hover:bg-accent-green/10 px-3 py-1 rounded text-xs font-medium transition-colors duration-200 z-10 relative"
                >
                  Live Demo
                </a>
              )}
              {links.repo && (
                <a
                  href={links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} // Prevent card link navigation if link is clicked
                  className="text-accent-magenta border border-accent-magenta/50 hover:bg-accent-magenta/10 px-3 py-1 rounded text-xs font-medium transition-colors duration-200 z-10 relative"
                >
                  GitHub Repo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </CardWrapper>
  );
}