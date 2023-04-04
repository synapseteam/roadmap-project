export type RoutesType = {
  home: string;
  featureRequests: string;
  featureRequestsCard: string;
};

export type CardType = {
  title: string;
  id: string;
  likes: number;
  comments: number;
  description?: string;
};

export type SideBarFormType = {
  title: string;
  description?: string;
};

export type ModalFormType = {
  email: string;
  password: string;
};

export type UserType = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  id: string | number | null;
};

export type CommentType = {
  author: UserType;
  text: string;
  createdAt: string;
};

export type CardDetailType = {
  title: string;
  description?: string;
  author: UserType;
  votes: number;
  voters: UserType[];
  createdAt: string;
  comments: CommentType[];
};
