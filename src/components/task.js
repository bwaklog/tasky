import { useState } from "react";
import "../App.css";

export default function Task({
    uniqueID,
    name,
    description,
    time,
    status,
    updateParent,
    deleteTask,
}) {
    const [componentState, setComponentState] = useState({
        name,
        description,
        time,
        status,
    });

    const [isChecked, setIsChecked] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const handleTaskStateChange = (e) => {
        setIsChecked(e.target.checked);

        updateParent({
            uniqueID: uniqueID,
            name: componentState.name,
            description: componentState.description,
            time: componentState.time,
            status: e.target.checked,
        });
        // update component state status
        setComponentState((prevState) => {
            return {
                ...prevState,
                status: e.target.checked,
            };
        });
    };

    const updateEditStates = function () {
        if (editMode) {
            const newTask = {
                name: componentState.name,
                description: componentState.description,
                time: componentState.time,
                status: componentState.status,
            };
            console.log("new task", newTask);
            setComponentState(newTask);
            updateParent(newTask);
            setEditMode(!editMode);
        } else {
            setEditMode(!editMode);
        }
    };

    return (
        <div
            className="taskblock"
            id={componentState.status ? "task-completed" : "task-stale"}
        >
            {!editMode && (
                <>
                    <h3>
                        <input
                            className="task-check"
                            type="checkbox"
                            checked={componentState.status}
                            onChange={handleTaskStateChange}
                        />
                        {componentState.name}
                    </h3>
                    <p>{componentState.description}</p>
                    <p>{componentState.time}</p>
                    <p>
                        <b>Status:</b>{" "}
                        {componentState.status ? "Completed" : "Scheduled"}
                    </p>
                </>
            )}
            {editMode && (
                <form className="task-update-form">
                    <input
                        className="task-update task-title"
                        type="text"
                        defaultValue={componentState.name}
                    />
                    <input
                        className="task-update task-text"
                        type="text"
                        defaultValue={componentState.description}
                    />
                    <input
                        className="task-update task-date"
                        type="datetime-local"
                        defaultValue={componentState.time}
                    />
                    <input
                        type="submit"
                        value="Confirm Changes"
                    />
                </form>
            )}
            {!componentState.status && editMode && (
                <button
                    className="edit-button"
                    onClick={() => setEditMode(!editMode)}
                >
                    Cancel Edit
                </button>
            )}
            {!componentState.status && !editMode && (
                <button className="edit-button" onClick={updateEditStates}>
                    Edit
                </button>
            )}
            {!componentState.status && (
                <button className="delete-button" onClick={deleteTask}>
                    Delete
                </button>
            )}
        </div>
    );
}
