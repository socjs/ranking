import React from 'react'
import ProjectCard from './ProjectCard'

function checkIfDifferent (list0, list1) {
  if (list0.length !== list1.length) return true
  return !list0.every(
    (project, i) => project.slug === list1[i].slug
  )
}

class ProjectList extends React.Component {
  shouldComponentUpdate (nextProps) {
    // Re-render the project list only if the project list has changed
    // to avoid rendering after successful login, and fetch events about heroes, links, reviews and requests
    return checkIfDifferent(this.props.projects, nextProps.projects)
  }
  render () {
    const {
      projects,
      showTags = true,
      showStars = true,
      showDelta = true,
      showDescription = true,
      showURL = false,
      showMetrics = true,
      deltaFilter,
      viewOptions,
      paginated
    } = this.props
    const paginatedProjects = paginated ? projects.slice(0, 10) : projects
    return (
      <div className="project-grid">
      {paginatedProjects.map((project, index) =>
        <div key={project.slug}>
          <ProjectCard
            project={project}
            index={index}
            showTags={showTags}
            showDescription={showDescription}
            showStars={showStars}
            showDelta={showDelta}
            deltaFilter={deltaFilter}
            showURL={showURL}
            showMetrics={showMetrics}
            viewOptions={viewOptions}
          />
        </div>)
      }
      </div>
    )
  }
}

export default ProjectList
