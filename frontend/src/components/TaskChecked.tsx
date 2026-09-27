import {useState} from 'react'

export const TaskChecked = ({taskId, taskCompleted, onHandleCompleteTask}: {taskId: number, taskCompleted: boolean, onHandleCompleteTask: (taskId: number, taskCompleted: boolean) => void}) => {
    return <>
        <div>
            <label className='text-gray-600'>
                <input 
                    type="checkbox" 
                    onChange={(e) => onHandleCompleteTask(taskId, e.target.checked)} 
                    />
                    {' '}
                    {taskCompleted ? ('Completada') : ('Sin completar')}
            </label>
        </div>
    </>
}