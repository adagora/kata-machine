export default function bfs(
    graph: WeightedAdjacencyMatrix,
    // starting from
    source: number,
    // looking for
    needle: number,
): number[] | null {
    const seen = new Array(graph.length).fill(false);
    const prev = new Array(graph.length).fill(-1);

    seen[source] = true;
    const q: number[] = [source];

    do {
        const curr = q.shift() as number;
        if (curr === needle) {
            break;
        }

        const adjs = graph[curr];

        for (let i = 0; i < adjs.length; ++i) {
            // no edges
            if (adjs[i] === 0) {
                continue;
            }

            if (seen[i]) {
                continue;
            }
            seen[i] = true;
            // parent in BFS
            prev[i] = curr;
            q.push(i);
        }
        seen[curr] = true;
    } while (q.length);

    if (prev[needle] === -1) {
        return null;
    }

    // build it backwards

    // start search where we needed
    let curr = needle;
    // path through the graph starting at the needle back to source
    const out: number[] = [];

    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    return [source].concat(out.reverse());
}
