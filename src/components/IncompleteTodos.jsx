import React from "react";

export const IncompleteTodos = (props) => {
  const { todos, onClickCompleted, onClickDelete } = props;
  return (
    <div className={"incomplete-area"}>
      <p className={"title"}>未完了のtodo</p>
      <ul>
        {/* mapでレンダリングする時はkeyを忘れない */}
        {/* 仮想DOMが差分を変更する際に目印が必要 */}　
        {todos.map((todo, index) => {
          return (
            <div key={todo} className={"list-row"}>
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
  );
};
