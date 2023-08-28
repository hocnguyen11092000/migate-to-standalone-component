type Test = {
  test: string;
};

type User<TUser> = {
  name: string;
  [key: string]: any;
};

const a: User<Test> = {
  name: 'a',
};
