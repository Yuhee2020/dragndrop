import React, {DragEvent, useState} from 'react';
import s from "./App.module.css"
import {v1} from "uuid";



export type ItemType = {
    id: string
    name: string
}

export type BoardType = {
    id: string
    title: string
    items: ItemType[]
}

function App() {

    const [boards, setBoards] = useState<BoardType[]>([
        {id: v1(), title: "Mentors", items: [{id: v1(), name: "Dima"}, {id: v1(), name: "Dasha"}]},
        {id: v1(), title: "Users", items: [{id: v1(), name: "Kolia"}, {id: v1(), name: "Petr"}]}
    ])

    const [currentBoardId, setCurrentBoardId]=useState<string>()
    const [currentItem, setCurrentItem]=useState<ItemType>()

    function onItemDragStart(e: DragEvent<HTMLDivElement>, board: BoardType, item: ItemType) {
        setCurrentItem(item)
        setCurrentBoardId(board.id)
        e.currentTarget.className=s.dragName
    }

    function onItemDragEnd(e: DragEvent<HTMLDivElement>) {
        e.currentTarget.className=s.name
    }


    function onBoardDrop(e: React.DragEvent<HTMLDivElement>, boardId: string) {
        e.preventDefault()
        if(currentBoardId!==boardId && currentItem) {
            setBoards(boards.map((board) => (board.id === boardId ? {
                ...board,
                items: [...board.items, currentItem]
            } : {...board,items: board.items.filter(item=>item.id!==currentItem.id)})))
        }
    }
    function onBoardDragOver(e: React.DragEvent<HTMLDivElement>, board: BoardType) {
        e.preventDefault()
    }


    return (
        <div className={s.App}>
            {boards.map((board) =>
                <div
                    key={board.title}
                    className={s.board}
                    onDragOver={(e)=>{onBoardDragOver(e, board)}}
                    onDrop={(e)=>{onBoardDrop(e,board.id)}}
                >
                    <div className={s.title}>{board.title}</div>
                    {board.items?.map(item =>
                        <div key={item.name}
                             onDragStart={(e) => onItemDragStart(e, board, item)}
                             onDragEnd={onItemDragEnd}
                             draggable={true}
                             className={s.name}
                        >{item.name}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
