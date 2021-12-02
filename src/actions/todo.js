export const getList = (todo) => {
    debugger
    return {
        type: 'GET_LIST',
        payload: todo
    }
}

export const addTodoList = (todo) => {
    return {
        type: 'ADD_TODO',
        payload: todo
    }
}

export const checkCompleted = (idx) => {
    return {
        type: 'checkCompleted',
        payload: idx
    }
}

export const removeTodo = (idx) => {
    return {
        type: 'removeTodo',
        payload: idx
    }
}

export const edtItem = (data, idx) => {
    return {
        type: 'edtItem',
        payload: {
            data: data.get('text'),
            idx
        }
    }
}

export const clearCompletedItem = () => {
    return {
        type: 'clearCompleted',
    }
}
