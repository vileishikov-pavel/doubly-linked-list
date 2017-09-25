const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        var node = new Node(data);

        if (this.length === 0) {
            this._head = node;
            this._tail = node;
            this.length++;
        } else {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
            this.length++;
        }
        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        return this._getNode(index).data;
    }

    insertAt(index, data) {
        var newNode = new Node(data);
        var currNode = this._getNode(index);
        var nextNode = this._getNode(index + 1);

        currNode.next = newNode;
        newNode.prev = currNode;
        newNode.next = nextNode;
        nextNode.prev = newNode;

        this.length++;
        return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        while(this._head.next) {
            this._head = this._head.next;
            this.length--;
        }
        this._head.data = null;
        this._head.prev = null;
        this._head.next = null;
        this._tail.data = null;
        this._tail.prev = null;
        this._tail.next = null;
        this.length--;
        return this;
    }

    deleteAt(index) {
        if (index === 0) {
            if (this._head.next) {
                this._head = this._head.next;
                this.length--;
            } else {
                this.clear();
            }
        } else if (index === this.length - 1) {
            this._tail = this._tail.prev;
            this.length--;
        } else if (index > 0 && index < this.length - 1) {
            var prevNode = this._getNode(index - 1);
            var node = this._getNode(index);
            var nextNode = this._getNode(index + 1);
            prevNode.next = nextNode;
            nextNode.prev = prevNode;
            
            this.length--;
            node = null;
        }
        return this;
    }

    reverse() {
        var tail = this._tail;
        var head = this._head;
        var data = [];

        while (tail) {
            data.push(tail.data);
            tail = tail.prev;
        }

        var tail = this._tail;

        while (tail) {
            tail.data = data.pop();
            tail = tail.prev;
        }
        return this;
    }

    indexOf(data) {
        var node = this._head, count = 0;
        if (node.data === data) {
            return 0;
        }
        while (node = node.next) {
            if (node.data === data) {
                return ++count;
            }
        }
        return -1;
    }

    _getNode(index) {
        if (index === 0) {
            return this._head;
        } else if (index === this.length - 1) {
            return this._tail;
        }

        if (index < (this.length - 1) / 2) {
            var node = this._head;

            for (var i = 0; i < index; i++) {
                node = node.next;
            }
            return node;
        } else {
            var node = this._tail;

            for (var i = this.length - 1; i > index; i--) {
                node = node.prev;
            }
            return node;
        }
    }
}

module.exports = LinkedList;
