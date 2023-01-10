declare namespace API {
  type TodoItemDao = {
    id: number;
    name: string;
    description: string;
  };

  type TodoColumnDao = {
    id: number;
    name: string;
    hexColor: string;
  }

  type TodoItem = {
    uid: string;
    colUid: string;
  } & TodoItemDao;

  type TodoColumn = {
    uid: string;
    todoItems: TodoItem[]
  } & TodoColumnDao;
}


