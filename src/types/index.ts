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
