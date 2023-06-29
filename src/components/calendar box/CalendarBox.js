import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "./calendar.css"

export default function CalendarBox({ onChange, value }) {

    window.onclick = () => {
        setOpenCalendar(false)
    }

    const clickDay = (date, event) => {
        event.stopPropagation();
        onChange(date);
        setOpenCalendar(false);
    }

    const [openCalendar, setOpenCalendar] = useState(false);

    useEffect(() => {
        console.log("changed");
    }, [openCalendar])

    return (
        <div
            className="w-full cursor-pointer text-white flex items-center justify-between relative border-b-2 border-solid border-[#B39CD0] h-[40px]"
            style={{ zIndex: 1 }}
            onClick={e => { e.stopPropagation(); setOpenCalendar(true) }}
        >
            <div
                className="flex items-center justify-between w-full h-full"
            >
                <span className="pl-3">{value.toLocaleDateString()}</span>
                <KeyboardArrowDownIcon sx={{ fontSize: "20px" }} />

            </div>
            {
                openCalendar &&
                <div
                    className="calendar absolute top-[100%] fadeIn w-full"
                >
                    <Calendar
                        onClickDay={clickDay}
                        locale='bc-BC'
                        onChange={onChange}
                        value={value}
                    />
                </div>
            }
        </div>
    )
}
