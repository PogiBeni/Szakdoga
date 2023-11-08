import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import AsyncSelect from 'react-select/async';
import { useState } from 'react';
import { getUsers,addUserToGroup } from '../../../apiCalls/ApiCalls';
import ErrorMsg from '../../BasicComponents/ErrorMsg';

export default function AddPeoplePopover({ show, target, onHide, group, refresh }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [errorMSG, seterrorMSG] = useState(null)

    const loadOptions = async (inputValue, callback) => {
        try {
            const searchData = { query: inputValue, groupId: group.id };
            const users = await getUsers(searchData);
            const options = users.map(user => ({
                value: user.value,
                label: (
                    <div className="user-info">
                        <div className="profile-picture">
                            <img src={user.url ? user.url : "/icons/person.svg"} alt={user.label} />
                        </div>
                        <div className="user-details">
                            <div className="user-name">{user.name}</div>
                            <div className="user-email">{user.email}</div>
                        </div>
                    </div>
                )

            }));
            callback(options);
            console.log(users[0].url)
        } catch (error) {
            console.error('Error fetching user options:', error);
        }
    };

    function handleSubmit(e) {
        e.preventDefault();
        var id = {value: group.id, label: group.groupName}
        addUserToGroup({userId:selectedUser.value,groupId: group.id })
        refresh(id)
        setSelectedUser(null)
        onHide()
        seterrorMSG(null);
    }

    return (

        <Overlay
            show={show}
            target={target}
            placement={"right"}
            containerPadding={20}
            rootClose="true"
            onHide={onHide}
            transition={false}
            container={document.getElementById('addGroupModal')}
        >
            <Popover >
                <Popover.Header as="h3">{`Add user to group:`}</Popover.Header>
                <Popover.Body  >
                    <form onSubmit={handleSubmit}>
                        <ErrorMsg errorMSG={errorMSG} />
                        <div className='d-flex'>

                        <AsyncSelect
                            cacheOptions
                            defaultOptions
                            placeholder="Search for users..."
                            loadOptions={loadOptions}
                            value={selectedUser}
                            onChange={(value) => setSelectedUser(value)}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            className='addUserPopover'
                            required={true}
                        />
                        <button type='submit' className="btn btn-success ms-2 bt-sm "><img src="/icons/personFillAdd.svg" className='icon'/></button>
                        </div>
                    </form>
                </Popover.Body>
            </Popover>
        </Overlay>
    )
}