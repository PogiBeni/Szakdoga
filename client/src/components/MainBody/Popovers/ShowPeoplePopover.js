import { useEffect, useState } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

export default function ShowPeoplePopover({ show, target, onHide, group }) {
    const [users, setUsers] = useState([]);
    if (!group || !group.users) {
        return null;
    }
    
    return (
        <Overlay
            show={show}
            target={target}
            placement="bottom"
            containerPadding={20}
            rootClose="true"
            onHide={onHide}
            transition={false}
            container={document.getElementById('addGroupModal')}
        >
            <Popover >
                <Popover.Header as="h3">{`Users in this group:`}</Popover.Header>
                <Popover.Body className="scrollable-div" style={{ maxHeight: "30vh", overflowY: "scroll" }}>
                    {
                        group.users.map((user) => (
                            <div className="user-info" key={user.id}>
                                <div className="profile-picture">
                                    <img src={user.linkToPicture ? user.linkToPicture : "/icons/person.svg"} alt={user.label} />
                                </div>
                                <div className="user-details">
                                    <div className="user-name">{user.fullName}</div>
                                    <div className="user-email">{user.email}</div>
                                </div>
                            </div>
                        ))
                    }
                </Popover.Body>
            </Popover>
        </Overlay>
    );
}
