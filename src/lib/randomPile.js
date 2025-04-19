// Creates a random pile from an array stored in a svelte store. Returns a random id of that pile as integer.

export class RandomPile {
    constructor(store) {
        this.unsubscribe = store.subscribe(value => {
            const newLength = value.length;
            if (newLength !== this.length) {
                this.length = newLength;
                this.refill();
            }
        });
    }
    refill() {
        this.pool = [...Array(this.length).keys()]
    }
    next() {
        if (this.pool.length === 0) this.refill();
        const index = Math.floor(Math.random() * this.pool.length);
        return this.pool.splice(index, 1)[0];
    }
    valueOf() {
        return this.next();
    }
    destroy() {
        this.unsubscribe?.();
    }
}