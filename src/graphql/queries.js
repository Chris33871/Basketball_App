/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSessionTimesTable = /* GraphQL */ `
  query GetSessionTimesTable($id: ID!) {
    getSessionTimesTable(id: $id) {
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
export const listSessionTimesTables = /* GraphQL */ `
  query ListSessionTimesTables(
    $filter: ModelSessionTimesTableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSessionTimesTables(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getSessionsTable = /* GraphQL */ `
  query GetSessionsTable($id: ID!) {
    getSessionsTable(id: $id) {
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
export const listSessionsTables = /* GraphQL */ `
  query ListSessionsTables(
    $filter: ModelSessionsTableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSessionsTables(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        SessionLocation
        SessionPlayers
        SessionPlayersCount
        createdAt
        updatedAt
        GameOwner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTeamsTable = /* GraphQL */ `
  query GetTeamsTable($id: ID!) {
    getTeamsTable(id: $id) {
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
export const listTeamsTables = /* GraphQL */ `
  query ListTeamsTables(
    $filter: ModelTeamsTableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeamsTables(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        TeamName
        TeamOwner
        TeamStatus
        TeamMembers
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getGamesTable = /* GraphQL */ `
  query GetGamesTable($id: ID!) {
    getGamesTable(id: $id) {
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
export const listGamesTables = /* GraphQL */ `
  query ListGamesTables(
    $filter: ModelGamesTableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGamesTables(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getUsersTable = /* GraphQL */ `
  query GetUsersTable($id: ID!) {
    getUsersTable(id: $id) {
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
export const listUsersTables = /* GraphQL */ `
  query ListUsersTables(
    $filter: ModelUsersTableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsersTables(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
