export interface TBoard {
  id: string;
  board_title: string;
  board_description: string;
  board_image: string;
  board_users: string[];
}

export interface TTask {
  id: string;
  title: string;
  description: string;
  columnId: string;
}

export interface TColumn {
  id: string;
  title: string;
  boardId: string | undefined;
  tasks?: TTask[];
}
