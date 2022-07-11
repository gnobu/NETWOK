import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { IoClose } from 'react-icons/io5';
import './Connections.css';

import UserCard from "./UserCard";

const Connections = forwardRef(({ setShowConnections, showConnections }, ref) => {
    const modal = useRef();

    useImperativeHandle(
        ref,
        () => (modal.current)
    )
    
    function forgetState(e) {
        setShowConnections(prev => ({ ...prev, display: false }));
    }

    return (
        <dialog onClose={forgetState} className="modal" ref={modal}>
            <button className="modal-close" onClick={() => modal.current.close()}><IoClose size='3em' color="inherit" /></button>

            <h2>{showConnections.label}</h2>

            <ul className="follows__list">
                {showConnections.connections.map((item, idx) => {
                    return (
                        <li key={idx} >
                            <div className="menu-list">
                                <UserCard user={item} />
                            </div>
                        </li>
                    )
                })}
            </ul>
        </dialog>
    )
});

export default Connections;







// const connections = [
//     {
//         id: 1,
//         fullname: "Elijah Effiong",
//         skill: ["web development", "data analytics"],
//         pic: 'https://avatars.githubusercontent.com/u/2?v=4',
//         username: 'Elijah'
//     },
//     {
//         id: 2,
//         fullname: "Samuel Atumah",
//         skill: ["fullstack developer", "teacher"],
//         pic: 'https://avatars.githubusercontent.com/u/2?v=4',
//         username: 'SamuelAtumah1'
//     },
//     {
//         id: 3,
//         fullname: "Kingsley Akwa",
//         skill: ["graphics design", "social media manager"],
//         pic: 'https://avatars.githubusercontent.com/u/2?v=4',
//         username: 'AKfour7'
//     },
//     {
//         id: 4,
//         fullname: "Edidiong Bekeh",
//         skill: ["ui/ux design", "data analytics"],
//         pic: 'https://avatars.githubusercontent.com/u/2?v=4',
//         username: 'EdidiS'
//     },
//     {
//         id: 11,
//         fullname: "Elijah Effiong",
//         skill: ["web development", "data analytics"],
//         pic: 'https://avatars.githubusercontent.com/u/2?v=4',
//         username: 'Elijah'
//     },
//     {
//         id: 12,
//         fullname: "Samuel Atumah",
//         skill: ["fullstack developer", "teacher"],
//         pic: 'https://avatars.githubusercontent.com/u/2?v=4',
//         username: 'SamuelAtumah1'
//     },
//     {
//         id: 13,
//         fullname: "Kingsley Akwa",
//         skill: ["graphics design", "social media manager"],
//         pic: 'https://avatars.githubusercontent.com/u/2?v=4',
//         username: 'AKfour7'
//     },
//     {
//         id: 14,
//         fullname: "Edidiong Bekeh",
//         skill: ["ui/ux design", "data analytics"],
//         pic: 'https://avatars.githubusercontent.com/u/2?v=4',
//         username: 'EdidiS'
//     },
//     {
//         id: 21,
//         fullname: "Elijah Effiong",
//         skill: ["web development", "data analytics"],
//         pic: 'https://avatars.githubusercontent.com/u/2?v=4',
//         username: 'Elijah'
//     },
//     {
//         id: 22,
//         fullname: "Samuel Atumah",
//         skill: ["fullstack developer", "teacher"],
//         pic: 'https://avatars.githubusercontent.com/u/2?v=4',
//         username: 'SamuelAtumah1'
//     },
//     {
//         id: 23,
//         fullname: "Kingsley Akwa",
//         skill: ["graphics design", "social media manager"],
//         pic: 'https://avatars.githubusercontent.com/u/2?v=4',
//         username: 'AKfour7'
//     },
//     {
//         id: 24,
//         fullname: "Edidiong Bekeh",
//         skill: ["ui/ux design", "data analytics"],
//         pic: 'https://avatars.githubusercontent.com/u/2?v=4',
//         username: 'EdidiS'
//     }
// ]