/* Pro-Worker 2031 calendar (HTML 5236-5263). */

export function CalendarCard() {
  return (
    <div className="calendar-card">
      <div className="cal-stamp">NEW WEEK</div>
      <div className="cal-title">Your Team&apos;s Week</div>
      <div className="cal-sub">Restructured · 4-Day Week</div>
      <div className="cal-week">
        <div className="cal-day mon">
          <div className="cal-day-name">Monday</div>
          <div className="cal-day-task">Fieldwork</div>
        </div>
        <div className="cal-day tue">
          <div className="cal-day-name">Tuesday</div>
          <div className="cal-day-task">Team building &amp; management</div>
        </div>
        <div className="cal-day wed">
          <div className="cal-day-name">Wednesday</div>
          <div className="cal-day-task">Agent task assignment</div>
        </div>
        <div className="cal-day thu">
          <div className="cal-day-name">Thursday</div>
          <div className="cal-day-task">Desk work</div>
        </div>
        <div className="cal-day crossed">
          <div className="cal-day-name">Friday</div>
          <div className="cal-day-task">Off</div>
        </div>
      </div>
    </div>
  );
}
