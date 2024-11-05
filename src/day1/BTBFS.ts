export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    // head inside our queue
    const q: (BinaryNode<number> | null)[] = [head];

    while (q.length) {
        const curr = q.shift() as BinaryNode<number> | null | undefined;
        if (!curr) {
            continue;
        }

        // search
        if (curr.value === needle) {
            return true;
        }

        q.push(curr.left);
        q.push(curr.right);
    }

    return false;
}
