export const proxy = (obj: any) => {
  var b: any = {
    name: 'text',
    pax: 'test',
  };

  var a = { name: 'string', key: 'key' };

  const handler3 = {};

  const proxy3 = new Proxy(a, {
    get(target: Object, prop: string) {
      const obj = target;

      console.log('b', b[prop]);

      if (b[prop]) {
        (obj as any)[prop] = b[prop];
      }
      return obj;
    },
  });

  console.log(proxy3);
};
