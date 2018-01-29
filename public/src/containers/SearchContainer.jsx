import React,
{
  Component
} from 'react';

import {
  connect
} from 'react-redux';

import {
  Tabs,
  Tab
} from 'react-bootstrap';

import {
  updateSearchTerm
} from '../actions/search';

import {
  updateSelectedTab,
  toggleTeamFavorited
} from '../actions/team';


class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.setTab = this.setTab.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.toggleFavoritedTeam = this.toggleFavoritedTeam.bind(this);
  }


  setTab(e) {
    const {
      dispatch,
      term,
      teams
    } = this.props;

    dispatch(updateSelectedTab(e.target.id.slice(6, e.target.id.length), term, teams));
  }

  handleSearchInput(e) {
    const {
      dispatch,
      teams
    } = this.props;

    const sportType = document.getElementsByClassName('active')[0].textContent;
    dispatch(updateSearchTerm(e.target.value, teams, sportType));
  }

  toggleFavoritedTeam(e) {
    const {
      dispatch,
      history
    } = this.props;

    const {
      user
    } = this.props;

    dispatch(
      toggleTeamFavorited(
        e.target.getAttribute("data"),
        user,
        history
      )
    );
  }


  render() {
    const {
      selectedSport,
      teams,
      user,
      term,
      filteredTeams,
      message
    } = this.props;

    return filteredTeams === undefined && message.length === 0 || JSON.stringify(filteredTeams) === "[]" && message.length === 0  ? (
      <div className="search-container">
        <div className="search-tabs-container">
          <Tabs
            onClick={(e) => this.setTab(e)}
            defaultActiveKey={'NBA'}
            id="t"
            className="sports-tab">
            <Tab onClick={(e) => this.setTab(e)} eventKey={'NBA'} title="NBA">
              NBA
            </Tab>
            <Tab onClick={(e) => this.setTab(e)} eventKey={'NFL'} title="NFL">
              NFL
            </Tab>
            <Tab onClick={(e) => this.setTab(e)} eventKey={'NHL'} title="NHL">
              NHL
            </Tab>
          </Tabs>
        </div>
        <div className="search-input-container">
          <input
            type="text"
            name="team-search"
            value={term}
            placeholder="Find Teams"
            onChange={(e) => this.handleSearchInput(e)}
          />
          <span class="glyphicon glyphicon-search"></span>
        </div>
        <div className="search-results-container">
           {
            selectedSport === "NBA" ? (
              <div className="searched-teams-container">
                {
                  teams.filter(item => item.sports_id === "1").map(team => {
                    return user.favorite_teams.includes(`${team.id}`) ? (
                      <div
                        className="team-info"
                        key={`nba-team-${team.id}`}>
                        <div className="team-container">
                          <div className="team-image">
                            <img src={team.logo} />
                          </div>
                          <div className="team-name">
                            {team.full_name}
                          </div>
                          <div
                            key={`${team.id}`}
                            data={`${team.id}`}
                            onClick={(e) => this.toggleFavoritedTeam(e)}
                            className="star-favorited" />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="team-info"
                        key={`nba-team-${team.id}`}>
                        <div className="team-container">
                          <div className="team-image">
                            <img src={team.logo} />
                          </div>
                          <div className="team-name">
                            {team.full_name}
                          </div>
                          <div
                            key={`${team.id}`}
                            data={`${team.id}`}
                            onClick={(e) => this.toggleFavoritedTeam(e)}
                            className="star-unfavorited" />
                        </div>
                      </div>
                    )
                  })
               }
              </div>
            ) : selectedSport === "NFL" ? (
              <div className="searched-teams-container">
                {
                  teams.filter(item => item.sports_id === "2").map(team => {
                    return user.favorite_teams.includes(`${team.id}`) ? (
                      <div
                        className="team-info"
                        key={`nfl-team-${team.id}`}>
                        <div className="team-container">
                          <div className="team-image">
                            <img src={team.logo} />
                          </div>
                          <div className="team-name">
                            {team.full_name}
                          </div>
                          <div
                            key={`${team.id}`}
                            data={`${team.id}`}
                            onClick={(e) => this.toggleFavoritedTeam(e)}
                            className="star-favorited" />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="team-info"
                        key={`nfl-team-${team.id}`}>
                        <div className="team-container">
                          <div className="team-image">
                            <img src={team.logo} />
                          </div>
                          <div className="team-name">
                            {team.full_name}
                          </div>
                          <div
                            key={`${team.id}`}
                            data={`${team.id}`}
                            onClick={(e) => this.toggleFavoritedTeam(e)}
                            className="star-unfavorited" />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            ) : selectedSport === "NHL" ? (
              <div className="searched-teams-container">
                {
                  teams.filter(item => item.sports_id === "3").map(team => {
                    return user.favorite_teams.includes(`${team.id}`) ? (
                      <div
                        className="team-info"
                        key={`nhl-team-${team.id}`}>
                        <div className="team-container">
                          <div className="team-image">
                            <img src={team.logo} />
                          </div>
                          <div className="team-name">
                            {team.full_name}
                          </div>
                          <div
                            key={`${team.id}`}
                            data={`${team.id}`}
                            onClick={(e) => this.toggleFavoritedTeam(e)}
                            className="star-favorited" />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="team-info"
                        key={`nhl-team-${team.id}`}>
                        <div className="team-container">
                          <div className="team-image">
                            <img src={team.logo} />
                          </div>
                          <div className="team-name">
                            {team.full_name}
                          </div>
                          <div
                            key={`${team.id}`}
                            data={`${team.id}`}
                            onClick={(e) => this.toggleFavoritedTeam(e)}
                            className="star-unfavorited" />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            ) : null
          }
        </div>
      </div>
    ) : message === undefined || message.length === 0 ? (
      <div className="search-container">
        <div className="search-tabs-container">
          <Tabs
            onClick={(e) => this.setTab(e)}
            defaultActiveKey={'NBA'}
            id="t"
            className="sports-tab">
            <Tab onClick={(e) => this.setTab(e)} eventKey={'NBA'} title="NBA">
              NBA
            </Tab>
            <Tab onClick={(e) => this.setTab(e)} eventKey={'NFL'} title="NFL">
              NFL
            </Tab>
            <Tab onClick={(e) => this.setTab(e)} eventKey={'NHL'} title="NHL">
              NHL
            </Tab>
          </Tabs>
        </div>
        <div className="search-input-container">
          <input
            type="text"
            name="team-search"
            value={term}
            placeholder="Find Teams"
            onChange={(e) => this.handleSearchInput(e)}
          />
          <span class="glyphicon glyphicon-search"></span>
        </div>
        <div className="search-results-container">
           {
            selectedSport === "NBA" ? (
              <div className="searched-teams-container">
                {
                  filteredTeams.filter(item => item.sports_id === "1").map(team => {
                    return user.favorite_teams.includes(`${team.id}`) ? (
                      <div
                        className="team-info"
                        key={`nba-team-${team.id}`}>
                        <div className="team-container">
                          <div className="team-image">
                            <img src={team.logo} />
                          </div>
                          <div className="team-name">
                            {team.full_name}
                          </div>
                          <div
                            key={`${team.id}`}
                            data={`${team.id}`}
                            onClick={(e) => this.toggleFavoritedTeam(e)}
                            className="star-favorited" />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="team-info"
                        key={`nba-team-${team.id}`}>
                        <div className="team-container">
                          <div className="team-image">
                            <img src={team.logo} />
                          </div>
                          <div className="team-name">
                            {team.full_name}
                          </div>
                          <div
                            key={`${team.id}`}
                            data={`${team.id}`}
                            onClick={(e) => this.toggleFavoritedTeam(e)}
                            className="star-unfavorited" />
                        </div>
                      </div>
                    )
                  })
               }
              </div>
            ) : selectedSport === "NFL" ? (
              <div className="searched-teams-container">
                {
                  filteredTeams.filter(item => item.sports_id === "2").map(team => {
                    return user.favorite_teams.includes(`${team.id}`) ? (
                      <div
                        className="team-info"
                        key={`nfl-team-${team.id}`}>
                        <div className="team-container">
                          <div className="team-image">
                            <img src={team.logo} />
                          </div>
                          <div className="team-name">
                            {team.full_name}
                          </div>
                          <div
                            key={`${team.id}`}
                            data={`${team.id}`}
                            onClick={(e) => this.toggleFavoritedTeam(e)}
                            className="star-favorited" />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="team-info"
                        key={`nfl-team-${team.id}`}>
                        <div className="team-container">
                          <div className="team-image">
                            <img src={team.logo} />
                          </div>
                          <div className="team-name">
                            {team.full_name}
                          </div>
                          <div
                            key={`${team.id}`}
                            data={`${team.id}`}
                            onClick={(e) => this.toggleFavoritedTeam(e)}
                            className="star-unfavorited" />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            ) : selectedSport === "NHL" ? (
              <div className="searched-teams-container">
                {
                  filteredTeams.filter(item => item.sports_id === "3").map(team => {
                    return user.favorite_teams.includes(`${team.id}`) ? (
                      <div
                        className="team-info"
                        key={`nhl-team-${team.id}`}>
                        <div className="team-container">
                          <div className="team-image">
                            <img src={team.logo} />
                          </div>
                          <div className="team-name">
                            {team.full_name}
                          </div>
                          <div
                            key={`${team.id}`}
                            data={`${team.id}`}
                            onClick={(e) => this.toggleFavoritedTeam(e)}
                            className="star-favorited" />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="team-info"
                        key={`nhl-team-${team.id}`}>
                        <div className="team-container">
                          <div className="team-image">
                            <img src={team.logo} />
                          </div>
                          <div className="team-name">
                            {team.full_name}
                          </div>
                          <div
                            key={`${team.id}`}
                            data={`${team.id}`}
                            onClick={(e) => this.toggleFavoritedTeam(e)}
                            className="star-unfavorited" />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            ) : null
          }
        </div>
      </div>
    ) : (
      <div className="search-container">
        <div className="search-tabs-container">
          <Tabs
            onClick={(e) => this.setTab(e)}
            defaultActiveKey={'NBA'}
            id="t"
            className="sports-tab">
            <Tab onClick={(e) => this.setTab(e)} eventKey={'NBA'} title="NBA">
              NBA
            </Tab>
            <Tab onClick={(e) => this.setTab(e)} eventKey={'NFL'} title="NFL">
              NFL
            </Tab>
            <Tab onClick={(e) => this.setTab(e)} eventKey={'NHL'} title="NHL">
              NHL
            </Tab>
          </Tabs>
        </div>
        <div className="search-input-container">
          <input
            type="text"
            name="team-search"
            value={term}
            placeholder="Find Teams"
            onChange={(e) => this.handleSearchInput(e)}
          />
          <span class="glyphicon glyphicon-search"></span>
        </div>
        <div className="search-results-container">
           <div className="no-results-container">
              <p className="no-results-text">{message}</p>
              <img className="no-results-img" src="http://i.imgur.com/pFQZf.jpg"/>
           </div>
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  const {
    teamData,
    search
  } = state;

  const {
    selectedSport,
    teams,
    filteredTeams,
    message
  } = teamData;

  const {
    term
  } = search;

  return {
    selectedSport,
    teams,
    term,
    filteredTeams,
    message
  };
};

export default connect(mapStateToProps)(SearchContainer);

