import React from 'react';

// Note: ProjectCardHover effect is an Astro component and cannot be directly used here.
// If a similar visual effect is desired on hover within the React component,
// it would need to be reimplemented using React-compatible techniques (e.g., CSS, Framer Motion).

export default function ProjectCardReact({ project }) {
  const { slug, data } = project;
  const { title, thumbnail, shortDesc, techStack = [], links = {} } = data;
  const projectUrl = `/projects/${slug}`;

  // Mimic the Astro component's logic for wrapper element
  const CardWrapper = projectUrl ? 'a' : 'div';
  const cardProps = projectUrl ? { href: projectUrl } : {};

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
            src={thumbnail.src} // Use .src property from Astro Assets image object
            alt={`Thumbnail for ${title}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            width="1600"
            height="900"
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