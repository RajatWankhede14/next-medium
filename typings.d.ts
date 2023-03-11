export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  body: [object];
  _createdAt: string;
  comments: [Comment];
  author: {
    name: string;
    image: string;
    slug: string;
  };
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
    title: string;
  };
}

export interface Comment {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
}
