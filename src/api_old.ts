import lines from './lines.json';
import { resolveDefault } from './resolve';

const memory: Memory = {
  seen: new Set<id>(),
  facts: {},
};

// TODO gigantic yikes
function isPlayerLine(line: object): line is PlayerLine {
  return true;
}

const aiLines: { [id: number]: AILine } = lines.astra;
const playerLines: { [id: number]: PlayerLine } = {};
for (let line of lines.player) {
  if (isPlayerLine(line)) {
    playerLines[line.id] = line;
  }
}

export const clickResponse = (id: id) => {
  memory.seen.add(id);
  // find correct AI line
  const candidates = playerLines[id].responses;
  const lineID =
    candidates.find((resp) => resolveDefault(resp.condition, memory))?.id ||
    candidates[candidates.length - 1].id;
  const line = aiLines[lineID];
  // return it with responses filtered and with conditions removed
  return {
    ...line,
    responses: line.responses
      .map((id) => playerLines[id])
      .filter((resp) => resolveDefault(resp.condition, memory))
      .map((resp) => ({ id: resp.id, content: resp.content })),
  };
};
