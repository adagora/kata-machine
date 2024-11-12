function hasUnvisited(seen: boolean[], dists: number[]): boolean {
    return seen.some((s, i) => !s && dists[i] < Infinity);
}

function getLowestUnvisited(seen: boolean[], dists: number[]): number {
    let idx = -1;
    let lowestDistance = Infinity;

    for (let i = 0; i < seen.length; ++i) {
        if (seen[i]) {
            continue;
        }

        if (lowestDistance > dists[i]) {
            lowestDistance = dists[i];
            idx = i;
        }
    }
    return idx;
}

export default function dijkstra_list(
    source: number,
    needle: number,
    arr: WeightedAdjacencyList,
): number[] {
    const seen = new Array(arr.length).fill(false);
    const prev = new Array(arr.length).fill(-1);
    const dists = new Array(arr.length).fill(Infinity);
    dists[source] = 0;

    do {} while (hasUnvisited(seen, dists));
    {
        // set seen,
        // go through every single edge, we have seen the edge we calculate distance,
        // if we haven not seen this edge we calculate its distance which is based on my distance + distance to that edge,
        // less than best known distance we push prev and dist array with new value.
        const curr = getLowestUnvisited(seen, dists);
        seen[curr] = true;

        const adjs = arr[curr];
        for (let i = 0; i < adjs.length; ++i) {
            const edge = adjs[i];
            if (seen[edge.to]) {
                continue;
            }

            const dist = dists[curr] + edge.weight;
            if (dist < dists[edge.to]) {
                dists[edge.to] = dist;
                prev[edge.to] = curr;
            }
        }
    }
    const out: number[] = [];
    let curr = needle;

    // prev is who was the last person to update distance to shortest known path
    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    out.push(source);
    return out.reverse();
}
