import { format, addDays, startOfWeek } from "date-fns";

export const Calendar = ({ tasksByDate, selectedDate, onDateSelect }) => {
  // Get the current week starting from today
  const startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday start
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfWeekDate, i));

  const handleDateSelect = (day) => {
    onDateSelect?.(day);
  };

  return (
    <div className="m-8 h-80 flex flex-col justify-evenly bg-card border backdrop-blur-sm border-dotted border-b-2 border-border rounded-xl p-6 shadow-lg shadow-primary/5">
      <h2 className="text-lg font-semibold text-card-foreground mb-4">Week Overview</h2>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, index) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const pendingCount = (tasksByDate[dateKey] || []).filter((t) => !t.completed).length;
          const isToday = format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
          const isSelected = format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

          return (
            <button
              key={index}
              onClick={() => handleDateSelect(day)}
              className={`
                relative p-3 h-24 rounded-lg text-center transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg border-dotted border-b-2 border-border
                ${isSelected
                  ? "bg-primary text-primary-foreground shadow-primary/20"
                  : isToday
                  ? "bg-secondary text-secondary-foreground border-2 border-primary/30 shadow-secondary/20"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground shadow-muted/20"}
              `}
            >
              <div className="text-xs font-medium mb-1">{format(day, "EEE")}</div>
              <div className="text-sm font-semibold">{format(day, "d")}</div>

              {pendingCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-calendar-pending text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {pendingCount}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-sm text-muted-foreground text-center">
        Selected: {format(selectedDate, "MMMM d, yyyy")}
      </div>
    </div>
  );
};
