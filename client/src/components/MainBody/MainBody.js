import Calendar from "./Calendar";

export default function MainBody() {
    return (
        <div className="MainBody">
                <ul class="nav flex-column nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#"><img src="/icons/calendarDark.svg" className="SideIcon" /></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"><img src="/icons/cardCheckList.svg" className="SideIcon" /></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"><img src="/icons/group.svg" className="SideIcon" /></a>
                    </li>
                </ul>
                
                
                
            <div className="MainBodyContent">
                <Calendar/>
            </div>
        </div>
    )
}