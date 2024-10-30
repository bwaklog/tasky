import { useState } from "react";
import "./App.css";
import "./components/form";
import Form from "./components/form";
import Task from "./components/task";
import { v4 as uuid } from 'uuid';

function App() {
    const initialData = JSON.parse(localStorage.getItem("tasks")) || [];
    const [data, setData] = useState(initialData);

    const addNewTask = (newTask) => {
        setData((prevData) => [...prevData, newTask]);
        localStorage.setItem("tasks", JSON.stringify([...data, newTask]));
    };

    const updateTaskData = (newTaskState) => {
        setData((prevData) => {
            const newData = prevData.map((task, map_index) => {
                if (task.uniqueID === newTaskState.uniqueID) {
                    return newTaskState;
                }
                return task;
            });
            localStorage.setItem("tasks", JSON.stringify(newData));
            return newData;
        });
    };

    return (
        <div className="App">
            <h1>To-do app</h1>
            <p>
                Tasks completed:{" "}
                <b>
                    {data.filter((tasks) => tasks.status === true).length}/
                    {data.length}
                </b>
            </p>

            <Form setData={addNewTask}></Form>

            <div className="tasks">
                {data
                    .filter((task) => task.status === false)
                    .map((obj) => {
                        return (
                            <Task
                                key={obj["uniqueID"]}
                                uniqueID={obj["uniqueID"]}
                                name={obj["name"]}
                                description={obj.description}
                                time={obj.time}
                                status={obj.status}
                                updateParent={updateTaskData}
                                deleteTask={() => {
                                    const newData = data.filter(
                                        (task) => task.name !== obj.name,
                                    );
                                    setData(newData);
                                    localStorage.setItem(
                                        "tasks",
                                        JSON.stringify(newData),
                                    );
                                }}
                            />
                        );
                    })}
                <hr />
                {data
                    .filter((task) => task.status === true)
                    .map((obj) => {
                        return (
                            <Task
                                key={obj["uniqueID"]}
                                uniqueID={obj["uniqueID"]}
                                name={obj["name"]}
                                description={obj.description}
                                time={obj.time}
                                status={obj.status}
                                updateParent={updateTaskData}
                                deleteTask={() => {
                                    const newData = data.filter(
                                        (task) => task.name !== obj.name,
                                    );
                                    setData(newData);
                                    localStorage.setItem(
                                        "tasks",
                                        JSON.stringify(newData),
                                    );
                                }}
                            />
                        );
                    })}
            </div>
        </div>
    );
}

export default App;
