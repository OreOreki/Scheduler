import { gql } from 'urql';

export const SEARCH_USER = gql`
  query ($page: Int!, $query: String!) {
    Page(page: $page, perPage: 50) {
      users(search: $query) {
        id
        name
        about
        avatar {
          large
          medium
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query ($id: Int!) {
    User(id: $id) {
      id
      name
      about
      avatar {
        large
        medium
      }
      bannerImage
    }

    MediaListCollection(userId: $id, type: ANIME) {
      lists {
        name
        entries {
          media {
            title {
              romaji
              english
            }
            id
            bannerImage
            coverImage {
              extraLarge
              large
              medium
              color
            }
            averageScore
            format
            episodes
            status
            startDate {
              year
              month
              day
            }
            endDate {
              year
              month
              day
            }
            siteUrl
            description
            nextAiringEpisode {
              episode
              timeUntilAiring
              airingAt
            }
          }
        }
      }
    }
  }
`;
