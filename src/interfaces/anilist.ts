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
  page: number;
  query: string;
}

export interface QueryResponse {
  Page: {
    users: User[];
  };
}
