import React from "react";
import { UserContext } from "../../Context/UserContext";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { deleteUserFromGroup } from "../../../apiCalls/ApiCalls";

export default function ShowPeoplePopover({ group, refresh }) {
    const [user, setUser] = React.useContext(UserContext)

    if (!group || !group.users) {
        return null;
    }
    function deleteUser(groupId, userId) {
        deleteUserFromGroup({ groupId: groupId, userId: userId })
        refresh({ value: group.id, label: group.groupName })
    }

    const popover = (
        <Popover >
            <Popover.Header as="h3">{`Users in this group:`}</Popover.Header>
            <Popover.Body className="scrollable-div" style={{ maxHeight: "25vh", overflowY: "scroll" }}>
                {group.users.map((groupUser) => (
                    <div className="user-info" key={groupUser.id}>
                        <div className="profile-picture ">
                            <img src={groupUser.linkToPicture ? groupUser.linkToPicture : "/icons/person.svg"} alt={groupUser.fullName} />
                        </div>
                        <div className="user-details w-75">
                            <div className="user-name">{groupUser.fullName}</div>
                            <div className="user-email">{groupUser.email}</div>
                        </div>
                        <div className="ms-2" >
                            {user.id == group.creatorUserId && groupUser.id != user.id ?
                                <button className="btn btn-danger btn-sm" onClick={() => deleteUser(group.id, groupUser.id)}>
                                    <img src="/icons/delete.svg" />
                                </button> : null}
                        </div>
                    </div>
                ))}
            </Popover.Body>
        </Popover>
    )
    return (
        <OverlayTrigger trigger="click"
            placement="left"
            rootClose="true"
            overlay={popover}
            container={document.getElementById('addGroupModal')}>
            <img
                className="icon"
                src="/icons/people.svg"/>
        </OverlayTrigger>
    );
}
