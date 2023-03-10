import {v4 as uuidv4} from 'uuid';
import Todo from '../Models/Todos.model';
import { users } from './User.seed';

const userId = users.map((user) => user.id);

export const todos = [
  {
    id: uuidv4(),
    title: 'Learn Docker',
    description: 'Learn Docker and Docker Compose',
    userId: userId[0],
    completed: false,
  },
  {
    id: uuidv4(),
    title: 'Learn Express',
    description: 'Learn Express and Sequelize',
    userId: userId[0],
    completed: false,
  },
  {
    id: uuidv4(),
    title: 'Learn React',
    description: 'Learn React and Redux',
    userId: userId[0],
    completed: false,
  },
  {
    id: uuidv4(),
    title: 'Learn Typescript',
    description: 'Learn Typescript and Node',
    userId: userId[0],
    completed: false,
  },
  {
    id: uuidv4(),
    title: 'Learn GraphQL',
    description: 'Learn GraphQL and Apollo',
    userId: userId[1],
    completed: false,
  },
  {
    id: uuidv4(),
    title: 'Learn Docker',
    description: 'Learn Docker and Docker Compose',
    userId: userId[1],
    completed: false,
  },
  {
    id: uuidv4(),
    title: 'Learn Algorithms',
    description: 'Learn Algorithms and Data Structures',
    userId: userId[1],
    completed: false,
  },
  {
    id: uuidv4(),
    title: 'Learn Buisness Analysis',
    description: 'Learn Buisness Analysis and Buisness Intelligence',
    userId: userId[2],
    completed: false,
  },
  {
    id: uuidv4(),
    title: 'Study for the exam',
    description: 'Study for the exam and pass it',
    userId: userId[2],
    completed: false,
  },
  {
    id: uuidv4(),
    title: 'Learn Docker',
    description: 'Learn Docker and Docker Compose',
    userId: userId[3],
    completed: false,
  }, 
  {
    id: uuidv4(),
    title: 'Learn Koa',
    description: 'Learn Koa and Koa Router',
    userId: userId[3],
    completed: false,
  },
  {
    id: uuidv4(),
    title: 'Learn Next',
    description: 'Learn Next and Next Router',
    userId: userId[3],
    completed: false,
  }
];

export default async function seedTodos() {
  try {
    const createdTodos = await Todo.bulkCreate(todos);
    console.log(createdTodos);
  } catch (error) {
    console.log("🚀 ~ file: Todos.seed.ts:86 ~ seedTodos ~ error:", error)
  }
}
