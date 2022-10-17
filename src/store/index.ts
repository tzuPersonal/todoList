import { defineStore } from "pinia";
import { watch } from 'vue';

interface Todo {
  id: number;
  content: string;
  time: string;
  done: boolean;
};

type List = Todo[];

export const useStore = defineStore('store', {
  state: () => ({
    list: [] as List,
    visible: false,
    todo: {
      id: 0,
      content: '',
      time: '',
      done: false,
    } as Todo,
  }),
  actions: {
    toggleDone (id: number): void {
      const todo = this.list.find((todo) => ( todo.id === id ));

      todo!.done = !todo!.done;
    },
    remove (id: number): void {
      const index = this.list.findIndex((todo) => ( todo.id === id ));

      this.list.splice(index, 1);
    },
    openPanel (event: 'edit' | 'add', id: number = 0): void {
      switch (event) {
        case 'add':
          const ids = this.list.map(({ id }) => id);
        
          this.todo.id = ids.length > 0 ? Math.max(...ids as Array<number>) + 1 : 1;
          this.todo.content = '';
          this.todo.time = '';
          this.todo.done = false;
        break;
        case 'edit':
          const todo = this.list.find((todo) => ( todo.id === id ));
          
          this.todo.id = id;
          this.todo.content = todo!.content;
          this.todo.time = todo!.time;
          this.todo.done = todo!.done;
        break;

        default:
          break;
      }
      
      this.visible = true;
    },
    closePanel (): void {
      this.visible = false;
      this.todo = {
        id: 0,
        content: '',
        time: '',
        done: false,
      };
    },
    add (): void {
      if (!this.todo.content) {
        console.warn('內容不可為空');
        return;
      }
      if (!this.todo.time) {
        console.warn('時間不可為空');
        return;
      }

      const todo = this.list.find((todo) => todo.id === this.todo.id);

      if (todo) {
        todo!.id = this.todo.id;
        todo!.content = this.todo.content;
        todo!.time = this.todo.time;
        todo!.done = this.todo.done;
      } else {
        this.list.push(this.todo);
      }

      this.closePanel();
    },
  }
});

export function init () {
  const store = useStore();

  store.list = JSON.parse(window.localStorage.getItem('list') || '[]');
  watch(store.list, () => {
    console.log(store.list);
    window.localStorage.setItem('list', JSON.stringify(store.list));
  });
}