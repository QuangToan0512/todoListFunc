import { createSelector } from "reselect"

export const filterbyStatus = (todos= [], status = "") => {
  switch (status) {
      case 'Active':
          return todos.filter(todo => todo.get('status') !== "Completed");
      case 'Completed':
          return todos.filter(todo => todo.get('status') === "Completed");
      default:
          return todos;
  }
}

const getTodos = (state) => state.todo.get('todoList');

const getStatus = (state, props) => props.status

export const getVisibleTodos = createSelector(
      [ getTodos, getStatus ],
      (todos, status) => {
        switch (status) {
          case 'Active':
              return todos.filter(todo => todo.get('status') !== "Completed");
          case 'Completed':
              return todos.filter(todo => todo.get('status') === "Completed");
          default:
            return todos;
      }
    }
)



