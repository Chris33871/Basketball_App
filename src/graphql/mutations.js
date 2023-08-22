/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSessionTimesTable = /* GraphQL */ `
  mutation CreateSessionTimesTable(
    $input: CreateSessionTimesTableInput!
    $condition: ModelSessionTimesTableConditionInput
  ) {
    createSessionTimesTable(input: $input, condition: $condition) {
      id
      SessionTableId
      SessionTimeLocation
      SessionTimePlayers
      SessionTimePlayersCount
      SessionTimeTime
      SessionTimeDate
      createdAt
      updatedAt
      GameOwner
      __typename
    }
  }
`;
export const updateSessionTimesTable = /* GraphQL */ `
  mutation UpdateSessionTimesTable(
    $input: UpdateSessionTimesTableInput!
    $condition: ModelSessionTimesTableConditionInput
  ) {
    updateSessionTimesTable(input: $input, condition: $condition) {
      id
      SessionTableId
      SessionTimeLocation
      SessionTimePlayers
      SessionTimePlayersCount
      SessionTimeTime
      SessionTimeDate
      createdAt
      updatedAt
      GameOwner
      __typename
    }
  }
`;
export const deleteSessionTimesTable = /* GraphQL */ `
  mutation DeleteSessionTimesTable(
    $input: DeleteSessionTimesTableInput!
    $condition: ModelSessionTimesTableConditionInput
  ) {
    deleteSessionTimesTable(input: $input, condition: $condition) {
      id
      SessionTableId
      SessionTimeLocation
      SessionTimePlayers
      SessionTimePlayersCount
      SessionTimeTime
      SessionTimeDate
      createdAt
      updatedAt
      GameOwner
      __typename
    }
  }
`;
export const createSessionsTable = /* GraphQL */ `
  mutation CreateSessionsTable(
    $input: CreateSessionsTableInput!
    $condition: ModelSessionsTableConditionInput
  ) {
    createSessionsTable(input: $input, condition: $condition) {
      id
      SessionLocation
      SessionPlayers
      SessionPlayersCount
      createdAt
      updatedAt
      GameOwner
      __typename
    }
  }
`;
export const updateSessionsTable = /* GraphQL */ `
  mutation UpdateSessionsTable(
    $input: UpdateSessionsTableInput!
    $condition: ModelSessionsTableConditionInput
  ) {
    updateSessionsTable(input: $input, condition: $condition) {
      id
      SessionLocation
      SessionPlayers
      SessionPlayersCount
      createdAt
      updatedAt
      GameOwner
      __typename
    }
  }
`;
export const deleteSessionsTable = /* GraphQL */ `
  mutation DeleteSessionsTable(
    $input: DeleteSessionsTableInput!
    $condition: ModelSessionsTableConditionInput
  ) {
    deleteSessionsTable(input: $input, condition: $condition) {
      id
      SessionLocation
      SessionPlayers
      SessionPlayersCount
      createdAt
      updatedAt
      GameOwner
      __typename
    }
  }
`;
export const createTeamsTable = /* GraphQL */ `
  mutation CreateTeamsTable(
    $input: CreateTeamsTableInput!
    $condition: ModelTeamsTableConditionInput
  ) {
    createTeamsTable(input: $input, condition: $condition) {
      id
      TeamName
      TeamOwner
      TeamStatus
      TeamMembers
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTeamsTable = /* GraphQL */ `
  mutation UpdateTeamsTable(
    $input: UpdateTeamsTableInput!
    $condition: ModelTeamsTableConditionInput
  ) {
    updateTeamsTable(input: $input, condition: $condition) {
      id
      TeamName
      TeamOwner
      TeamStatus
      TeamMembers
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTeamsTable = /* GraphQL */ `
  mutation DeleteTeamsTable(
    $input: DeleteTeamsTableInput!
    $condition: ModelTeamsTableConditionInput
  ) {
    deleteTeamsTable(input: $input, condition: $condition) {
      id
      TeamName
      TeamOwner
      TeamStatus
      TeamMembers
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createGamesTable = /* GraphQL */ `
  mutation CreateGamesTable(
    $input: CreateGamesTableInput!
    $condition: ModelGamesTableConditionInput
  ) {
    createGamesTable(input: $input, condition: $condition) {
      id
      Location
      GameDate
      GameTime
      GameCompLvl
      GamePlayers
      GamePrice
      GameOwner
      GameCourt
      PlayersSex
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateGamesTable = /* GraphQL */ `
  mutation UpdateGamesTable(
    $input: UpdateGamesTableInput!
    $condition: ModelGamesTableConditionInput
  ) {
    updateGamesTable(input: $input, condition: $condition) {
      id
      Location
      GameDate
      GameTime
      GameCompLvl
      GamePlayers
      GamePrice
      GameOwner
      GameCourt
      PlayersSex
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteGamesTable = /* GraphQL */ `
  mutation DeleteGamesTable(
    $input: DeleteGamesTableInput!
    $condition: ModelGamesTableConditionInput
  ) {
    deleteGamesTable(input: $input, condition: $condition) {
      id
      Location
      GameDate
      GameTime
      GameCompLvl
      GamePlayers
      GamePrice
      GameOwner
      GameCourt
      PlayersSex
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createUsersTable = /* GraphQL */ `
  mutation CreateUsersTable(
    $input: CreateUsersTableInput!
    $condition: ModelUsersTableConditionInput
  ) {
    createUsersTable(input: $input, condition: $condition) {
      id
      Email
      Username
      Surname
      Name
      GamesPlayed
      Team
      teamstableID
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateUsersTable = /* GraphQL */ `
  mutation UpdateUsersTable(
    $input: UpdateUsersTableInput!
    $condition: ModelUsersTableConditionInput
  ) {
    updateUsersTable(input: $input, condition: $condition) {
      id
      Email
      Username
      Surname
      Name
      GamesPlayed
      Team
      teamstableID
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteUsersTable = /* GraphQL */ `
  mutation DeleteUsersTable(
    $input: DeleteUsersTableInput!
    $condition: ModelUsersTableConditionInput
  ) {
    deleteUsersTable(input: $input, condition: $condition) {
      id
      Email
      Username
      Surname
      Name
      GamesPlayed
      Team
      teamstableID
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
