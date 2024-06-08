export class SteinAlgorithm {

    static findGCD(x_capacity: number, y_capacity: number): number {

        if (x_capacity === 0) return y_capacity;
        if (y_capacity === 0) return x_capacity;

        // Find the greatest power of 2 that divides both x_capacity and y_capacity
        let k: number;
        for (k = 0; ((x_capacity | y_capacity) & 1) === 0; ++k) {
            x_capacity >>= 1;
            y_capacity >>= 1;
        }

        // Divide x_capacity by 2 until it becomes odd
        while ((x_capacity & 1) === 0) x_capacity >>= 1;

        do {
            // Divide y_capacity by 2 until it becomes odd
            while ((y_capacity & 1) === 0) y_capacity >>= 1;

            // Both x_capacity and y_capacity are odd now, swap if necessary so x_capacity <= y_capacity
            if (x_capacity > y_capacity) {
                const temp = x_capacity;
                x_capacity = y_capacity;
                y_capacity = temp;
            }

            // Here y_capacity >= x_capacity, so this is non-negative
            y_capacity = y_capacity - x_capacity;

        } while (y_capacity !== 0);

        // Restore the common factors of 2
        return x_capacity << k;
    }
}