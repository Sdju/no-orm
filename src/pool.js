class Cached {
    constructor( ) {

    }
}

class Pool {
    constructor(key, model) {
        this.cached = new Map();
        this.model = model;
    }

    check(data) {
        return this.cached.has(data[key]);
    }


}