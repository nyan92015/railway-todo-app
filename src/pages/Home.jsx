import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Header } from '../components/Header';
import { url } from '../const';
import './home.scss';

export const Home = () => {
  const [isDoneDisplay, setIsDoneDisplay] = useState('todo'); // todo->未完了 done->完了
  const [lists, setLists] = useState([]);
  const [selectListId, setSelectListId] = useState();
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies] = useCookies();
  const listRef = useRef(null);
  const handleIsDoneDisplayChange = (e) => setIsDoneDisplay(e.target.value);
  useEffect(() => {
    axios
      .get(`https://${url}/lists`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setLists(res.data);
      })
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`);
      });
  }, []);

  useEffect(() => {
    const listId = lists[0]?.id;
    if (typeof listId !== 'undefined') {
      setSelectListId(listId);
      axios
        .get(`https://${url}/lists/${listId}/tasks`, {
          headers: {
            authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => {
          setTasks(res.data.tasks);
        })
        .catch((err) => {
          setErrorMessage(`タスクの取得に失敗しました。${err}`);
        });
    }
  }, [lists]);

  const handleSelectList = (id) => {
    setSelectListId(id);
    axios
      .get(`https://${url}/lists/${id}/tasks`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        setErrorMessage(`タスクの取得に失敗しました。${err}`);
      });
  };

  const handleKeyDown = (index) => (e) => {
    if (e.key === 'ArrowLeft' && index > 0) {
      // 左矢印キーが押され、かつリストが先頭でない場合の処理
      handleSelectList(lists[index - 1].id);
      console.log(index);
    } else if (e.key === 'ArrowRight' && index < lists.length - 1) {
      // 右矢印キーが押され、かつリストが末尾でない場合の処理
      handleSelectList(lists[index + 1].id);
    }
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.focus();
    }
  }, [selectListId]);

  return (
    <div>
      <Header />
      <main className="taskList">
        <p className="error-message">{errorMessage}</p>
        <div>
          <div className="list-header">
            <h2>リスト一覧</h2>
            <div className="list-menu">
              <p>
                <Link to="/list/new">リスト新規作成</Link>
              </p>
              <p>
                <Link to={`/lists/${selectListId}/edit`}>選択中のリストを編集</Link>
              </p>
            </div>
          </div>
          <ul className="list-tab">
            {lists.map((list, key) => {
              const isActive = list.id === selectListId;
              return (
                <li
                  key={key}
                  className={`list-tab-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleSelectList(list.id)}
                  onKeyDown={handleKeyDown(key)}
                  ref={isActive ? listRef : null}
                  tabIndex={0}
                >
                  {list.title}
                </li>
              );
            })}
          </ul>
          <div className="tasks">
            <div className="tasks-header">
              <h2>タスク一覧</h2>
              <Link to="/task/new">タスク新規作成</Link>
            </div>
            <div className="display-select-wrapper">
              <select onChange={handleIsDoneDisplayChange} className="display-select">
                <option value="todo">未完了</option>
                <option value="done">完了</option>
              </select>
            </div>
            <Tasks tasks={tasks} selectListId={selectListId} isDoneDisplay={isDoneDisplay} />
          </div>
        </div>
      </main>
    </div>
  );
};

// 表示するタスク
const Tasks = (props) => {
  const { tasks, selectListId, isDoneDisplay } = props;
  if (tasks === null) return <></>;

  const now = new Date();
  if (isDoneDisplay == 'done') {
    return (
      <ul>
        {tasks
          .filter((task) => {
            return task.done === true;
          })
          .map((task, key) => {
            const deadline = new Date(`${task.limit.slice(0, -1)}+09:00`);
            return (
              <li key={key} className="task-item">
                <Link to={`/lists/${selectListId}/tasks/${task.id}`} className="task-item-link">
                  <div>
                    <p>{task.title}</p>
                    {task.done ? <p>完了</p> : <p>未完了</p>}
                  </div>
                  <div className="container-time">
                    <p className="deadline">{deadline.toLocaleString()}まで</p>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    );
  }

  return (
    <ul>
      {tasks
        .filter((task) => {
          return task.done === false;
        })
        .map((task, key) => {
          console.log();
          const deadline = new Date(`${task.limit.slice(0, -1)}+09:00`);
          const milliDeadline = deadline.getTime();
          const milliNow = now.getTime();
          let diffInSeconds = Math.floor(Math.abs(milliDeadline - milliNow) / 1000); // 秒単位の差分
          const diffInDays = Math.floor(diffInSeconds / 86400); // 日数の差分
          diffInSeconds %= 86400;
          const diffInHours = Math.floor(diffInSeconds / 3600); // 時間単位の差分
          diffInSeconds %= 3600;
          const diffInMinutes = Math.floor(diffInSeconds / 60); // 分単位の差分
          return (
            <li key={key} className="task-item">
              <Link to={`/lists/${selectListId}/tasks/${task.id}`} className="task-item-link">
                <div>
                  <p>{task.title}</p>
                  {task.done ? <p>完了</p> : <p>未完了</p>}
                </div>
                <div className="container-time">
                  <p className="deadline">{deadline.toLocaleString()}まで</p>
                  {milliDeadline >= milliNow ? (
                    <p className="remain">
                      残り{diffInDays}日{diffInHours}時間{diffInMinutes}分です。
                    </p>
                  ) : (
                    <p className="passed">
                      {diffInDays}日{diffInHours}時間{diffInMinutes}分 過ぎています！
                    </p>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
    </ul>
  );
};
