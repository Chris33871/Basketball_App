/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSessionTimesTable = /* GraphQL */ `
  subscription OnCreateSessionTimesTable(
    $filter: ModelSubscriptionSessionTimesTableFilterInput
    $GameOwner: String
  ) {
    onCreateSessionTimesTable(filter: $filter, GameOwner: $GameOwner) {
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
export const onUpdateSessionTimesTable = /* GraphQL */ `
  subscription OnUpdateSessionTimesTable(
    $filter: ModelSubscriptionSessionTimesTableFilterInput
    $GameOwner: String
  ) {
    onUpdateSessionTimesTable(filter: $filter, GameOwner: $GameOwner) {
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
export const onDeleteSessionTimesTable = /* GraphQL */ `
  subscription OnDeleteSessionTimesTable(
    $filter: ModelSubscriptionSessionTimesTableFilterInput
    $GameOwner: String
  ) {
    onDeleteSessionTimesTable(filter: $filter, GameOwner: $GameOwner) {
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
export const onCreateSessionsTable = /* GraphQL */ `
  subscription OnCreateSessionsTable(
    $filter: ModelSubscriptionSessionsTableFilterInput
    $GameOwner: String
  ) {
    onCreateSessionsTable(filter: $filter, GameOwner: $GameOwner) {
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
export const onUpdateSessionsTable = /* GraphQL */ `
  subscription OnUpdateSessionsTable(
    $filter: ModelSubscriptionSessionsTableFilterInput
    $GameOwner: String
  ) {
    onUpdateSessionsTable(filter: $filter, GameOwner: $GameOwner) {
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
export const onDeleteSessionsTable = /* GraphQL */ `
  subscription OnDeleteSessionsTable(
    $filter: ModelSubscriptionSessionsTableFilterInput
    $GameOwner: String
  ) {
    onDeleteSessionsTable(filter: $filter, GameOwner: $GameOwner) {
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
export const onCreateTeamsTable = /* GraphQL */ `
  subscription OnCreateTeamsTable(
    $filter: ModelSubscriptionTeamsTableFilterInput
    $TeamOwner: String
  ) {
    onCreateTeamsTable(filter: $filter, TeamOwner: $TeamOwner) {
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
export const onUpdateTeamsTable = /* GraphQL */ `
  subscription OnUpdateTeamsTable(
    $filter: ModelSubscriptionTeamsTableFilterInput
    $TeamOwner: String
  ) {
    onUpdateTeamsTable(filter: $filter, TeamOwner: $TeamOwner) {
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
export const onDeleteTeamsTable = /* GraphQL */ `
  subscription OnDeleteTeamsTable(
    $filter: ModelSubscriptionTeamsTableFilterInput
    $TeamOwner: String
  ) {
    onDeleteTeamsTable(filter: $filter, TeamOwner: $TeamOwner) {
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
export const onCreateGamesTable = /* GraphQL */ `
  subscription OnCreateGamesTable(
    $filter: ModelSubscriptionGamesTableFilterInput
    $GameOwner: String
  ) {
    onCreateGamesTable(filter: $filter, GameOwner: $GameOwner) {
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
export const onUpdateGamesTable = /* GraphQL */ `
  subscription OnUpdateGamesTable(
    $filter: ModelSubscriptionGamesTableFilterInput
    $GameOwner: String
  ) {
    onUpdateGamesTable(filter: $filter, GameOwner: $GameOwner) {
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
export const onDeleteGamesTable = /* GraphQL */ `
  subscription OnDeleteGamesTable(
    $filter: ModelSubscriptionGamesTableFilterInput
    $GameOwner: String
  ) {
    onDeleteGamesTable(filter: $filter, GameOwner: $GameOwner) {
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
export const onCreateUsersTable = /* GraphQL */ `
  subscription OnCreateUsersTable(
    $filter: ModelSubscriptionUsersTableFilterInput
    $owner: String
  ) {
    onCreateUsersTable(filter: $filter, owner: $owner) {
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
export const onUpdateUsersTable = /* GraphQL */ `
  subscription OnUpdateUsersTable(
    $filter: ModelSubscriptionUsersTableFilterInput
    $owner: String
  ) {
    onUpdateUsersTable(filter: $filter, owner: $owner) {
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
export const onDeleteUsersTable = /* GraphQL */ `
  subscription OnDeleteUsersTable(
    $filter: ModelSubscriptionUsersTableFilterInput
    $owner: String
  ) {
    onDeleteUsersTable(filter: $filter, owner: $owner) {
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
