type Condition =
  | Comparator
  | Combinator
  | Negator
  | SeenIDsCondition
  | CustomCondition;

type OpComparator = 'GT' | 'LT' | 'GTE' | 'LTE' | 'EQ' | 'NEQ';

type OpCombinator = 'AND' | 'OR';

type Comparator = {
  op: 'GT' | 'LT' | 'GTE' | 'LTE' | 'EQ' | 'NEQ';
  lhs: factName;
  // TODO make rhs a separate type
  rhs:
    | { type: 'CONSTANT'; value: factValue }
    | { type: 'FACT'; name: factName };
  default?: boolean;
};

type Combinator = {
  op: 'AND' | 'OR';
  lhs: Condition;
  rhs: Condition;
};

type Negator = {
  op: 'NOT';
  cond: Condition;
};

type SeenIDsCondition = {
  op: 'SEEN';
  clause: 'ANY' | 'ALL';
  ids: id[];
};

type CustomCondition = {
  op: 'CUSTOM';
  name: string;
};

type ConditionFunc = (mem: Memory) => boolean;
type CustomConditionDict = { [name: string]: ConditionFunc };
