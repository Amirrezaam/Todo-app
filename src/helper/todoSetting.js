export function todoCounter(obj, date, condition) {
    if (obj) {
        return Object.keys(obj)
            .filter(key =>
                (condition === "completed" ? obj[key].completed :
                    condition === "uncompleted" ? !obj[key].completed :
                        condition === "important" ? obj[key].important :
                            true)
                && new Date(obj[key]?.date).toLocaleDateString() === date.toLocaleDateString()
            ).length
    }

    return 0;
}

export function displayTodos(obj, condition) {
    if (obj) {
        return Object.keys(obj)
            .filter(key =>
            (condition === "completed" ? obj[key].completed :
                condition === "uncompleted" ? !obj[key].completed :
                    condition === "important" ? obj[key].important :
                        true))
            .reduce((cur, key) => { return Object.assign(cur, { [key]: obj[key] }) }, {});
    }
}