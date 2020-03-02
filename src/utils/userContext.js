import React from "react";

const UserContext = React.createContext({
  users: [{}],
  filteredUsers: [{}],
  headings: [{}],
  order: "",
  handleSort: () => undefined,
  handleSearchChange: () => undefined,
  handleDOBSort: () => undefined
});

export default UserContext;
