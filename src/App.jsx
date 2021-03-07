import "./styles.css";
import React, { useState } from "react";
import { InputTodo } from "./components/inputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/ComoleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  //todoの配列をstate化
  const [incompletetodos, setIncompletetodos] = useState([]);
  const [completeTodos, setCompletetodos] = useState([]);
  //onChangeを完治してeventに値が入るたびにevent.target.valueに実際の値が入る。
  //そのあとsetTodoText関数が走るイメージ
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  const onClickAdd = () => {
    if (todoText === "") return;
    //スプレッド構文。...incompletetodosで今の配列をコピー。todoTextを新しく配列に追加。
    const newTodos = [...incompletetodos, todoText];
    setIncompletetodos(newTodos);
    setTodoText("");
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
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
      />
      <IncompleteTodos
        todos={incompletetodos}
        onClickCompleted={onClickCompleted}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickReturn={onClickReturn} />
    </>
  );
};
