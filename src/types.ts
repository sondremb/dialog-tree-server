// v2
type id = number;
type factName = string;
type factValue = boolean | string | number;

// holds everything the AI remembers
type Memory = {
  facts: {
    [name: string]: factValue;
  };
  seen: Set<id>;
};

type LineContent = string;

type Line = {
  id: id;
  content: LineContent;
};

type PlayerLine = Line & {
  condition?: Condition;
  responses: { condition?: Condition; id: id }[];
};

type AILine = Line & {
  responses: id[];
};

/*
display ai line
resolve side effects
for response in line:
    if response triggers:
        show response
wait for user select response
display response
resolve side effects
ai choose line
*/
