import React, { useEffect, useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export default function AddPeoplePopover({ children }) {

    const [overlayTriggerRef, setOverlayTriggerRef] = useState(null);

    useEffect(() => {
        // Focus the input field in the popover
        overlayTriggerRef?.current?.focus();
    }, [overlayTriggerRef]);

    return (
        <OverlayTrigger
            trigger="click"
            placement="top"
            overlay={
                <Popover id="myPopover" >
                    <Popover.Content>
                        <input type="text" placeholder="Enter some text" tabIndex={0} />
                    </Popover.Content>
                </Popover>
            }
            ref={setOverlayTriggerRef}
        >
            {children}
        </OverlayTrigger>
    )
}