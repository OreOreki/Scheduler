export interface MediaTitle {
  romaji: string;
  english: string;
}

export interface MediaCoverImage {
  extraLarge: string;
  large: string;
  medium: string;
  color: string;
}

export interface MediaStartDate {
  year: number;
  month: number;
  day: number;
}

export interface MediaEndDate {
  year: number;
  month: number;
  day: number;
}

export interface MediaNextAiringEpisode {
  episode: number;
  timeUntilAiring: number;
  airingAt: number;
}

export interface Media {
  title: MediaTitle;
  id: string;
  bannerImage: string;
  coverImage: MediaCoverImage;
  averageScore: number;
  format: string;
  episodes: number;
  status: string;
  startDate: MediaStartDate;
  endDate: MediaEndDate;
  siteUrl: string;
  description: string;
  nextAiringEpisode: MediaNextAiringEpisode;
}

export interface MediaEntry {
  media: Media;
}

export interface MediaList {
  name: string;
  entries: MediaEntry[];
}

export interface MediaListCollection {
  lists: MediaList[];
}

export interface User {
  id: string;
  name: string;
  about: string;
  avatar: {
    large: string;
    medium: string;
  };
  bannerImage: string;
}

export interface QueryVariables {
  id: number;
}

export interface QueryResponse {
  User: User;
  MediaListCollection: MediaListCollection;
}
