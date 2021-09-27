# Start
```sh
# Example command for tubes puzzle
# run command /ts directory
npm start tube ../_input_samples/tube.txt
```

# Start in Docker
```sh
# docker
docker run \
  --name puzzle_solver_ts \
  -it \
  -v "$(pwd)"/ts:/ts \
  -v "$(pwd)"/_input_samples:/_input_samples \
  -v "$(pwd)"/_output:/_output \
  -v ts_node_modules:/ts/node_modules \
  -w /ts \
  node \
  /bin/bash
```

# Tube

## Input format
input file:
```
123
231
312


```
would translate to:
```
|1| |2| |3| | | | |
|2| |3| |1| | | | |
|3| |1| |2| | | | |
 ¯   ¯   ¯   ¯   ¯
```