import axios from 'axios';

export const SELECT_TAB = "SELECT_TAB";
export const HIGHLIGHT_FAVORITE = "HIGHLIGHT_FAVORITE";
export const FILTER_SEARCHED_TEAMS = "FILTER_SEARCHED_TEAMS";
export const NO_RESULT_FOUND = "NO_RESULT_FOUND";

const selectedTab = (tab) => ({
  type: SELECT_TAB,
  selectedSport: tab
});

const filterTeams = (filteredTeams) => ({
  type: FILTER_SEARCHED_TEAMS,
  filteredTeams,
  message: ''
})

const showNoResults = (message) => ({
  type: NO_RESULT_FOUND,
  message
});


const highlightFavorited = (user) => ({
  type: HIGHLIGHT_FAVORITE,
  user
});


const updateSelectedTab = (sport, term, teams) => (dispatch) => {
  let searchTerm = term.toUpperCase();
  let filteredTeams = [];
  if (term.length === 0) {
    dispatch(selectedTab(sport));
    dispatch(filterTeams(filteredTeams));
  } else if (term.length > 0) {
    if (sport === "NBA") {
      filteredTeams = teams.filter(team =>
        team.sports_id === "1" &&
        (team.full_name.toUpperCase().includes(searchTerm) ||
        team.display_name.includes(searchTerm)));
      dispatch(selectedTab(sport));
      if (JSON.stringify(filteredTeams).length > 4) {
        dispatch(filterTeams(filteredTeams));
      } else {
        dispatch(showNoResults("No results found..."));
      }
    } else if (sport === "NFL") {
      filteredTeams = teams.filter(team =>
        team.sports_id === "2" &&
        (team.full_name.toUpperCase().includes(searchTerm) ||
        team.display_name.toUpperCase().includes(searchTerm)));
      dispatch(selectedTab(sport));
      if (JSON.stringify(filteredTeams).length > 4) {
        dispatch(filterTeams(filteredTeams));
      } else {
        dispatch(showNoResults("No results found..."));
      }
    } else if (sport === "NHL") {
      filteredTeams = teams.filter(team =>
        team.sports_id === "3" &&
        (team.full_name.toUpperCase().includes(searchTerm) ||
        team.display_name.toUpperCase().includes(searchTerm)));
      dispatch(selectedTab(sport));
      if (JSON.stringify(filteredTeams).length > 4) {
        dispatch(filterTeams(filteredTeams));
      } else {
        dispatch(showNoResults("No results found..."));
      }
    }
  }
}


const toggleTeamFavorited = (team_id, user, history) => {
  return (dispatch) => {
    const axiosBod = {
      user_teams: user.favorite_teams,
      user_id: user.userId,
      team_id,
      token: localStorage.getItem("token")
    }

    return axios.put("/api/toggle-favorite-team", axiosBod)
      .then(response => {
        const username = user.username;
        const favorite_teams = response.data.user.favorite_teams;
        const userId = user.userId;
        const updatedUser = { userId, username, favorite_teams };
        dispatch(highlightFavorited(updatedUser));
        history.push("/");
      })
  }
}


export {
  updateSelectedTab,
  toggleTeamFavorited
};
