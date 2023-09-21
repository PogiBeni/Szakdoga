import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { useState } from 'react';
import AsyncSelect from 'react-select/async';

export default function ShowPeoplePopover({ show, target, onHide, group }) {
    return (

        <Overlay
            show={show}
            target={target}
            placement={"left"}
            containerPadding={20}
            rootClose="true"
            onHide={onHide}
            transition={false}
        >
            <Popover className='DatePicker'>
                <Popover.Header className='eventHeader' as="h3">{`Users in this group:`}</Popover.Header>
                <Popover.Body className="scrollable-div" style={{ maxHeight: "30vh", overflowY: "scroll" }}>
                <AsyncSelect
                            cacheOptions
                            defaultOptions
                            placeholder="Search for users..."
                        />
                </Popover.Body>
            </Popover>

        </Overlay>
    )
}