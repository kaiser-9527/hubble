const SearchTypeRex = [
  { type: "pure", regexp: /#Pure#/ },
  { type: "all", regexp: /#All#/ },
  { type: "lang", regexp: /#lang:(\w+)#/ },
  { type: "tag", regexp: /#tag:(\w+)#/ },
  { type: "comment", regexp: /#comment:(\w+)#/ },
];

export const matchSearchType = (val: string) => {
  const result = { type: "plain", value: val };
  SearchTypeRex.some((item) => {
    const matchResult = val.match(item.regexp);
    if (matchResult) {
      result.type = item.type;
      result.value = matchResult[1];
      return true;
    }
  });

  return result;
};

export const matchVal = (val: string, source?: string) => {
  if (!source) return false;
  return source.toLowerCase().includes(val.toLowerCase());
};
