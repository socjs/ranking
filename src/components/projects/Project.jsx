var React = require('react');
var MainContent = require('../common/MainContent');
var Description = require('../common/utils/Description');
var DeltaBar = require('../common/utils/DeltaBar');
import fromNow from '../../helpers/fromNow';
import log from '../../helpers/log';
var TagLabel = require('../tags/TagLabel');

var Project = React.createClass({

  render: function() {
    // log('Render <Project>', this.props);
    var project = this.props.project;
    return (
      <MainContent className="project-page">
          { project.id && (
            <div>
              { project.tags.map(function (tag) {
                return (
                  <TagLabel key={ tag.id } tag={ tag } />
                );
              }) }
              <h1 style={{ margin: '1rem 0' }}>{ project.name }</h1>
              <div className="project-card">
                <div className="inner">
                  <p>
                    <Description text={ project.description } />
                  </p>
                  { project.url && (
                    <p>
                      <span className="octicon octicon-globe"></span>
                      Website: <a href={ project.url }>{ project.url }</a>
                    </p>
                  )}
                  <p>
                    <span className="octicon octicon-mark-github"></span>
                    Github: <a href={ project.repository }>{ project.repository }</a>
                    {' '}
                    { project.stars } <span className="octicon octicon-star"></span>
                  </p>
                  <div className="last-commit">
                    <span className="octicon octicon-git-commit"></span>
                    {' '}
                    Last update: { fromNow(project.pushed_at) }
                  </div>
                </div>
                <div>
                  { project.deltas.length > 0 && <DeltaBar data={ project.deltas.slice(0,7) } />}
                </div>
              </div>

              <div className="readme">
                  <div>
                    <div className="header">
                      <span className="octicon octicon-book"></span>
                      {' '}
                      README
                    </div>

                    <div className="body">
                      { project.readme ? (
                        <div dangerouslySetInnerHTML={{ __html: project.readme }}></div>
                        ) : (
                        <div style={{ textAlign: 'center' }}>
                          <p style={{ color: '#aaa' }}>Loading README from Github...</p>
                          <span className="mega-octicon octicon-book" style={{ margin: '1em 0', fontSize: 100, color: '#bbb' }}></span>
                        </div>
                      )}
                    </div>

                    <div className="footer" style={{ textAlign: 'center' }}>
                      <a className="btn" href={ project.repository }>View on Github</a>
                    </div>
                  </div>

              </div>
            </div>
          ) }
      </MainContent>
    );
  }

});

module.exports = Project;
