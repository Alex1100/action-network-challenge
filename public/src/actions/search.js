export const UPDATE_SEARCH_TERM = "UPDATE_SEARCH_TERM";
export const GRAB_ALL_TEAMS = "GRAB_ALL_TEAMS";
export const FILTER_TEAMS = "FILTER_TEAMS";
export const NO_RESULT_MESSAGE = "NO_RESULT_MESSAGE";


const updateTerm = (term) => ({
  type: UPDATE_SEARCH_TERM,
  term
});

const filterTeams = (filteredTeams) => ({
  type: FILTER_TEAMS,
  filteredTeams,
  message: ''
});

const showNoResults = (message) => ({
  type: NO_RESULT_MESSAGE,
  message
});


const updateSearchTerm = (term, teams, sport) => (dispatch) => {
  let searchTerm = term.toUpperCase();
  if (term.length === 0) {
    dispatch(updateTerm(term));
    dispatch(filterTeams([]));
  } else if (term.length > 0) {
    let filteredTeams = [];
    if (sport === "NBA") {
      filteredTeams = teams.filter(team =>
        team.sports_id === "1" &&
        (team.full_name.toUpperCase().includes(searchTerm) ||
        team.display_name.includes(searchTerm)));
      dispatch(updateTerm(term));
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
      dispatch(updateTerm(term));
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
      dispatch(updateTerm(term));
      if (JSON.stringify(filteredTeams).length > 4) {
        dispatch(filterTeams(filteredTeams));
      } else {
        dispatch(showNoResults("No results found..."));
      }
    }
  }
}


export {
  updateSearchTerm
};
