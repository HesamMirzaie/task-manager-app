export interface IBoard {
  id: string;
  board_title: string;
  board_description: string;
  board_image: string;
  board_users: string[];
}
export interface IColumn {
  id: string;
  title: string;
  description: string;
  boardId: string | undefined;
  order: number;
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  columnId: string;
}
