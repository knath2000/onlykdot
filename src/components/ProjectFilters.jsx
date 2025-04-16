import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion
import ProjectCardReact from './ProjectCardReact'; // Import the React card component
import ProjectDetailModal from './ProjectDetailModal';

export default function ProjectFilters({ projects: allProjects }) { // Only expect 'projects' prop
  // State for filter controls
  const [availableTags, setAvailableTags] = useState([]);
  const [activeTag, setActiveTag] = useState('All');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // State for the list of projects to display
  const [filteredProjects, setFilteredProjects] = useState(allProjects || []);
  // Track selected project and origin rectangle for reveal animation
  const [selectedProject, setSelectedProject] = useState(null);
  const [originRect, setOriginRect] = useState(null);
  const handleOpenModal = (e, project) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setSelectedProject(project);
    setOriginRect(rect);
  };
  const handleCloseModal = () => {
    setSelectedProject(null);
    setOriginRect(null);
  };

  // Effect 1: Extract unique tags from all projects on mount
  useEffect(() => {
    if (allProjects && allProjects.length > 0) {
      const tags = new Set();
      allProjects.forEach(p => p.data.techStack?.forEach(tag => tags.add(tag)));
      setAvailableTags(['All', ...Array.from(tags).sort()]); // Sort tags alphabetically
      setFilteredProjects(allProjects); // Initialize filtered list
    }
  }, [allProjects]); // Rerun only if the initial projects prop changes

  // Effect 2: Apply filters whenever controls change
  useEffect(() => {
    let currentFiltered = allProjects || [];

    // Apply 'Featured' filter first
    if (showFeaturedOnly) {
      currentFiltered = currentFiltered.filter(p => p.data.isFeatured === true);
    }

    // Apply 'Tag' filter
    if (activeTag !== 'All') {
      currentFiltered = currentFiltered.filter(p => p.data.techStack?.includes(activeTag));
    }

    setFilteredProjects(currentFiltered);
  }, [activeTag, showFeaturedOnly, allProjects]); // Rerun when filters or base data change

  // Handlers for filter controls
  const handleTagClick = (tag) => {
    setActiveTag(tag);
  };

  const handleFeaturedChange = (event) => {
    setShowFeaturedOnly(event.target.checked);
  };

  // --- Framer Motion Variants ---
  const themeColors = { // Define theme colors for easy access in variants
    blue: '#00FFFF',
    magenta: '#FF00FF',
    green: '#00FF7F',
    yellow: '#FFD700',
    grey: '#A0A0A0' // For 'All' button glow maybe? Or keep it neutral.
  };

  const getTagGlowColor = (tag) => {
    switch (tag.toLowerCase()) {
      case 'react': return themeColors.blue;
      case 'astro': return themeColors.magenta;
      case 'tailwind': return themeColors.green;
      case 'threejs': case 'r3f': return themeColors.yellow;
      case 'all': return themeColors.blue; // Glow blue when 'All' is active
      default: return themeColors.blue; // Default glow color
    }
  };

  const buttonVariants = {
    initial: {
      scale: 1,
      y: 0,
      boxShadow: 'none', // No glow initially
      transition: { duration: 0.2, ease: "easeOut" }
    },
    hover: (customColor) => ({ // Accept custom color
      scale: 1.05,
      y: -2,
      boxShadow: `0 0 8px ${customColor || themeColors.blue}`, // Use dynamic color for glow
      transition: { duration: 0.2, ease: "easeOut" }
    }),
    tap: {
      scale: 0.95,
      transition: { duration: 0.1, ease: "easeOut" }
    }
  };

  // --- Static Tailwind Classes Helper ---
  // Only returns static layout, color, and inner shadow classes.
  // Hover background colors remain here, transitions/transforms handled by Framer Motion.
  const getTagClasses = (tag, isActive) => {
    const baseClasses = "px-3 py-1 rounded text-sm shadow-inner"; // Added shadow-inner, removed transition
    let colorClasses = "";

    if (isActive) {
      // Active styles - solid background, bright text
      switch (tag.toLowerCase()) {
        case 'react': colorClasses = "bg-accent-blue text-base font-semibold"; break;
        case 'astro': colorClasses = "bg-accent-magenta text-base font-semibold"; break;
        case 'tailwind': colorClasses = "bg-accent-green text-base font-semibold"; break;
        case 'threejs': case 'r3f': colorClasses = "bg-accent-yellow text-base font-semibold"; break;
        case 'all': colorClasses = "bg-accent-blue text-base font-semibold"; break;
        default: colorClasses = "bg-accent-blue text-base font-semibold"; break;
      }
    } else {
      // Inactive styles - subtle background/text, hover background effect
      if (tag === 'All') {
         colorClasses = "bg-gray-700 hover:bg-gray-600 text-secondary"; // Keep hover background
      } else {
        switch (tag.toLowerCase()) {
          case 'react': colorClasses = "bg-accent-blue/10 hover:bg-accent-blue/20 text-accent-blue"; break; // Keep hover background
          case 'astro': colorClasses = "bg-accent-magenta/10 hover:bg-accent-magenta/20 text-accent-magenta"; break; // Keep hover background
          case 'tailwind': colorClasses = "bg-accent-green/10 hover:bg-accent-green/20 text-accent-green"; break; // Keep hover background
          case 'threejs': case 'r3f': colorClasses = "bg-accent-yellow/10 hover:bg-accent-yellow/20 text-accent-yellow"; break; // Keep hover background
          default: colorClasses = "bg-accent-blue/10 hover:bg-accent-blue/20 text-accent-blue"; break; // Keep hover background
        }
      }
    }
    return `${baseClasses} ${colorClasses}`;
  };

  return (
    <>
    <div>
      {/* Filter Controls */}
      <div className="mb-8 p-4 bg-gray-800/30 rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-center text-primary">Filter Projects</h2>
        <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
          {availableTags.map(tag => (
            <motion.button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={getTagClasses(tag, activeTag === tag)} // Use helper for STATIC classes
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              custom={getTagGlowColor(tag)} // Pass dynamic color for glow variant
            >
              {tag}
            </motion.button>
          ))}
        </div>
        <div className="flex justify-center items-center mt-4">
          <label className="flex items-center gap-2 text-secondary cursor-pointer">
            <input
              type="checkbox"
              checked={showFeaturedOnly}
              onChange={handleFeaturedChange}
              className="form-checkbox h-4 w-4 text-accent-blue bg-gray-700 border-gray-600 rounded focus:ring-accent-blue/50 focus:ring-offset-gray-800"
            />
            Show Featured Only
          </label>
        </div>
      </div>

      {/* Filtered Project List */}
      {/* Added min-h-[400px] to reserve space and reduce CLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <ProjectCardReact
              key={project.slug}
              project={project}
              onOpenModal={handleOpenModal}
            />
          ))
        ) : (
          <p className="text-center text-secondary md:col-span-2 lg:col-span-3">
            No projects found matching your criteria.
          </p>
        )}
      </div>
    </div>
    {selectedProject && originRect && (
      <ProjectDetailModal
        project={selectedProject}
        originRect={originRect}
        onClose={handleCloseModal}
      />
    )}
  </>
);
}