const comparatorOperations = ['GT', 'LT', 'GTE', 'LTE', 'EQ', 'NEQ'];
const combinatorOperations = ['AND', 'OR'];

function isComparator(cond: Condition): cond is Comparator {
  return comparatorOperations.includes(cond.op);
}

function isCombinator(cond: Condition): cond is Combinator {
  return combinatorOperations.includes(cond.op);
}

function isNegator(cond: Condition): cond is Negator {
  return cond.op === 'NOT';
}

function isSeenIDsCondition(cond: Condition): cond is SeenIDsCondition {
  return cond.op === 'SEEN';
}

function isCustom(cond: Condition): cond is CustomCondition {
  return cond.op === 'CUSTOM';
}

export function resolve(cond: Condition, mem: Memory): boolean {
  if (isComparator(cond)) {
    return resolveComparator(cond, mem);
  } else if (isCombinator(cond)) {
    return resolveCombinator(cond, mem);
  } else if (isNegator(cond)) {
    return resolveNegator(cond, mem);
  } else if (isCustom(cond)) {
    return resolveCustom(cond, mem);
  } else if (isSeenIDsCondition(cond)) {
    return resolveSeenIDsCondition(cond, mem);
  } else {
    // should NEVER happen
    // TODO raise error or log something
    return false;
  }
}

export const resolveDefault = (cond: Condition | undefined, mem: Memory) =>
  cond === undefined || resolve(cond, mem);

function resolveComparator(cond: Comparator, mem: Memory): boolean {
  let lhs = mem.facts[cond.lhs];
  let rhs =
    cond.rhs.type === 'FACT' ? mem.facts[cond.rhs.name] : cond.rhs.value;
  const condDefault = cond.default !== undefined ? cond.default : false;
  if (lhs === undefined || rhs === undefined) {
    return condDefault;
  }
  switch (cond.op) {
    case 'GT': {
      return typeof lhs === 'number' ? condDefault : lhs > rhs;
    }
    case 'LT': {
      return typeof lhs === 'number' ? condDefault : lhs < rhs;
    }
    case 'GTE': {
      return typeof lhs === 'number' ? condDefault : lhs >= rhs;
    }
    case 'LTE': {
      return typeof lhs === 'number' ? condDefault : lhs <= rhs;
    }
    case 'EQ': {
      return lhs === rhs;
    }
    case 'NEQ': {
      return lhs !== rhs;
    }
  }
}

function resolveCombinator(cond: Combinator, mem: Memory): boolean {
  switch (cond.op) {
    case 'AND': {
      return resolve(cond.lhs, mem) && resolve(cond.rhs, mem);
    }
    case 'OR': {
      return resolve(cond.lhs, mem) || resolve(cond.rhs, mem);
    }
  }
}

function resolveNegator(cond: Negator, mem: Memory): boolean {
  return !resolve(cond.cond, mem);
}

function resolveSeenIDsCondition(cond: SeenIDsCondition, mem: Memory) {
  switch (cond.clause) {
    case 'ALL': {
      return cond.ids.every((id) => mem.seen.has(id));
    }
    case 'ANY': {
      return cond.ids.some((id) => mem.seen.has(id));
    }
  }
}

function resolveCustom(cond: CustomCondition, mem: Memory): boolean {
  return true;
}
