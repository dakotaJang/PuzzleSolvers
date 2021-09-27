const isSolved = (state: number[][], height: number) => {
  return state.every(
    tube => (!tube.length || tube.length === height)
      && tube.every(ball => ball === tube[0])
  );
}

const updateState = (state: number[][], height: number, from: number, to: number) => {
  const canMove
    = state[from].length > 0
    && state[to].length < height
    && (state[from][0] === state[to][0] || !state[to].length)
    && !(state[from].every(ball => ball === state[from][0]) && state[to].length === 0)
  if (canMove) {
    const x = [...state.map(tube => [...tube])];
    x[to].unshift(x[from].shift() as number);
    return x;
  }
  return state;
}

interface IState {
  state: number[][];
  solved: boolean;
  steps?: string;
}

const solveDepthFirst = (state: IState, height: number, stateHashmap: Set<string>, tubeHashMap: Set<string>[]): IState => {
  if (state.solved) {
    return state
  }

  const { state: currentState, steps } = state;

  let something;
  for (let i = 0; i < currentState.length; i++) {
    for (let j = 0; j < currentState.length; j++) {
      if (i !== j) {
        const nextState = updateState(state.state, height, i, j);
        const stateHash = JSON.stringify(nextState);
        const toTubeHash = nextState[j].join('');
        if (nextState !== state.state && !stateHashmap.has(stateHash) && !tubeHashMap[j].has(toTubeHash)) {
          stateHashmap.add(stateHash);
          if (tubeHashMap && new Set(nextState[j]).size > 1) {
            tubeHashMap[j].add(toTubeHash);
          }
          const solved = isSolved(nextState, height);
          something = solveDepthFirst(
            {
              state: nextState,
              solved,
              steps: steps ? `${steps}|${i},${j}` : `${i},${j}`,
            },
            height,
            stateHashmap,
            tubeHashMap,
          );
          if (something.solved) {
            return something;
          } else {
            tubeHashMap[j].delete(toTubeHash);
          }
        }
      }
    }
  }

  if (something) {
    return something;
  } else {
    return {state:[], solved: false}
  }
}

/**
 * top of the tube is index 0
 * i.e. state[0][0] is top ball of the first tube
 */
export const solve = (state: number[][]) => {
  const height = state[0].length;
  const solved = isSolved(state, height);
  if (solved) {
    return [{ state, solved, steps: [] }] //'already solved'
  } else {
    const stateHashmap = new Set<string>();
    const tubeHashMap = Array(state.length).fill(null).map(() => new Set<string>());
    const {steps, ...result} = solveDepthFirst({ state, solved, steps: '' }, height, stateHashmap, tubeHashMap);
    return [{
      ...result,
      steps: steps?.split('|').map(xy => xy.split(',').map(Number))
    }]
  }
}
