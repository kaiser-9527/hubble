const SearchTypeRex = [
  { type: "pure", regexp: /pure:/i },
  { type: "lang", regexp: /lang:(\S+)/i },
  { type: "tag", regexp: /tag:(\S+)/i },
  { type: "comment", regexp: /comment:(\S+)/i },
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
