import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import AddGroupForm from './AddGroupForm'

export default function AddGroupPopover({ show, target, onHide }) {


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
                <Popover.Header as="h1">{`Create a new group:`}</Popover.Header>
                <Popover.Body  >
                    <AddGroupForm onHide={onHide}/>
                </Popover.Body>
            </Popover>
        </Overlay>
    )
}