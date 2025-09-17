export const Summary = ({ totalTasks, completedTasks, pendingTasks }) => {
  
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    console.log("completionRate", completionRate);

    const getSummaryText = () => {
        if (totalTasks === 0) {
            return "No tasks for today. You're all caught up! 🎉";
        }

        if (completedTasks === totalTasks) {
            return "Outstanding work! All tasks completed for today. 🌟";
        }

        if (completionRate >= 75) {
            return "Great progress! You're almost done with today's tasks.";
        }

        if (completionRate >= 50) {
            return "Good momentum! Keep going to complete your remaining tasks.";
        }

        if (completionRate >= 25) {
            return "Nice start! Focus on completing more tasks to stay on track.";
        }

        return "Let's get started! Several tasks are waiting for your attention.";
    };

    return (
        <div className="m-8 h-80 bg-card border backdrop-blur-sm border-dotted border-b-2 border-border rounded-xl p-6 shadow-lg shadow-primary/5">
            <h2 className="text-lg font-semibold text-card-foreground mb-3">
                Today's Summary
            </h2>
            
            {/* Text Summary */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
                {getSummaryText()}
            </p>
            
            {/* Statistics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center p-6 bg-muted/30 rounded-xl backdrop-blur-sm border-dotted border-b-2 border border-border/50 shadow-lg shadow-primary/5">
                <div className="text-4xl font-bold text-primary mb-2">{totalTasks}</div>
                <div className="text-sm text-muted-foreground font-medium">Total Tasks</div>
                </div>
                
                <div className="text-center p-6 bg-task-complete-bg rounded-xl backdrop-blur-sm border-dotted border-b-2 border border-task-complete/20 shadow-lg shadow-task-complete/10">
                <div className="text-4xl font-bold text-task-complete mb-2">{completedTasks}</div>
                <div className="text-sm text-muted-foreground font-medium">Completed</div>
                </div>
                
                <div className="text-center p-6 bg-calendar-pending-bg rounded-xl backdrop-blur-sm border-dotted border-b-2 border border-calendar-pending/20 shadow-lg shadow-calendar-pending/10">
                <div className="text-4xl font-bold text-calendar-pending mb-2">{pendingTasks}</div>
                <div className="text-sm text-muted-foreground font-medium">Pending</div>
                </div>
                
                <div className="text-center p-6 bg-secondary/50 rounded-xl backdrop-blur-sm border-dotted border-b-2 border border-secondary/30 shadow-lg shadow-secondary/10">
                <div className="text-4xl font-bold text-primary mb-2">{completionRate}%</div>
                <div className="text-sm text-muted-foreground font-medium">Complete</div>
                </div>
            </div>

            {/* Progress Bar */}
            {completionRate > 0 && (
                <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Progress</span>
                    <span>{completionRate}% complete</span>
                </div>
                <div className="bg-slate-300 rounded-full h-3 overflow-hidden">
                    <div 
                    className="bg-green-400 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                    style={{ width: `${completionRate}%` }}
                    />
                </div>
                </div>
            )}
        </div>
    );
};