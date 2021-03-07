import './styles.css';
import React, { useState } from 'react';

export const App = () => {
  const [todoText, setTodoText] = useState('');
  //todoの配列をstate化
  const [incompletetodos, setIncompletetodos] = useState([]);
  const [completeTodos, setCompletetodos] = useState([]);
  //onChangeを完治してeventに値が入るたびにevent.target.valueに実際の値が入る。
  //そのあとsetTodoText関数が走るイメージ
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  const onClickAdd = () => {
    if (todoText === '') return;
    //スプレッド構文。...incompletetodosで今の配列をコピー。todoTextを新しく配列に追加。
    const newTodos = [...incompletetodos, todoText];
    setIncompletetodos(newTodos);
    setTodoText('');
  };
  const onClickDelete = (index) => {
    const newTodos = [...incompletetodos];
    //spliceはx番目（一つ目の引数）の要素を受け取って、その要素からy（2つ目の引数）個削除する関数
    newTodos.splice(index, 1);
    setIncompletetodos(newTodos);
  };
  const onClickCompleted = (index, todoText) => {
    const newIncompleteTodos = [...incompletetodos];
    newIncompleteTodos.splice(index, 1);
    const newCompleteTodo = [...completeTodos, incompletetodos[index]];
    setIncompletetodos(newIncompleteTodos);
    setCompletetodos(newCompleteTodo);
  };

  const onClickReturn = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    setCompletetodos(newCompleteTodos);
    const newIncompleteTodos = [...incompletetodos, completeTodos[index]];
    setIncompletetodos(newIncompleteTodos);
  };

  return (
    <>
      <div className={'input-area'}>
        <input
          placeholder="todoを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className={'incomplete-area'}>
        <p className={'title'}>未完了のtodo</p>
        <ul>
          {/* mapでレンダリングする時はkeyを忘れない */}
          {/* 仮想DOMが差分を変更する際に目印が必要 */}　
          {incompletetodos.map((todo, index) => {
            return (
              <div key={todo} className={'list-row'}>
                <li>{todo}</li>
                <button onClick={() => onClickCompleted(index)}>完了</button>
                {/* 関数に引数を渡す場合は新しくアロー関数を生成する必要がある。（onClickに関数を渡す
                だけでは、レンダリング時にボタンの数だけ関数が実行されてしまう） */}
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className={'complete-area'}>
        <p className={'title'}>完了のtodo</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className={'list-row'}>
                <li> {todo}</li>
                <button onClick={() => onClickReturn(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
