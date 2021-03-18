type Effect = SetEffect | DeleteEffect | MathEffect | ToggleEffect;

type SetEffect = {
  op: 'SET';
  fact: factName;
  value: factValue;
};

type DeleteEffect = {
  op: 'DELETE';
  fact: factName;
};

type MathEffect = {
  op: 'ADD' | 'SUB';
  fact: factName;
  value: number;
};

type ToggleEffect = {
  op: 'TOGGLE';
  fact: factName;
};

function isSetEffect(eff: Effect): eff is SetEffect {
  return eff.op === 'SET';
}

function isDeleteEffect(eff: Effect): eff is DeleteEffect {
  return eff.op === 'DELETE';
}

function isMathEffect(eff: Effect): eff is MathEffect {
  return ['ADD', 'SUB'].includes(eff.op);
}

function isToggleEffect(eff: Effect): eff is ToggleEffect {
  return eff.op === 'TOGGLE';
}

// TODO effects mutate memory - do it some other way?
function applyEffect(eff: Effect, mem: Memory) {
  if (isSetEffect(eff)) {
    applySetEffect(eff, mem);
  } else if (isDeleteEffect(eff)) {
    applyDeleteEffect(eff, mem);
  } else if (isMathEffect(eff)) {
    applyMathEffect(eff, mem);
  } else if (isToggleEffect(eff)) {
    applyToggleEffect(eff, mem);
  }
}

function applySetEffect(eff: SetEffect, mem: Memory) {
  // TODO check if type is mutated
  // maybe optionally, like a strict mode?
  mem.facts[eff.fact] = eff.value;
}

function applyDeleteEffect(eff: DeleteEffect, mem: Memory) {
  delete mem.facts[eff.fact];
}

function applyMathEffect(eff: MathEffect, mem: Memory) {
  // TODO do something if type is wrong?
  if (typeof mem.facts[eff.fact] === 'number') {
    switch (eff.op) {
      case 'ADD': {
        (mem.facts[eff.fact] as number) += eff.value;
        break;
      }
      case 'SUB': {
        (mem.facts[eff.fact] as number) += eff.value;
        break;
      }
    }
  }
}

function applyToggleEffect(eff: ToggleEffect, mem: Memory) {
  // TODO do something if type is wrong?
  if (typeof mem.facts[eff.fact] === 'boolean') {
    mem.facts[eff.fact] = !mem.facts[eff.fact];
  }
}
